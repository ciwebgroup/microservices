import { Request, Response } from 'express'
// import CustomerRecord from '../models/customerRecord'
import fetchSitemap from '../utils/fetchSitemap'
import transformUrlsHierarchically from '../utils/transformUrlsHierarchically'
import generateSitemap from '../utils/generateSitemap'

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const domain = body.domains[0]

    console.log(`Generating Sitemap for ${domain}`)

    const styleBlock = `
      <style>
       body { font-family: Arial, sans-serif; }
       h1, h2, h3 { color: #333; }

       /* Card Style */
       ul { list-style: none; padding: 0; }
       li { margin: 10px 0; padding: 10px; background-color: #f4f4f4; border-radius: 5px; }
       a { color: #007BFF; text-decoration: none; }
       a:hover { text-decoration: underline; }
       </style>`

    const urls = await fetchSitemap(`https://${domain}/sitemap.xml`)
    const urlTree = transformUrlsHierarchically(urls)
    const sitemap = generateSitemap(urlTree)

    console.log('Sitemap:', sitemap)

    res.status(200).send(`${styleBlock} <div id="sitemap-container">${sitemap}</div>`)

    // Handle Webflow webhook events
    // switch (event._type) {
    //   case 'site_publish':
    //     // Upsert site data
    //     break
    //   // Handle other cases
    // }

  } catch (err) {
    res.status(500).send((err as Error).message)
  }
}
