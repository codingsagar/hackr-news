"use client";
import { fetchNews } from "@/lib/firebase/getNews/fetchNews";
import { toast } from "sonner";
import useAuthStore from "../../../store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type NewsItem = {
  postId: string;
  title: string;
  url: string;
  hackerNewsUrl: string;
  postedOn: string;
  upvotes: string;
  comments: string;
};

export default function SavedArticles() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You are not logged in !");
      router.push("/login");
    }
    setIsLoading(true);
    fetchNews().then((res) => {
      res.sort(
        (a, b) =>
          new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime()
      );
      setNews(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <h1 className="text-primary font-bold text-2xl p-10 text-center">
        Loading ... Please wait
      </h1>
    );

  return (
    <div>
      <h1 className="text-primary font-bold text-2xl p-10 text-center">
        Your Dashboard
      </h1>
      <div className="flex justify-center flex-col items-center">
        {news.length > 0 ? (
          news.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[80%] bg-slate-800 border border-slate-500 rounded-md p-5 my-5"
              >
                <h1 className="text-lg font-bold py-2">{item.title}</h1>
                <span>Upvotes : {item.upvotes}</span>
                &nbsp;| &nbsp;
                <span>
                  {item?.comments?.length > 0 ? item?.comments : "0 comments"}
                </span>
                &nbsp; | &nbsp;
                <span className="text-neutral-500 dark:text-neutral-300">
                  Posted {dayjs(item?.postedOn)?.fromNow()}
                </span>
                <div className="flex gap-x-3 my-4">
                  <Button
                    as={Link}
                    href={item?.hackerNewsUrl}
                    size="sm"
                    color="primary"
                    target="_blank"
                  >
                    Hacker News Url
                  </Button>
                  <Button
                    as={Link}
                    href={item?.url}
                    size="sm"
                    color="secondary"
                    target="_blank"
                  >
                    News Url
                  </Button>

                  <Button
                    isIconOnly
                    color="success"
                    variant="faded"
                    aria-label="Done Reading"
                  >
                    <IoCheckmarkDoneCircleSharp size={20} />
                  </Button>

                  <Button isIconOnly color="danger" aria-label="delete">
                    <MdDelete size={20} />
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>News not available !</h1>
        )}
      </div>
    </div>
  );
}
