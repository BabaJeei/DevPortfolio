import Link from "next/link";
import ProjectsSnip from "../_components/ProjectsSnip";

export const metadata = {
  title: "Projects",
  description:
    "Expert in React.js, Next.js, and blockchain integration, creating seamless user interfaces and innovative Web3 solutions...",
};

export default function Page() {
  return (
    <div className="py-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          My Projects<span className="text-primary">.</span>
        </h1>
        <p className="text-xs">
          Some of my projects i built, see my github <br /> for all projects
          <span className="text-primary">.</span>
        </p>
      </div>
      <ProjectsSnip />
    </div>
  );
}
