import createImageUrlBuilder from '@sanity/image-url'
import { ImageSource } from '../types'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: ImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
