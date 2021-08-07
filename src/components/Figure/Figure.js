import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { getFluidGatsbyImage, getGatsbyImageData } from 'gatsby-source-sanity'

const sanityConfig = { projectId: '9ox83bxr', dataset: 'production' }


export default ({ node }) => {
  return (
    <figure>
      <GatsbyImage
        image={getGatsbyImageData(node.image.asset.assetId, { maxWidth: 1024 }, sanityConfig)}
        alt={node.image.alt}

      />
      <figcaption>{node.image.caption}</figcaption>
    </figure>
  )
}