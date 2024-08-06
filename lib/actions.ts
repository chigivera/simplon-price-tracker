import axios from 'axios';
import cheerio from 'cheerio';
import bcrypt from 'bcryptjs';
import prisma from './db';

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

export async function createUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword
      }
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
