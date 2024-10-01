import { Request, Response } from 'express'
// import CustomerRecord from '../models/customerRecord'
import fetchSitemap from '../utils/fetchSitemap'
import transformUrlsHierarchically from '../utils/transformUrlsHierarchically'
import generateSitemap from '../utils/generateSitemap'
import { WebflowClient } from 'webflow-api'
// import { DomWrite, PageList, WebhookList } from 'webflow-api/api'

const accessToken = '8a32228ff770ba076c9ad68635a314a9fdcb9a1b67397f3dfbcf1c6d6b616bfb'

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    console.log('Receiving Request...')

    const body = req.body

    const domain: string = body.payload.domains[0]
    const siteId: string = body.payload.siteId

    console.log('body', body)

    console.log(`Generating Sitemap for ${domain}`)

    const urls: string[] = await fetchSitemap(`https://${domain}/sitemap.xml`)

    console.log(`Recieved ${urls.length} URLs from remote sitemap.`)


    // console.log('Sitemap:', sitemap)
    const webflow: WebflowClient = new WebflowClient({ accessToken })

    const site = await webflow.sites.get(siteId)
    console.log('Site', site)

    const urlTree = transformUrlsHierarchically(urls)
    // const sitemap: DomWrite = generateSitemap(urlTree)

    // const pageList: PageList = await webflow.pages.list(siteId)
    // console.log('PageList', pageList)

    // const sitemapPage = pageList.pages?.find((page) => (page.slug === 'sitemap') )

    /**
     * @TODO: 
     * If the sitemapPage isn't found AND the PageList.pagination.limit + PageList.pagination.offset is less than the 
     * total count, then create a new page for the sitemap, otherwise requery adding the PageList.pagination.limit to 
     * the pageList.pagination.offset and requery until the total count is reached.
     */
    // console.log('Sitemap Page ID:', sitemapPage?.id)

    // const webhooks: WebhookList = await webflow.webhooks.list(siteId)
    // console.log('Webhooks', webhooks)

    // if (sitemapPage?.id) {
    //   webflow.pages.updateStaticContent(sitemapPage.id, sitemap)
    // }


    res.status(200).send('Ok.')

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
