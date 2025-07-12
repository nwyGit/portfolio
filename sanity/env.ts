export const apiVersion: string =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-11-30'

export const dataset: string | undefined = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId: string | undefined = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const useCdn: boolean = false
