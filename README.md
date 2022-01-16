<!-- START -->

# Oliver website

[![Netlify Status](https://api.netlify.com/api/v1/badges/44da42bc-8204-4758-8dbd-3e1c3f64cb35/deploy-status)](https://app.netlify.com/sites/adoring-bohr-7062c0/deploys)

<!-- TABLE OF CONTENTS -->

## Contents

- [About the Project](#about-the-project)
- [Overview](#overview)
  - [Built with](#builtwith)
- [Design](#design)
  - [Figma](#figma)
  - [Design Tokens](#designtokens)
  - [Fonts](#fonts)
- [Performance](#performance)
- [Usage](#usage)
  - [What's inside](#whats-inside)
- [Contact](#contact)

---

<!-- ABOUT THE PROJECT -->

## About the Project

I really need to rebuild this thing.

I built it super fast in the hopes that building a website would help make sense some of the most recent work I've done, and that by putting as much it in one place as I can, it could help reason about where I'm going.

It's live at [mattoliver.xyz](https://mattoliver.xyz).

I'm always interested in working with misfits, outcasts, and hell-raisers who want to create positive change and challenge the status quo. If you like what you see, please feel free to [get in touch](mailto:mattoliver.mattoliver@gmail.com).

## Overview

The site's built with Gatsby and there's a crazily over-engineered instance of Sanity as the CMS. I wrote all the CSS from scratch with [styled-components](https://styled-components.com/); it is pretty obvious that it is in bad need of a systematic redesign.

The responsive grid and table of contents component on the individual project pages took some doing though. Please feel free to leave some feedback through the contact form.

#### Built With

- Front-end: [Gatsby](https://gatsbyjs.org)
- Backend: [Sanity](https://sanity.io)
- Animations: [Framer Motion](https://www.framer.com/motion/)
- Deployed with [Netlify](https://netlify.com)

<!-- DESIGN -->

## 📌 Design

I wanted to focus on the stories behind the projects, the technologies used, some of the challenges I faced while building them, and to keep things simple.

### Figma

I used a super boring and straightforward set of tokens initially.

I'm in the process of re-working a color system, typography, and spacing scale variables for the project and you can follow along at this [Figma file](https://www.figma.com/file/pNeLyhXpKIgWPZkPoJjUhL/Oliver-Site-Tokens?node-id=12%3A230) if interested.

### Fonts:

Wherever possible I believe in supporting indie type foundries, but truth be told, I'm broke at the moment, and I needed to get this thing off the ground so I'm just using the [system font stack](https://systemfontstack.com/) for now.

- `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`

## 🚀 Usage:

1.  **Install.**

    ```shell
    # install dependencies
    npm install
    ```

1.  **Start developing.**

    Navigate into the site’s directory and start it up.

    ```shell
    npm start
    ```

1.  **Open the source code and start editing!**

    Site will run at `http://localhost:8000`.

## 🧐 What's inside?

```.
├── LICENSE
├── README.md
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-ssr.js
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
├── static
└── tailwind.config.js
```

<!-- CONTACT -->

## Contact

Live: [https://mattoliver.xyz](https://mattoliver.xyz)

Matt Oliver - [mattoliver.mattoliver@gmail.com](mattoliver.mattoliver@gmail.com)

<!-- END -->
