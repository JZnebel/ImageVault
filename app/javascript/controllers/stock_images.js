document.addEventListener('turbo:load', () => {
  const searchBtn = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const transparentCheckbox = document.getElementById('transparent-checkbox');
  const resultsDiv = document.getElementById('results');
  const paginationDiv = document.getElementById('pagination'); // Ensure this element exists in your HTML
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalAttribution = document.getElementById('modal-attribution');
  const modalSelectBtn = document.getElementById('modal-select-button');
  const closeModalBtn = document.getElementById('close-modal');
  


  let currentPage = 1; // Track current page
  const perPage = 10; // Number of images per page

  if (!searchBtn || !searchInput || !resultsDiv || !paginationDiv) return;

  // Trigger search when Enter key is pressed in the search input
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      searchBtn.click(); // Trigger the search button's click event
    }
  });

  const renderResults = (images) => {
    resultsDiv.innerHTML = ''; // Clear previous results

    if (images.length === 0) {
      resultsDiv.innerHTML = '<p class="text-gray-700">No suitable images found. Try a different query.</p>';
      paginationDiv.innerHTML = ''; // Clear pagination if no results
      return;
    }

    resultsDiv.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4';

    images.forEach((img) => {
      const container = document.createElement('div');
      container.className = 'relative bg-white p-2 rounded shadow hover:shadow-lg transition-shadow';

      // Check if the image is already selected and set the button state accordingly
      const isSelected = img.selected; // Assuming 'selected' is sent in the JSON response
      const buttonText = isSelected ? 'Selected' : 'Select';
      const buttonClass = isSelected
        ? 'selected-image bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded transition mt-2 flex items-center justify-center' // Added flex utilities
        : 'select-image bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition mt-2 flex items-center justify-center'; // Added flex utilities

      container.innerHTML = `
        <div class="group relative cursor-pointer">
          <img 
            src="${img.url}" 
            class="w-full h-48 object-contain rounded-md shadow-md bg-gray-200 clickable-image" 
            alt="${img.source}" 
            data-url="${img.url}" 
            data-attribution="${escapeQuotes(img.attribution)}"
          />
          <div 
            class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            <span class="text-white text-xl font-semibold">🔍</span>
          </div>
        </div>
        <!-- Attribution Removed from Grid View -->
        <button
          class="${buttonClass}"
          data-url="${img.url}"
          data-source="${img.source}"
          data-attribution="${escapeQuotes(img.attribution)}"
          ${isSelected ? 'disabled' : ''}
        >
          ${buttonText}
        </button>
      `;

      resultsDiv.appendChild(container);
    });

    attachImageClickListeners(); // Attach click listeners for images
    attachSelectListeners();
  };

  const attachImageClickListeners = () => {
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach((image) => {
      image.addEventListener('click', (e) => {
        const imageUrl = e.target.dataset.url;
        const attribution = e.target.dataset.attribution;

        if (imageUrl) {
          openModal(imageUrl, attribution);
        } else {
          console.error('Image URL or attribution not found on clicked element');
        }
      });
    });
  };

  const attachSelectListeners = () => {
    document.querySelectorAll('.select-image, .selected-image').forEach((button) => {
      button.addEventListener('click', () => {
        const payload = {
          url: button.dataset.url,
          source: button.dataset.source,
          attribution: button.dataset.attribution,
        };

        fetch('/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': getCSRFToken(),
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // Update the button to indicate selection
              markButtonAsSelected(button);

              // Check and update modal if the same image is being viewed
              if (
                modalSelectBtn &&
                modalSelectBtn.dataset.url === payload.url
              ) {
                markButtonAsSelected(modalSelectBtn);
              }
            } else {
              alert(`Error selecting image: ${data.errors}`);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('An unexpected error occurred while selecting the image.');
          });
      });
    });
  };

  // Helper function to mark a button as "Selected"
  const markButtonAsSelected = (button) => {
    button.textContent = 'Selected';
    button.className =
      'selected-image bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded transition mt-2 flex items-center justify-center'; // Added flex utilities
    button.disabled = true;
  };

  const openModal = (imageUrl, attribution) => {
    modalImage.src = imageUrl; // Set the image source
    modalAttribution.textContent = attribution; // Set the attribution text
    modal.classList.remove('hidden'); // Show the modal

    // Update the select button in the modal
    modalSelectBtn.dataset.url = imageUrl;
    modalSelectBtn.dataset.attribution = attribution;

    // Check if the image is already selected
    const gridButton = [...document.querySelectorAll('.select-image, .selected-image')].find(
      (btn) => btn.dataset.url === imageUrl
    );
    if (gridButton && gridButton.classList.contains('selected-image')) {
      markButtonAsSelected(modalSelectBtn);
    } else {
      // Reset to default state if not selected
      modalSelectBtn.textContent = 'Select';
      modalSelectBtn.className =
        'select-image bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition mt-2 flex items-center justify-center'; // Added flex utilities
      modalSelectBtn.disabled = false;
    }

    modalSelectBtn.onclick = () => {
      const payload = {
        url: imageUrl,
        source: 'Modal Selection',
        attribution: attribution.trim(),
      };

      fetch('/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            markButtonAsSelected(modalSelectBtn);

            // Update the corresponding grid button
            const gridButton = [...document.querySelectorAll('.select-image')].find(
              (btn) => btn.dataset.url === imageUrl
            );
            if (gridButton) {
              markButtonAsSelected(gridButton);
            }
          } else {
            alert(`Error selecting image: ${data.errors}`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An unexpected error occurred while selecting the image.');
        });
    };
  };

  const closeModal = () => {
    modal.classList.add('hidden'); // Hide the modal
    modalImage.src = ''; // Clear the modal image
    modalAttribution.textContent = ''; // Clear the attribution text
    modalSelectBtn.textContent = 'Select'; // Reset button text
    modalSelectBtn.disabled = false; // Re-enable the button
    modalSelectBtn.className =
      'select-image bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition mt-2 flex items-center justify-center'; // Added flex utilities
  };

  // Add close modal event listener
  closeModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // **New Function: Render Pagination Controls**
  const renderPagination = () => {
    paginationDiv.innerHTML = `
      <button id="prev-page" class="bg-gray-300 px-3 py-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}">Previous</button>
      <span class="mx-3">Page ${currentPage}</span>
      <button id="next-page" class="bg-gray-300 px-3 py-1 rounded">Next</button>
    `;

    // Disable "Previous" button if on the first page
    if (currentPage === 1) {
      document.getElementById('prev-page').disabled = true;
    } else {
      document.getElementById('prev-page').disabled = false;
    }

    // Add event listeners for pagination buttons
    document.getElementById('prev-page').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage -= 1;
        searchImages();
      }
    });

    document.getElementById('next-page').addEventListener('click', () => {
      currentPage += 1;
      searchImages();
    });
  };

  // **Updated Function: Search Images with Pagination**
  const searchImages = () => {
    const query = searchInput.value.trim();
    const transparent = transparentCheckbox.checked;

    if (!query) {
      alert('Please enter a search term.');
      return;
    }

    const params = new URLSearchParams({
      query: query,
      transparent: transparent,
      page: currentPage,
      per_page: perPage,
    });

    fetch(`/search?${params.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error('No images found');
        return response.json();
      })
      .then((images) => {
        renderResults(images);
        renderPagination(); // **Call renderPagination after rendering results**
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        resultsDiv.innerHTML = `<p class="text-red-600 font-semibold">No suitable images found. Please try another query.</p>`;
        paginationDiv.innerHTML = ''; // Clear pagination on error
      });
  };

  // Attach search event
  searchBtn.addEventListener('click', () => {
    currentPage = 1; // Reset to page 1 for a new search
    searchImages();
  });
});

// Helper function to get CSRF Token
function getCSRFToken() {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  return metaTag ? metaTag.getAttribute('content') : '';
}

// Helper function to escape quotes in strings
function escapeQuotes(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
