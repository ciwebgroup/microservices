// Function to convert form attributes to a config object
function getFormAttributesAsConfig(form) {
  const config = {};
  for (let i = 0; i < form.attributes.length; i++) {
    const attr = form.attributes[i];
    if (attr.name.startsWith('ci-')) { // Check if the attribute starts with 'ci-'
      config[attr.name.replace('ci-','')] = attr.value; // Add the attribute and its value to the config object
    }
  }
  return config;
}

document.addEventListener("DOMContentLoaded", function () {
  // Select all form blocks based on the specified attribute
  const formBlocks = document.querySelectorAll(
    '[ci-recaptcha-element="form-block"]'
  );

  // Server URL and site key for ReCAPTCHA verification
  const serverUrl = "https://wf.vcsr.ai/recaptcha/verify";
  const siteKey = "6LewHlAqAAAAAPkcV8Vx6HffkhQBL3MVKkj98gqI";

  formBlocks.forEach((formBlock) => {

    // Select form and related elements within the block
    const form = formBlock.querySelector("form");
    const successBlock = formBlock.querySelector(
      '[ci-recaptcha-element="success"]'
    );

    const errorBlock = formBlock.querySelector(
      '[ci-recaptcha-element="error"]'
    );

    const submitButton = form.querySelector('[type="submit"]');

    // Handling loading text and original button text
    const loadingText =
      formBlock.getAttribute("ci-recaptcha-loadingtext") || "Loading...";
    const originalSubmitText = submitButton.value;

    // Hide the ReCAPTCHA badge if the attribute is set
    const hideBadge = formBlock.getAttribute("ci-recaptcha-badge") === "hide";
    if (hideBadge) {
      const style = document.createElement("style");
      style.innerHTML = ".grecaptcha-badge { visibility: hidden; }";
      document.head.appendChild(style);
    }

    // Event listener for form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Function to handle the form submission process
      async function handleFormSubmission() {
        submitButton.value = loadingText; // Set the loading text

        try {
          // Execute ReCAPTCHA and retrieve the token
          const token = await grecaptcha.execute(siteKey, { action: "submit" });
          // console.log(token);

          // Serialize form data into a simple object
          const formData = {};
          new FormData(form).forEach((value, key) => {
            formData[key] = value;
          });

          const config = getFormAttributesAsConfig(formBlock);

          const payload = {
            token,
            formData,
            config
          };

          console.log('Event', event);
          console.log('Payload', payload);

          // Send the token and serialized data to the server
          const response = await fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json(); // Parse the JSON response

          submitButton.value = originalSubmitText; // Reset the button text

          // Display success or error messages based on the response
          if (data.details && data.details.success) {
            successBlock.style.display = "block";
            errorBlock.style.display = "none";
          } else {
            successBlock.style.display = "none";
            errorBlock.style.display = "block";
          }

          // Optionally log the response to the console
          if (formBlock.getAttribute("ci-recaptcha-showconsole") === "true") {
            console.log('microservice-response', data);
          }

        } catch (error) {
          submitButton.value = originalSubmitText; // Reset the button text on error
          console.error("Error:", error); // Log any error encountered during the process
        }
      }

      handleFormSubmission(); // Execute the form submission process
    });
  });
});