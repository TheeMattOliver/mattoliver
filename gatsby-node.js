import path from 'path';

async function turnProjectsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const projectPageTemplate = path.resolve('./src/templates/ProjectPage.js')
  // 2. Query all the projects
  const { data } = await graphql(`
    query {
      projects: allSanityProject {
        nodes {
          id
          slug {
            current
          }
          title
        }
      }
    }
  `)
  // 3. Loop over each project and create a page for that project
  data.projects.nodes.forEach(project => {
    actions.createPage({
      path: `work/${project.slug.current}`,
      component: projectPageTemplate,
      context: {
        slug: project.slug.current
      }
    })
  })
}

async function turnTechnologiesIntoPages({ graphql, actions }) {
  // 1. Get the template
  const technologyTemplate = path.resolve('./src/pages/work.js')
  // 2. query the technologies
  const { data } = await graphql(`
    query {
      technologies: allSanityTechnology {
        nodes {
          title
          id
        }
      }
    }
  `);
  // 3. create page for that technology
  data.technologies.nodes.forEach((technology) => {
    // console.log(`Creating page for technology:` + technology.title)
    actions.createPage({
      path: `technology/${technology.title}`,
      component: technologyTemplate,
      context: {
        technology: technology.title,
        technologyRegex: `/${technology.title}/i`
      }
    })
  })
  // 4. pass technology data to work.js

}

export async function createPages(params) {
  console.log('Creating pages!')
  // Create pages dynamically
  await Promise.all([
    turnProjectsIntoPages(params),
    turnTechnologiesIntoPages(params)
  ])
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Check if the page is a localized 404
  if (page.path.match(/^\/[a-z]{2}\/404\/$/)) {
    const oldPage = { ...page }

    // Get the language code from the path, and match all paths
    // starting with this code (apart from other valid paths)
    const langCode = page.path.split(`/`)[1]
    page.matchPath = `/${langCode}/*`

    // Recreate the modified page
    deletePage(oldPage)
    createPage(page)
  }
}