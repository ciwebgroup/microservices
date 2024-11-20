(function () {
    document.addEventListener('DOMContentLoaded', function () {
      const apiKey = window.NearbyNowAPIKey;
      if (!apiKey) {
        console.error('Nearby Now API key not found. Please define window.NearbyNowAPIKey in your script.');
        return;
      }
  
      const baseUrl = 'http://localhost:3000/api';
  
      // Function to make API requests
      const fetchWidgetData = async (endpoint) => {
        try {
          const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiKey}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return await response.json();
        } catch (error) {
          console.error('Error fetching widget data:', error);
        }
      };
  
      // Function to render widget content in a target element
      const renderWidget = (elementId, content) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = content;
        }
      };
  
      // Fetch and render recent reviews widget
      const recentReviewsElement = document.getElementById('recent-reviews');
      if (recentReviewsElement) {
        fetchWidgetData('encode-api-key/' + encodeURIComponent(apiKey)).then(encodedResponse => {
          const encodedKey = encodedResponse.encodedKey;
          fetchWidgetData(`recent-reviews?apiKey=${encodedKey}`).then(data => {
            if (data) {
              renderWidget('recent-reviews', JSON.stringify(data)); // Placeholder for actual rendering logic
            }
          });
        });
      }
  
      // Fetch and render testimonials widget
      const testimonialsElement = document.getElementById('testimonials');
      if (testimonialsElement) {
        fetchWidgetData('encode-api-key/' + encodeURIComponent(apiKey)).then(encodedResponse => {
          const encodedKey = encodedResponse.encodedKey;
          fetchWidgetData(`testimonials?apiKey=${encodedKey}`).then(data => {
            if (data) {
              renderWidget('testimonials', JSON.stringify(data)); // Placeholder for actual rendering logic
            }
          });
        });
      }
  
      // Fetch and render photo gallery widget
      const photoGalleryElement = document.getElementById('photo-gallery');
      if (photoGalleryElement) {
        fetchWidgetData('encode-api-key/' + encodeURIComponent(apiKey)).then(encodedResponse => {
          const encodedKey = encodedResponse.encodedKey;
          fetchWidgetData(`photo-gallery?apiKey=${encodedKey}`).then(data => {
            if (data) {
              renderWidget('photo-gallery', JSON.stringify(data)); // Placeholder for actual rendering logic
            }
          });
        });
      }
  
      // Fetch and render Google reviews widget
      const googleReviewsElement = document.getElementById('google-reviews');
      if (googleReviewsElement) {
        fetchWidgetData('encode-api-key/' + encodeURIComponent(apiKey)).then(encodedResponse => {
          const encodedKey = encodedResponse.encodedKey;
          fetchWidgetData(`google-reviews?apiKey=${encodedKey}`).then(data => {
            if (data) {
              renderWidget('google-reviews', JSON.stringify(data)); // Placeholder for actual rendering logic
            }
          });
        });
      }
    });
  })();