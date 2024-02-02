import axios from "axios";
import cheerio from "cheerio";

async function scrapeHackerNews(pages) {
  const newsItems = [];

  for (let page = 1; page <= pages; page++) {
    const response = await axios.get(
      `https://news.ycombinator.com/news?p=${page}`
    );
    const $ = cheerio.load(response.data);

    $("tr.athing").each((index, element) => {
      const title = $(element).find(".titleline > a").text().trim();
      const postId = $(element).attr("id");
      const url = $(element).find(".titleline > a").attr("href");
      const hackerNewsUrl = `https://news.ycombinator.com/item?id=${postId}`;
      const postedOn = $(element).next().find(".age").attr("title");
      const upvotes = $(element).next().find(".score").text().trim().split(" ")[0];
      const comments = $(element)
      .next()  
      .find('a:contains("comment")')
      .text();
  

      newsItems.push({
        postId,
        title,
        url,
        hackerNewsUrl,
        postedOn,
        upvotes,
        comments,
      });
    });
  }

  return newsItems;
}

export { scrapeHackerNews };
