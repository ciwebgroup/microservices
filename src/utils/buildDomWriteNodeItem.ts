// import { DomWriteNodesItem } from "webflow-api/api"

// const buildDomWriteNodeItem = (tag: string, node: DomWriteNodesItem, attributes: Record<string, string> = {}): DomWriteNodesItem => {

//   const attrs = Object.entries(attributes)
//     .map(([key, value]) => ` ${key}="${value}"`)
//     .join('')

//   return {
//     nodeId: node.nodeId,
//     text: `<${tag}${attrs}>${node.text}</${tag}>`
//   }
// }

// export default buildDomWriteNodeItem