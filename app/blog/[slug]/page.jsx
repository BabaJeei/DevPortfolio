// import { getPost } from "@/lib/data";
import React, { Suspense } from "react";
import styles from "./singlePost.module.css";
import Image from "next/image";
import PostUser from "@/components/postUser/postUser";

const getData = async (slug) => {
  const res = await fetch(
    `https://next-js-14-blog-app.vercel.app/api/blog/${slug}`
  );

  if (!res.ok) {
    // throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);

  return {
    title: post?.title,
    description: post?.desc,
    openGraph: {
      title: post?.title,
      description: post?.desc,
      images: post?.img,
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.desc,
      images: post?.img,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification=GOOGLE_SITE_VERIFICATION",
    },
  };
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  const post = await getData(slug);
  console.log(post, "---- post");

  return (
    <div className="flex gap-2 flex-wrap items-center justify-center md:px-20 lg:px-32 px-5">
      <div className={styles.container}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image
              src={post.img}
              width={800}
              height={533}
              alt=""
              // fill
              className={styles.img}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.detail}>
            {/* {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )} */}
            <div className={styles.detailText}>
              <span className={styles.detailTitle}>Published</span>
              <span className={styles.detailValue}>
                {post.createdAt?.toString().slice(4, 16)}
              </span>
            </div>
          </div>
          <div className={styles.content}>{post.desc}</div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
