import { createClient, ClientConfig } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SanityConfig extends ClientConfig {
	dataset: string;
	projectId: string;
	apiVersion: string;
	useCdn: boolean;
}

export const config: SanityConfig = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
	apiVersion: "2025-06-10",
	useCdn: true,
};

export const sanityClient = createClient(config);

export const urlFor = (source: SanityImageSource) => 
	createImageUrlBuilder(config).image(source);