const camera = document.getElementById("camera");
const okButton = document.getElementById("okButton");
const cameraStatus = document.getElementById("cameraStatus");

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
.then(function(stream) {

    camera.srcObject = stream;

    cameraStatus.innerText =
        "Camera is active. You may proceed.";

    okButton.disabled = false;

})
.catch(function(error) {

    console.error(error);

    cameraStatus.innerText =
        "Camera permission is required to continue the examination.";

    okButton.disabled = true;

});

function goToCandidatePage() {
    window.location.href = "candidate.html";
}