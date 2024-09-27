import buildHtmlElement from "./buildHtmlElement";
import generateTitle from "./generateTitle";

const generateSitemapHtml = (tree: Record<string, any>, depth = 1): string => {
  let html = "";

  if (tree.pages && tree.pages.length > 0) {
    const pageListItems = tree.pages.map((page: any) =>
      buildHtmlElement(
        "li",
        buildHtmlElement("a", page.title, { href: page.loc })
      )
    );
    html += buildHtmlElement("ul", pageListItems.join(""));
  }

  Object.keys(tree).forEach((key) => {
    if (key !== "pages") {
      const topicTitle = generateTitle(key);
      const headingTag = `h${Math.min(depth + 1, 6)}`;
      html += buildHtmlElement(headingTag, topicTitle);
      html += generateSitemapHtml(tree[key], depth + 1);
    }
  });

  return html;
};

export default generateSitemapHtml