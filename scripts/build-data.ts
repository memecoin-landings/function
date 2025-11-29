#!/usr/bin/env tsx

import * as fs from "fs";
import * as path from "path";
import "reflect-metadata";
import { container } from "tsyringe";
import getConfig from "../src/config";
import ProjectStrapiRepository from "../src/infrastructure/project.strapi-repository";
import ContactsService from "../src/infrastructure/contacts.service";
import StrapiClient from "../src/infrastructure/strapi/strapi-client";

interface StaticProject {
  title: string;
  slug: string;
  body?: unknown;
  categories: string[];
  tags: string[];
  weight: number;
  image: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

interface StaticService {
  title: string;
  slug: string;
  description: string;
  stages: Array<{
    name: string[];
    description: string;
    duration?: string;
    revisions?: string;
    nextStages?: string;
  }>;
}

async function buildStaticData() {
  console.log("🚀 Building static data from Strapi...");

  const config = getConfig();
  
  // Setup DI container
  container.register("StrapiClient", {
    useValue: new StrapiClient(
      config.strapi.baseUrl,
      config.strapi.publicUrl,
      config.strapi.apiToken
    )
  });

  const projectRepo = container.resolve(ProjectStrapiRepository);
  const contactsService = container.resolve(ContactsService);

  try {
    // Fetch all projects
    console.log("📦 Fetching projects...");
    const projects = await projectRepo.list(undefined, 100, 0);
    
    // Fetch contacts
    console.log("📞 Fetching contacts...");
    const contacts = await contactsService.getContactInfo();
    
    // Convert to static format
    const staticProjects: StaticProject[] = projects.map(project => ({
      title: project.title,
      slug: project.slug || project.title.toLowerCase().replace(/\s+/g, "-"),
      body: project.body,
      categories: project.categories,
      tags: project.tags,
      weight: project.weight,
      image: {
        url: project.image.url,
        alt: project.image.alt,
        width: project.image.width,
        height: project.image.height,
      }
    }));

    // Get unique tags for filtering
    const allTags = Array.from(
      new Set(
        staticProjects.flatMap(project => project.tags)
      )
    ).sort();

    // Fetch services (from static file for now since they're hardcoded)
    const servicesModule = await import("../src/infrastructure/services");
    const services = servicesModule.default;
    
    const staticServices: StaticService[] = services.map(service => ({
      title: service.title,
      slug: service.slug,
      description: service.description,
      stages: service.stages.map(stage => ({
        name: stage.name,
        description: stage.description,
        duration: stage.duration,
        revisions: stage.revisions,
        nextStages: stage.nextStages,
      }))
    }));

    // Ensure public/data directory exists
    const dataDir = path.join(process.cwd(), "public", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write static data files
    const projectsFile = path.join(dataDir, "projects.json");
    const servicesFile = path.join(dataDir, "services.json");
    const tagsFile = path.join(dataDir, "tags.json");
    const contactsFile = path.join(dataDir, "contacts.json");

    fs.writeFileSync(projectsFile, JSON.stringify(staticProjects, null, 2));
    fs.writeFileSync(servicesFile, JSON.stringify(staticServices, null, 2));
    fs.writeFileSync(tagsFile, JSON.stringify(allTags, null, 2));
    fs.writeFileSync(contactsFile, JSON.stringify({
      email: contacts.email,
      phone: contacts.phone,
      address: contacts.address,
      socialLinks: contacts.socialLinks,
    }, null, 2));

    console.log(`✅ Generated ${staticProjects.length} projects`);
    console.log(`✅ Generated ${staticServices.length} services`);
    console.log(`✅ Generated ${allTags.length} tags`);
    console.log(`✅ Generated contacts data`);
    console.log("📁 Static data saved to public/data/");

  } catch (error) {
    console.error("❌ Error building static data:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildStaticData();
}

export default buildStaticData;