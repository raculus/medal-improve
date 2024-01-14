// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Callback function for the MutationObserver
  function handleMutation(mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Check if .virtuoso-grid-clip-item elements were added
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function (addedNode) {
            const webview = addedNode.querySelector("webview");
            if (addedNode.classList && addedNode.classList.contains("virtuoso-grid-clip-item")) {
              // .virtuoso-grid-clip-item element has been created

              // Check if the parent element is found
              if (addedNode) {
                if (addedNode.children[0].children.length === 4) {
                  console.error("Adblock:", addedNode);
                  addedNode.children[0].children[0].click();
                }
              }

              // Add your logic here to handle the newly created element
            } else if (webview) {
              console.error("Adblock", webview);
              var parent = webview;
              for (var i = 0; i < 3; i++) {
                parent = parent.parentNode;
              }
              console.log(parent);
              parent.style.display = "none";
            }
          });
        }
      }
    }
  }

  // Create a MutationObserver with the callback function
  var observer = new MutationObserver(handleMutation);

  // Start observing changes in the DOM, looking for added nodes
  observer.observe(document.body, { childList: true, subtree: true });
});
