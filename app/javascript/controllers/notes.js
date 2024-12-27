document.addEventListener("turbo:load", () => {
    // Function to save notes
    window.saveNotes = function (textarea) {
      const imageId = textarea.dataset.id; // Get the image ID from the data-id attribute
      const notes = textarea.value.trim(); // Get the value of the textarea
  
      // Send PATCH request to save the notes
      fetch(`/images/${imageId}/update_notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCSRFToken(),
        },
        body: JSON.stringify({ notes: notes }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(`Notes for image ${imageId} saved successfully!`);
  
            // Add Tailwind class for green border to indicate success
            textarea.classList.add("border-green-500", "ring-2", "ring-green-300");
  
            // Remove the green border after 3 seconds
            setTimeout(() => {
              textarea.classList.remove("border-green-500", "ring-2", "ring-green-300");
            }, 3000);
          } else {
            console.error(`Error saving notes: ${data.errors.join(", ")}`);
          }
        })
        .catch((error) => {
          console.error("Unexpected error while saving notes:", error);
        });
    };
  
    // Helper function to fetch CSRF token
    function getCSRFToken() {
      const metaTag = document.querySelector('meta[name="csrf-token"]');
      return metaTag ? metaTag.getAttribute("content") : "";
    }
  });
  