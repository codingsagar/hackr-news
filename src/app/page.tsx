import { Button } from "@nextui-org/button";
import Image from "next/image";
import img1 from "../../public/img1.jpg";
import img2 from "../../public/img2.jpg";
import img3 from "../../public/img3.jpg";
import { Link } from "@nextui-org/react";
import { Spacer } from "@nextui-org/spacer";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-y-10 py-20">
      <Image
        width={250}
        src={img2}
        alt="A hacker reading tech news"
        className="rounded-md"
      />
      <h1 className="font-bold text-2xl text-center">
        &quot;Get the Latest&nbsp;
        <span className="text-primary">Tech News </span> with a Modern
        Twist&quot;🚀{" "}
      </h1>
      <div className="flex gap-4">
        <Button color="primary" variant="solid" as={Link} href="/login">
          Login
        </Button>
        <Button color="primary" variant="ghost" as={Link} href="/signup">
          Sign Up
        </Button>
      </div>

      <section className="md:p-20 flex justify-center flex-col items-center w-full">
        <h2 className="font-bold text-3xl pb-16">WHY HACKR NEWS ?</h2>
        <div className="flex gap-x-3 bg-slate-900 md:w-1/2 md:self-start border-slate-500 border rounded-md w-screen">
          <Image
            width={150}
            src={img1}
            alt="A hacker reading tech news"
            className="rounded-md"
          />
          <h3 className="font-bold py-10 text-lg self-center">
            Get top latest 90 tech news
          </h3>
        </div>
        <Spacer y={10} />
        <div className="flex gap-x-3 bg-slate-900 md:w-1/2 self-end border-slate-500 border rounded-md w-screen">
          <Image
            width={150}
            src={img2}
            alt="A hacker reading tech news"
            className="rounded-md"
          />

          <h3 className="font-bold py-10 text-lg self-center">
            News listed in reverse chronological order
          </h3>
        </div>
        <Spacer y={10} />
        <div className="flex gap-x-3 bg-slate-900 md:w-1/2 w-screen self-start border-slate-500 border rounded-md">
          <Image
            width={150}
            src={img3}
            alt="A hacker reading tech news"
            className="rounded-md"
          />

          <h3 className="font-bold py-10 text-lg self-center">
            Marks news as read or delete it
          </h3>
        </div>
      </section>
    </main>
  );
}
