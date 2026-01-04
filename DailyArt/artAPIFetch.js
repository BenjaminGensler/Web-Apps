const artImages = [];

// Define the current date for ObjectID generation
const currentDate = new Date();
const objectID = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}` % 496952 + 1;

// Define the API endpoint
const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;

// Fetch data from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("API Response:", data);

    // Collect the primary image and additional images
    if (data.primaryImage) {
      artImages.push(data.primaryImage);
    }
    if (data.additionalImages && data.additionalImages.length > 0) {
      artImages.push(...data.additionalImages);
    }

    if (data.title) {
      const titleElement = document.getElementsByClassName("artTitle")[0];
      titleElement.textContent = data.title;
    }

    if (data.artistDisplayName) {
      const artistElement = document.getElementsByClassName("artArtist")[0];
      artistElement.textContent = data.artistDisplayName;
    }

    if (data.objectURL) {
      const urlElement = document.getElementsByClassName("artUrl")[0];
      urlElement.href = data.objectURL;
      urlElement.textContent = "View on Met Museum";
    }

    console.log("Collected Images:", artImages);

    // Optionally, update the carousel with the collected images
    updateCarousel(artImages);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

// Function to update the carousel with images
function updateCarousel(images) {
  const imageContainer = document.getElementsByClassName("carousel-images")[0];
  imageContainer.innerHTML = ""; // Clear existing images

  images.forEach(imageUrl => {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = "Artwork Image";
    imageContainer.appendChild(imgElement);
  });
}




  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".carousel-images img");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const imageContainer = document.querySelector(".carousel-images");
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100; // Move by 100% for each image
        imageContainer.style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length; // Wrap around
        updateCarousel();
    });
});