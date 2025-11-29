export interface StaticProject {
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

export interface StaticService {
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

let projectsCache: StaticProject[] | null = null;
let servicesCache: StaticService[] | null = null;
let tagsCache: string[] | null = null;

export async function getStaticProjects(): Promise<StaticProject[]> {
  if (projectsCache) {
    return projectsCache;
  }

  try {
    const response = await fetch('/data/projects.json');
    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    projectsCache = await response.json();
    return projectsCache!;
  } catch (error) {
    console.error('Error loading static projects:', error);
    return [];
  }
}

export async function getStaticServices(): Promise<StaticService[]> {
  if (servicesCache) {
    return servicesCache;
  }

  try {
    const response = await fetch('/data/services.json');
    if (!response.ok) {
      throw new Error('Failed to fetch services data');
    }
    servicesCache = await response.json();
    return servicesCache!;
  } catch (error) {
    console.error('Error loading static services:', error);
    return [];
  }
}

export async function getStaticTags(): Promise<string[]> {
  if (tagsCache) {
    return tagsCache;
  }

  try {
    const response = await fetch('/data/tags.json');
    if (!response.ok) {
      throw new Error('Failed to fetch tags data');
    }
    tagsCache = await response.json();
    return tagsCache!;
  } catch (error) {
    console.error('Error loading static tags:', error);
    return [];
  }
}

export function filterProjects(
  projects: StaticProject[],
  tag?: string,
  limit?: number,
  skip?: number
): StaticProject[] {
  let filtered = projects;

  // Filter by tag if provided and not "all"
  if (tag && tag !== "all") {
    filtered = projects.filter(project =>
      project.tags.some(projectTag =>
        projectTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  // Sort by weight descending
  filtered = filtered.sort((a, b) => b.weight - a.weight);

  // Apply pagination
  if (skip !== undefined) {
    filtered = filtered.slice(skip);
  }
  if (limit !== undefined) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

export function findProjectBySlug(
  projects: StaticProject[],
  slug: string
): StaticProject | undefined {
  return projects.find(project => project.slug === slug);
}

export function findServiceBySlug(
  services: StaticService[],
  slug: string
): StaticService | undefined {
  return services.find(service => service.slug === slug);
}