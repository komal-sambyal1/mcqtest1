
/* =========================================
   GET PAGE ELEMENTS
========================================= */

const camera = document.getElementById("camera");
const okButton = document.getElementById("okButton");
const cameraStatus = document.getElementById("cameraStatus");
const screenStatus = document.getElementById("screenStatus");
const screenShareButton = document.getElementById("startScreenShare");


/* =========================================
   VARIABLES
========================================= */

let cameraStream = null;
let screenStream = null;

let cameraActive = false;
let screenSharingActive = false;


/* =========================================
   CHECK PERMISSIONS
========================================= */

function checkPermissions() {

    if (cameraActive && screenSharingActive) {

        okButton.disabled = false;

        screenStatus.innerText =
            "Screen sharing is active. You may proceed.";

    } else {

        okButton.disabled = true;
    }
}


/* =========================================
   CAMERA
========================================= */

async function startCamera() {

    try {

        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia) {

            cameraStatus.innerText =
                "Camera is not supported by this browser.";

            return;
        }

        cameraStatus.innerText =
            "Requesting camera permission...";

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

        camera.srcObject = cameraStream;

        cameraActive = true;

        cameraStatus.innerText =
            "Camera is active.";

        checkPermissions();

    } catch (error) {

        console.error("Camera Error:", error);

        cameraActive = false;

        cameraStatus.innerText =
            "Camera permission is required.";

        okButton.disabled = true;
    }
}


/* =========================================
   SCREEN SHARING
========================================= */

async function startScreenSharing() {

    console.log("Screen sharing button clicked.");

    screenStatus.innerText =
        "Opening screen sharing permission...";


    /* Check browser support */

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getDisplayMedia) {

        screenStatus.innerText =
            "Screen sharing is not supported.";

        alert(
            "Screen sharing is not supported in this browser. Please use Google Chrome or Microsoft Edge."
        );

        return;
    }


    try {

        /*
         * IMPORTANT:
         * getDisplayMedia() must be called directly
         * as a result of the user's button click.
         */

        screenStream =
            await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: false
            });


        console.log(
            "Screen sharing permission granted."
        );


        /* Get screen video track */

        const videoTracks =
            screenStream.getVideoTracks();


        if (videoTracks.length === 0) {

            screenStatus.innerText =
                "No screen was selected.";

            return;
        }


        /* Screen sharing is active */

        screenSharingActive = true;

        screenStatus.innerText =
            "Screen sharing is ACTIVE. You may proceed.";

        screenShareButton.innerText =
            "Screen Sharing Active";

        screenShareButton.disabled = true;


        /* Enable OK if camera is also active */

        checkPermissions();


        /* =========================================
           DETECT WHEN USER STOPS SHARING
        ========================================= */

        const videoTrack =
            videoTracks[0];


        videoTrack.addEventListener(
            "ended",
            function() {

                console.log(
                    "Screen sharing stopped."
                );

                screenSharingActive = false;

                screenStream = null;

                screenStatus.innerText =
                    "Screen sharing has been stopped.";

                screenShareButton.innerText =
                    "Start Screen Sharing";

                screenShareButton.disabled = false;

                okButton.disabled = true;

                alert(
                    "Screen sharing has been stopped. Please start it again."
                );
            }
        );


    } catch (error) {

        console.error(
            "Screen Sharing Error:",
            error
        );


        screenSharingActive = false;

        screenShareButton.disabled = false;

        screenShareButton.innerText =
            "Start Screen Sharing";


        if (error.name === "NotAllowedError") {

            screenStatus.innerText =
                "Screen sharing permission was denied.";

            alert(
                "Screen sharing was cancelled or permission was denied. Please click Start Screen Sharing again and select a screen."
            );

        } else if (error.name === "AbortError") {

            screenStatus.innerText =
                "Screen sharing was cancelled.";

        } else {

            screenStatus.innerText =
                "Unable to start screen sharing.";

            alert(
                "Unable to start screen sharing. Please try again."
            );
        }


        okButton.disabled = true;
    }
}


/* =========================================
   SCREEN SHARE BUTTON
========================================= */

if (screenShareButton) {

    screenShareButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            startScreenSharing();

        }
    );

} else {

    console.error(
        "ERROR: startScreenShare button was not found."
    );
}


/* =========================================
   OK BUTTON
========================================= */

function goToCandidatePage() {

    if (!cameraActive) {

        alert(
            "Please allow camera access first."
        );

        return;
    }


    if (!screenSharingActive) {

        alert(
            "Please start screen sharing first."
        );

        return;
    }


    localStorage.setItem(
        "permissionsCompleted",
        "true"
    );


    /*
     * Stop camera before leaving this page.
     */

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(function(track) {

                track.stop();

            });
    }


    /*
     * Do not manually stop screen sharing here.
     * The browser controls the screen-sharing stream.
     */

    window.location.href =
        "candidate.html";
}


/* =========================================
   START CAMERA WHEN PAGE LOADS
========================================= */

window.addEventListener(
    "load",
    function() {

        startCamera();

    }
);

