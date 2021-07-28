module.exports = {
  siteMetadata: {
    title: `Matt Oliver`,
    description: `Product portfolio for Matt Oliver, a product-focused, mission-driven creative engineer based in Austin, Texas.`,
    author: `Matt Oliver`,
    siteUrl: `https://github.com/theemattoliver`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: false, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      }
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `9ox83bxr`,
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `es`, `ko`, `de`],
        defaultLanguage: `en`,
        redirect: true,
        redirectComponent: require.resolve(`${__dirname}/src/components/Redirect.js`),
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: `${__dirname}/assets/svg`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mgo-website-gatsby`,
        short_name: `Matt Oliver`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: require.resolve(`${__dirname}/src/assets/images/logo.png`), // This path is relative to the root of the site.
        theme_color_in_head: false,
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ] // Add or remove icon sizes as desired

      },
    },
    `gatsby-plugin-offline`
  ]
}
