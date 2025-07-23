// Define the current date for ObjectID generation
const currentDate = new Date();
const objectID = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}` % 496952;

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
    // Process the data as needed
  })
  .catch(error => {
    console.error("Error:", error.message);
  });