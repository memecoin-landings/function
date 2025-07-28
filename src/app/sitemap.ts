import type { MetadataRoute } from "next";
import "reflect-metadata";
import { container } from "tsyringe";
import { services } from "../components/services/all-services-block";
import getConfig from "../config";
import VehicleService from "../domain/vehicle/vehicleService";

const baseUrl = getConfig().baseUrl;

const service = container.resolve(VehicleService);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await service.getVehicles();
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...cars.map((b) => ({
      url: `${baseUrl}/catalog/${b.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.link}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/contacts`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
