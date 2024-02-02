import { getDocs, getFirestore, collection } from "firebase/firestore";
import firebase_app from "@/lib/firebase/firebase-config";

type NewsItem = {
  postId: string;
  title: string;
  url: string;
  hackerNewsUrl: string;
  postedOn: string;
  upvotes: string;
  comments: string;
};

export async function fetchNews() {
  const db = getFirestore(firebase_app);
  const data: NewsItem[] = [];
  const news = await getDocs(collection(db, "hackr-news"));
  news.forEach((doc) => {
    data.push(doc.data() as NewsItem);
  });

  return data;
}
