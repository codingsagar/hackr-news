type NewsItem = {
  postId: string;
  title: string;
  url: string;
  hackerNewsUrl: string;
  postedOn: string;
  upvotes: string;
  comments: string;
};

import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
} from "firebase-admin/app";

import { scrapeHackerNews } from "@/lib/scraper";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../../../../serviceKey.json";

const defaultApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      })
    : getApps()[0];

const db = getFirestore(defaultApp);

export async function GET() {
  const newsItems: NewsItem[] = await scrapeHackerNews(3);

  const collectionName = "hackr-news";

  async function writeToFirestore(data: NewsItem[]) {
    try {
      for (const newsItem of data) {
        const postId = newsItem.postId;

        const dataToWrite = {
          title: newsItem.title,
          url: newsItem.url,
          hackerNewsUrl: newsItem.hackerNewsUrl,
          postedOn: newsItem.postedOn,
          comments: newsItem.comments,
          upvotes: newsItem.upvotes,
        };

        const docRef = db.collection(collectionName).doc(postId);

        await docRef.set(dataToWrite);
      }

      console.log("All data written to Firestore successfully.");
    } catch (error) {
      console.error("Error writing to Firestore:", error);
    }
  }

  writeToFirestore(newsItems);

  return Response.json({ newsItems });
}
