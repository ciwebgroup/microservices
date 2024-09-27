import axios from 'axios';
import { parseStringPromise } from 'xml2js';

function generateTitle(urlFragment: string): string {
  return urlFragment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildHtmlElement(tag: string, content: string, attributes: Record<string, string> = {}): string {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('');
  return `<${tag}${attrs}>${content}</${tag}>`;
}

function generateInnerHtmlSitemap(urls: string[]): string {
  const urlTree: Record<string, any> = {};

  // Build a tree structure from URLs
  urls.forEach(url => {
    const urlParts = url.replace('https://', '').split('/');
    let currentLevel = urlTree;

    urlParts.forEach((part, index) => {
      if (index === urlParts.length - 1) {
        if (!currentLevel.pages) {
          currentLevel.pages = [];
        }
        currentLevel.pages.push({
          loc: url,
          title: generateTitle(part)
        });
      } else {
        if (!currentLevel[part]) {
          currentLevel[part] = { pages: [] };
        }
        currentLevel = currentLevel[part];
      }
    });
  });

  // Recursively generate HTML from the URL tree
  function renderSitemap(tree: Record<string, any>, depth = 1): string {
    let html = '';

    if (tree.pages && tree.pages.length > 0) {
      const pageListItems = tree.pages.map((page: any) =>
        buildHtmlElement('li', buildHtmlElement('a', page.title, { href: page.loc }))
      );
      html += buildHtmlElement('ul', pageListItems.join(''));
    }

    Object.keys(tree).forEach(key => {
      if (key !== 'pages') {
        const topicTitle = generateTitle(key);
        const headingTag = `h${Math.min(depth + 1, 6)}`;
        html += buildHtmlElement(headingTag, topicTitle);
        html += renderSitemap(tree[key], depth + 1);
      }
    });

    return html;
  }

  return `<h1>Sitemap</h1>${renderSitemap(urlTree)}`;
}


// Function to fetch and parse the sitemap XML
async function fetchSitemap(url: string): Promise<string[]> {
  try {
    const response = await axios.get(url);
    const xmlData = response.data;

    // Parse the XML into a JavaScript object
    const parsedData = await parseStringPromise(xmlData);

    // Extract URLs from the sitemap
    const urls = parsedData.urlset.url.map((urlEntry: any) => urlEntry.loc[0].trim());
    return urls;

  } catch (error) {
    console.error('Error fetching or parsing sitemap:', error);
    return [];
  }
}

// Example usage
fetchSitemap('https://emergencyac.webflow.io/sitemap.xml').then(urls => {
  console.log('Extracted URLs:', urls);
  const html = generateInnerHtmlSitemap(urls);
  console.log(html);
});
