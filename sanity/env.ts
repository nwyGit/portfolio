export const apiVersion: string =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-11-30'

export const dataset: string = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const useCdn: boolean = false
