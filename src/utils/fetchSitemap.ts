import axios from "axios";
import { parseStringPromise } from "xml2js";

const fetchSitemap = async (sitemapUrl: string): Promise<string[]> => {
  try {
    const response = await axios.get(sitemapUrl);
    const xmlData = response.data;

    // Parse the XML into a JavaScript object
    const parsedData = await parseStringPromise(xmlData);

    // Extract URLs from the sitemap
    const urls = parsedData.urlset.url.map((urlEntry: any) =>
      urlEntry.loc[0].trim()
    );
    return urls;
  } catch (error) {
    console.error("Error fetching or parsing sitemap:", error);
    return [];
  }
};

export default fetchSitemap;
