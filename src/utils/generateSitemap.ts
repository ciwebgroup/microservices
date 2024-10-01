// import { DomWrite, DomWriteNodesItem } from "webflow-api/api"
// import buildDomWriteNodeItem from "./buildDomWriteNodeItem"
// import generateTitle from "./generateTitle"

export default function (){
  return ''
}

// const generateSitemap = (tree: Record<string, any>, depth = 1): DomWrite => {
//   // let html = ""
//   const nodes: DomWriteNodesItem[] = []

//   if (tree.pages && tree.pages.length > 0) {

//     const pageListItems = tree.pages.map((page: any, index: number) =>
//       buildDomWriteNodeItem(
//         "li",
//         buildDomWriteNodeItem(
//           "a",
//           { nodeId: `a-node-${depth}-${index}`, text: page.title },
//           {
//             href: page.loc,
//             class: "sitemap-item",
//           }
//         ),
//         {
//           class: "sitemap-list-item",
//         }
//       )
//     )

//     nodes.push(buildDomWriteNodeItem(
//       "ul",
//       { nodeId: `ul-node-${depth}`, text: nodes.map(() => "").join("") },
//       { class: "sitemap-list" }
//     ))

//   }

//   Object.keys(tree).forEach((key) => {
//     if (key !== "pages") {

//       const topicTitle = generateTitle(key)
//       const headingTag = `h${Math.min(depth + 1, 6)}`

//       nodes.push(buildDomWriteNodeItem(
//         headingTag,
//         { nodeId: `heading-${key}`, text: topicTitle },
//         { class: "sitemap-topic" }
//       ))

//       generateSitemap(tree[key], depth + 1).nodes.map(node => nodes.push(node))
//     }
//   })

//   return {
//     locale: '',
//     nodes
//   }
// }

// export default generateSitemap
