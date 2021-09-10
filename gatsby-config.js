module.exports = {
  siteMetadata: {
    title: `Matt Oliver`,
    titleTemplate: "%s · Matt Oliver · Austin, TX",
    description: `Web and digital product portfolio for Matt Oliver, an artist and engineer based in Austin, Texas.`,
    author: `Matt Oliver`,
    siteUrl: `https://adoring-bohr-7062c0.netlify.app`,
    image: "/social-share-card.png",
    twitterUsername: "@theemattoliver",
  },
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        devMode: true,
      },
    },
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
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
    `gatsby-plugin-image`,
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
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
          {
            src: `/maskable_icon_512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `any maskable`
          }
        ] // Add or remove icon sizes as desired

      },
    },
    `gatsby-plugin-offline`
  ]
}
