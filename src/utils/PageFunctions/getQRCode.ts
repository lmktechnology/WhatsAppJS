import { Page } from "puppeteer";
import { Selectors } from './_constans'

export default async function getQRCode (page: Page): Promise<string> {
    const imageParentSelector = Selectors.QRCODE_IMG_PARENT_CLASS
    const QRCodeString = await page.evaluate((imageParentSelector) => {
        let parentElement = document.querySelector(imageParentSelector)
        let imageElement = parentElement.querySelector('img')
        let imageSource = imageElement.getAttribute('src')
        return Promise.resolve(imageSource)
    }, imageParentSelector)
    return QRCodeString
}