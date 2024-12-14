import React from "react";
// import Card from "./Card";
// import { Post } from "@/lib/models";
// import { getPosts } from "@/lib/data";
import Card from "../_components/Card";

const getPosts = async () => {
  const res = await fetch("https://next-js-14-blog-app.vercel.app/api/blog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPost = async () => {
  const posts = await getPosts();

  const renderedPosts = posts
    .slice(0, 6)
    .map((post) => <Card key={post.id} post={post} />);
  return (
    <div className="flex gap-2 flex-wrap items-center justify-center md:px-20 lg:px-32 px-5">
      {/* <div className="py-10 -mt-5 mb-10 px-5">  */}
      {posts && posts.length > 0 && (
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold">
            Popular Posts<span className="text-primary">.</span>
          </h1>
          {/* <p className='text-xs'>Some of <br /> for all projects<span className="text-primary">.</span></p> */}
        </div>
      )}
      {/* <h1 className="text-left text-xl">Popular Posts</h1> */}
      {/* <span className="border-2 float-left w-32"></span> */}
      <div className="flex flex-wrap gap-7 w-full justify-center lg:justify-between">
        {renderedPosts}
      </div>
    </div>
  );
};

export default BlogPost;
