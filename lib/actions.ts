import axios from 'axios';
import cheerio from 'cheerio';

export async function scrapeProductDetails(url: string) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const productPriceElement = $('span.-b.-ubpt.-tal.-fs24.-prxs');
    const lowestPriceElement = productPriceElement
      .next('div')
      .find('span.-tal.-gy5.-lthr.-fs16.-pvxs.-ubpt');
    const percentDropElement = productPriceElement
      .next('div')
      .find('span.bdg._dsct._dyn.-mls');

    const currentPrice = parseFloat(
      productPriceElement.text().replace(/[^0-9.-]+/g, '')
    );
    const lowestPrice = parseFloat(
      lowestPriceElement.text().replace(/[^0-9.-]+/g, '')
    );
    const percentDrop = parseFloat(
      percentDropElement.text().replace(/[^0-9.-]+/g, '')
    );

    return { currentPrice, lowestPrice, percentDrop };
  } catch (error) {
    console.error('Error scraping product details:', error);
    throw error;
  }
}
