const buildHtmlElement = (tag: string, content: string, attributes: Record<string, string> = {}): string => {

  const attrs = Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('')

  return `<${tag}${attrs}>${content}</${tag}>`
}

export default buildHtmlElement