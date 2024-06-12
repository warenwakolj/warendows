function isViewportTooSmall() {
    return window.innerWidth <= 768; // Adjust the threshold as needed
}

// Function to redirect to the mobile version
function redirectToMobile() {
    window.location.href = "/mobile/index.html"; // Adjust the URL as needed
}

// Function to check viewport size and redirect if necessary
function checkViewportAndRedirect() {
    if (isViewportTooSmall()) {
        redirectToMobile();
    }
}

// Call the checkViewportAndRedirect function when the page loads
window.onload = checkViewportAndRedirect;

// Call the checkViewportAndRedirect function whenever the window is resized
window.onresize = checkViewportAndRedirect;