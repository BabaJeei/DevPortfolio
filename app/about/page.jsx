import React from "react";
import styles from "./about.module.css";
import Image from "next/image";

export const metadata = {
  title: "About Page",
  description: "About description",
};

const AboutPage = () => {
  return (
    <div className="py-20 -mb-10">
      <div className="py-5 px-7 md:px-20 lg:px-32">
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <h2 className={styles.subtitle}>About Agency</h2>
            <h1 className={styles.title}>About Me</h1>
            <p className={styles.desc}>
              I’m Suraj Pandey, a passionate Frontend Developer with expertise
              in React.js, Next.js, and blockchain integration. I specialize in
              crafting sleek, user-friendly interfaces and seamlessly merging
              Web3 technologies into modern web applications.{" "}
            </p>
            <p className={styles.desc}>
              {" "}
              With a focus on innovation and efficiency, I’ve contributed to
              projects that redefine user experiences in decentralized
              platforms, NFT marketplaces, and tokenization systems. My journey
              is driven by a commitment to delivering scalable, high-performing
              solutions that bridge the gap between traditional web development
              and blockchain technology.
            </p>
            <p className={styles.desc}>
              Let’s connect and build the future of web experiences together!
            </p>
            <div className={styles.boxes}>
              <div className={styles.box}>
                <h1>3 +</h1>
                <p>Year of experience</p>
              </div>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image
              src="/about.png"
              alt="About Image"
              fill
              className={styles.img}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AboutPage;
