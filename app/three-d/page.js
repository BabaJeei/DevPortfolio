// import ThreeHome from "../_components/threeD/ThreeHome";
import dynamic from "next/dynamic";

const ThreeHome = dynamic(() => import("../_components/threeD/ThreeHome"), {
  ssr: false,
});

export const metadata = {
  title: "Projects",
  description:
    "Expert in React.js, Next.js, and blockchain integration, creating seamless user interfaces and innovative Web3 solutions...",
};

export default function Page() {
  return (
    <div className="">
      <ThreeHome />
    </div>
  );
}
