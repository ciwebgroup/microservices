// nearby-now-widgets.js

(function () {
    document.addEventListener('DOMContentLoaded', function () {
      const apiKey = window.NearbyNowAPIKey;
      if (!apiKey) {
        console.error('Nearby Now API key not found. Please define window.NearbyNowAPIKey in your script.');
        return;
      }
  
      const baseUrl = 'http://localhost:3000/nearby-now';
  
      // Function to make API requests
      const fetchWidgetData = async (endpoint, requestData) => {
        try {
          const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return await response.text().then(text => htmlEncode(text));
        } catch (error) {
          console.error('Error fetching widget data:', error);
        }
      };
  
      // Function to HTML encode the response text
      const htmlEncode = (str) => {
        return str.replace(/\t/g, '  ').replace('<br>',''); };
  
      // Function to render widget content in a target element
      const renderWidget = (elementId, content) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = content;
        }
      };
  
      // Fetch and render recent reviews widget
      const recentReviewsElement = document.getElementById('nn-recent-reviews');
      if (recentReviewsElement) {
        fetchWidgetData('recent-reviews', { apiKey }).then(data => {
          if (data) {
            renderWidget('nn-recent-reviews', data); // Render HTML content
          }
        });
      }
  
      // Fetch and render testimonials widget
      const testimonialsElement = document.getElementById('nn-testimonials');
      if (testimonialsElement) {
        fetchWidgetData('testimonials', { apiKey }).then(data => {
          if (data) {
            renderWidget('nn-testimonials', data); // Render HTML content
          }
        });
      }
  
      // Fetch and render photo gallery widget
      const photoGalleryElement = document.getElementById('nn-photo-gallery');
      if (photoGalleryElement) {
        fetchWidgetData('photo-gallery', { apiKey }).then(data => {
          if (data) {
            renderWidget('nn-photo-gallery', data); // Render HTML content
          }
        });
      }
  
      // Fetch and render Google reviews widget
      const googleReviewsElement = document.getElementById('nn-google-reviews');
      if (googleReviewsElement) {
        fetchWidgetData('google-reviews', { apiKey }).then(data => {
          if (data) {
            renderWidget('nn-google-reviews', data); // Render HTML content
          }
        });
      }
    });
  })();
  