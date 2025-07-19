import { Rule as SanityRule } from '@sanity/types'
import { Image as SanityImage } from '@sanity/types'

// Sanity validation rule type
export type ValidationRule = SanityRule

// Image types
export interface ImageSource extends SanityImage {
  asset?: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Preview selection types
export interface PreviewSelection {
  title?: string
  author?: string
  media?: ImageSource
}

// Schema field types
export interface SchemaField {
  name: string
  title: string
  type: string
  validation?: (rule: ValidationRule) => ValidationRule
  options?: Record<string, any>
  of?: Array<{ 
    type: string; 
    to?: Array<{ type: string }>;
    options?: Record<string, any>;
    fields?: SchemaField[];
  }>
  to?: Array<{ type: string }>
  fields?: SchemaField[]
  rows?: number
  initialValue?: any
}

// Schema definition types
export interface SchemaDefinition {
  name: string
  title: string
  type: string
  fields: SchemaField[]
  preview?: {
    select: Record<string, string>
    prepare: (selection: any) => any
  }
}