import { Request, Response } from "express";
import { validationResult } from "express-validator";

import fetchSitemap from "../utils/fetchSitemap";
import generateTitle from "../utils/generateTitle";
// import transformUrlsHierarchically from '../utils/transformUrlsHierarchically'
// import generateSitemapHtml from '../utils/generateSitemapHtml'

interface SitemapLink {
  title: string;
  url: string;
  children?: SitemapLink[];
}

interface Sitemap {
  [key: string]: SitemapLink[];
}

function buildSitemap(urls: string[]): Sitemap {
  const sitemap: Sitemap = {};

  for (const url of urls) {
    const urlParts = url.split("/");
    console.log(urlParts.length)

    // Identify topic based on URL depth and potential topic prefixes
    if (urlParts.length < 4) continue;
    const topic =
      urlParts.length === 4
        ? "Main"
        : generateTitle(urlParts[urlParts.length - 2]);

    const title =
      urlParts.length > 3 ? generateTitle(urlParts.slice(-1).join("/")) : "";

    if (!sitemap[topic]) {
      sitemap[topic] = [];
    }

    const link: SitemapLink = { title, url, children: [] };
    sitemap[topic].push(link);

    if (urlParts.length > 3) {
      const subUrl = urlParts.slice(0, urlParts.length - 1).join("/");
      const subSitemap = buildSitemap([subUrl]);
      link.children = subSitemap[topic]; // Assign sub-sitemap children based on identified topic
    }
  }

  return sitemap;
}

// const accessToken = '8a32228ff770ba076c9ad68635a314a9fdcb9a1b67397f3dfbcf1c6d6b616bfb'
// Controller to handle POST requests and fetch the sitemap
export const handleSitemap = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors
        .array()
        .map((err) => err.msg)
        .join(", "),
    });
  }

  const { url } = req.body;

  try {
    const urlList = await fetchSitemap(`${url}/sitemap.xml`);
    // const urlTree = transformUrlsHierarchically(urlList);
    // const sitemap = generateSitemapHtml(urlTree);
    const sitemap = buildSitemap(urlList);

    console.log(sitemap);

    return res.json({
      success: true,
      sitemap: sitemap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching sitemap or invalid URL",
    });
  }
};
