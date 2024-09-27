import generateTitle from './generateTitle'

const transformUrlsHierarchically = (urls: string[]): Record<string, any> => {
  const urlTree: Record<string, any> = {}

  // Build a tree structure from URLs
  urls.forEach(url => {
    const urlParts = url.replace('https://', '').split('/')
    let currentLevel = urlTree

    urlParts.forEach((part, index) => {

      if (index === urlParts.length - 1) {

        if (!currentLevel.pages) {
          currentLevel.pages = []
        }

        currentLevel.pages.push({
          loc: url,
          title: generateTitle(part)
        })

      } else {

        if (!currentLevel[part]) {
          currentLevel[part] = { pages: [] }
        }

        currentLevel = currentLevel[part]
      }
    })
  })

  return urlTree
}

export default transformUrlsHierarchically