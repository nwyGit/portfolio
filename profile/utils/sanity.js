import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2023-11-30",
	useCdn: true,
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
