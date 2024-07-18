import axios from "axios";
import cheerio from "cheerio";

module.exports = {
  query: async (alpha = null, modifier = null, accent = null, legend = null, products, setProducts) => {
    try {
      const filters = {
        alpha: alpha,
        modifier: modifier,
        accent: accent,
        legend: legend
      };
      const productsList = []

      const response = await axios.get('http://localhost:3001/keycaps', {
        params: filters
      });

      const html = response.data
      const $ = cheerio.load(html)

      $('article').each((index, element) => {
        const firstDiv = $(element).find('div:nth-child(1)');
        const secondDiv = $(element).find('div:nth-child(2)');

        const title = secondDiv.find('a:nth-child(1)').text().trim();
        const cost = firstDiv.find('div').text().trim();
        const image = firstDiv.find('a > img').attr('src');
        const url = secondDiv.find('a:nth-child(2)').attr('href');


        const product = {
          title: title,
          cost: cost,
          image: image,
          url: url
        }

        productsList.push(product);
      })

      setProducts(productsList)

    } catch (error) {
      console.error('Error fetching the page:', error);
    }
  },
};