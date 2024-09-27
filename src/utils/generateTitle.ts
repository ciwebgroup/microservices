
const generateTitle = (urlFragment: string): string => {
  return urlFragment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default generateTitle