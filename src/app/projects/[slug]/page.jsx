import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import ProjectDetailContent from "@/components/Projects/ProjectDetailContent";

import petCareImg from "@/assets/petcare.png";
import civicCleanImg from "@/assets/CivicClean.png";
import smartDealImg from "@/assets/smartdeals.png";
import portfolioImg from "@/assets/portfolio.png";

const imageMap = {
  petcare: petCareImg,
  CivicClean: civicCleanImg,
  smartdeals: smartDealImg,
  portfolio: portfolioImg,
};

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Boishakhi Mukta`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} image={imageMap[project.imageSrc]} />;
}
