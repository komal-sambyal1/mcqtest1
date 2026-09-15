/* =========================================
   INSTRUCTION PAGE ELEMENTS
   ========================================= */

const camera =
    document.getElementById("camera");

const okButton =
    document.getElementById("okButton");

const cameraStatus =
    document.getElementById("cameraStatus");

const screenStatus =
    document.getElementById("screenStatus");

const screenShareButton =
    document.getElementById("startScreenShare");


/* =========================================
   VARIABLES
   ========================================= */

let cameraStream = null;
let screenStream = null;

let cameraActive = false;
let screenSharingActive = false;


/* =========================================
   CHECK WHETHER USER CAN PROCEED
   ========================================= */

function checkPermissions() {

    if (
        cameraActive === true &&
        screenSharingActive === true
    ) {

        okButton.disabled = false;

        cameraStatus.innerText =
            "Camera is active.";

        screenStatus.innerText =
            "Screen sharing is active. You may proceed.";

    } else {

        okButton.disabled = true;

    }

}


/* =========================================
   CAMERA ACCESS
   ========================================= */

navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: false
    })
    .then(function(stream) {

        cameraStream = stream;

        camera.srcObject =
            stream;

        cameraActive = true;

        cameraStatus.innerText =
            "Camera is active.";

        checkPermissions();

    })
    .catch(function(error) {

        console.error(
            "Camera error:",
            error
        );

        cameraActive = false;

        cameraStatus.innerText =
            "Camera permission is required to continue the examination.";

        okButton.disabled = true;

    });


/* =========================================
   SCREEN SHARING
   ========================================= */

async function startScreenSharing() {

    try {

        screenStream =
            await navigator
                .mediaDevices
                .getDisplayMedia({
                    video: true,
                    audio: false
                });


        screenSharingActive = true;


        screenStatus.innerText =
            "Screen sharing is active.";


        screenShareButton.innerText =
            "Screen Sharing Active";


        screenShareButton.disabled =
            true;


        checkPermissions();


        /* =========================================
           DETECT WHEN SCREEN SHARING IS STOPPED
           ========================================= */

        const videoTrack =
            screenStream.getVideoTracks()[0];


        videoTrack.addEventListener(
            "ended",
            function() {

                screenSharingActive =
                    false;


                screenStatus.innerText =
                    "Screen sharing has been stopped.";


                screenShareButton.innerText =
                    "Start Screen Sharing";


                screenShareButton.disabled =
                    false;


                okButton.disabled =
                    true;


                alert(
                    "Screen sharing is required to start the examination. Please start screen sharing again."
                );

            }
        );

    } catch (error) {

        console.error(
            "Screen sharing error:",
            error
        );

        screenSharingActive =
            false;


        screenStatus.innerText =
            "Screen sharing permission is required.";


        okButton.disabled =
            true;


        alert(
            "Please allow screen sharing to continue the examination."
        );

    }

}


/* =========================================
   SCREEN SHARE BUTTON
   ========================================= */

if (screenShareButton) {

    screenShareButton.addEventListener(
        "click",
        startScreenSharing
    );

}


/* =========================================
   OK / CONTINUE BUTTON
   ========================================= */

function goToCandidatePage() {

    if (
        cameraActive !== true ||
        screenSharingActive !== true
    ) {

        alert(
            "Please allow both camera access and screen sharing before continuing."
        );

        return;

    }


    /*
     * Stop the camera preview on the
     * instruction page.
     *
     * The exam page will request the
     * camera again.
     */

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(function(track) {

                track.stop();

            });

    }


    /*
     * IMPORTANT:
     *
     * We do NOT stop screenStream here.
     *
     * However, browser screen-sharing
     * permissions/streams generally belong
     * to the current document. When navigating
     * to another page, the browser may end it.
     *
     * Therefore exam.js will monitor/request
     * according to the browser's behavior.
     */


    /*
     * Save that the required permissions
     * were completed on the instruction page.
     */

    localStorage.setItem(
        "permissionsCompleted",
        "true"
    );


    /*
     * Go to candidate details page.
     */

    window.location.href =
        "candidate.html";

}