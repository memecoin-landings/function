import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { container } from "tsyringe";
import ProjectStrapiRepository from "@/infrastructure/project.strapi-repository";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tag = searchParams.get("tag") ?? undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!)
      : undefined;

    const repository = container.resolve(ProjectStrapiRepository);
    // console.log("Fetching projects with", { tag, limit, skip });
    const projects = await repository.list(tag, limit, skip);
    // console.log("Fetched: ", projects);

    return NextResponse.json(
      projects.map((project) => ({
        title: project.title,
        slug: project.slug,
        image: {
          url: project.image.getSource()?.url,
          width: project.image.getSource()?.width,
          height: project.image.getSource()?.height,
        },
        body: project.body,
        categories: project.categories,
        tags: project.tags,
        weight: project.weight,
      })),
    );
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
