const eventId = "649659797a9a43c9487b0ecb";
const url = `http://localhost:4000/api/v3/app/events?id=${eventId}`;

// Now you can use the 'url' variable to make a request to the API
// (e.g., using fetch, XMLHttpRequest, or any other HTTP client library)


const getData = async() => {
    fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.status);
    }
  })
  .then(data => {
    // Handle the retrieved data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });

} 
getData();
