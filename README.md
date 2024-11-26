# Microservices

An application to generate sitemaps for webflow websites that are SEO-happy.

- Recaptcha Workflow




## Nearby Now Routes Documentation

This documentation explains the Express.js routes available in the `Nearby Now` module and provides usage details.

### Base URL

The base URL for all the `Nearby Now` routes is:

```
/nearby-now
```

### Routes

#### 1. `/recent-reviews`

**Method:** POST

**Description:** Fetches recent reviews from the Nearby Now API.

**Request Body:**
- `apiKey` (string): The API key to authenticate with Nearby Now.
- `...atts` (object): Additional attributes to customize the request.

**Usage Example:**
```bash
curl -X POST https://api.ciwgserver.com/nearby-now/recent-reviews \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your_api_key", "city": "Mesa", "state": "AZ"}'
```

#### 2. `/google-reviews`

**Method:** POST

**Description:** Fetches Google reviews from the Nearby Now API.

**Request Body:**
- `apiKey` (string): The API key to authenticate with Nearby Now.
- `...atts` (object): Additional attributes to customize the request.

**Usage Example:**
```bash
curl -X POST https://api.ciwgserver.com/nearby-now/google-reviews \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your_api_key"}'
```

#### 3. `/service-area-map`

**Method:** POST

**Description:** Fetches the service area map data from the Nearby Now API.

**Request Body:**
- `apiKey` (string): The API key to authenticate with Nearby Now.
- `...atts` (object): Additional attributes to customize the request.

**Usage Example:**
```bash
curl -X POST https://api.ciwgserver.com/nearby-now/service-area-map \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your_api_key"}'
```

#### 4. `/testimonials`

**Method:** POST

**Description:** Fetches testimonials from the Nearby Now API.

**Request Body:**
- `apiKey` (string): The API key to authenticate with Nearby Now.
- `start` (number, optional): Starting index for testimonials.
- `count` (number, optional): Number of testimonials to fetch.
- `playlist` (string, optional): Playlist ID.
- `showtranscription` (boolean, optional): Whether to show transcription.

**Usage Example:**
```bash
curl -X POST https://api.ciwgserver.com/nearby-now/testimonials \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your_api_key", "count": 10}'
```

#### 5. `/photo-gallery`

**Method:** POST

**Description:** Fetches a photo gallery from the Nearby Now API.

**Request Body:**
- `apiKey` (string): The API key to authenticate with Nearby Now.
- `start` (number, optional): Starting index for photos.
- `count` (number, optional): Number of photos to fetch.
- `tags` (string, optional): Tags to filter the photos.
- `labels` (string, optional): Labels to filter the photos.

**Usage Example:**
```bash
curl -X POST https://api.ciwgserver.com/nearby-now/photo-gallery \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your_api_key", "count": 5}'
```

### Controllers

Each of the route handlers has been moved to its own controller in the `../controllers/nearby-now/` directory. The following handlers are available:

- `recentReviewsHandler.ts` - Handles the `/recent-reviews` route.
- `googleReviewsHandler.ts` - Handles the `/google-reviews` route.
- `serviceAreaMapHandler.ts` - Handles the `/service-area-map` route.
- `testimonialsHandler.ts` - Handles the `/testimonials` route.
- `photoGalleryHandler.ts` - Handles the `/photo-gallery` route.

### API URL Configuration

The base URL for the Nearby Now API requests has been updated to:

```
https://api.ciwgserver.com
```

The controllers use this URL to make external requests.

### Running the Application

To run the application, make sure you have installed all the dependencies and have the API key ready. Use the following commands:

```bash
npm install
npm start
```

Ensure that the environment variables are properly set if needed, such as API keys and server configurations.

### Notes

- Make sure your API key is valid to successfully interact with the Nearby Now API.
- If any route fails, a `500` error will be returned with an appropriate error message.

