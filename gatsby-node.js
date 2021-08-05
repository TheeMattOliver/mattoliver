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
      path: `projects/${project.slug.current}`,
      component: projectPageTemplate,
      context: {
        slug: project.slug.current
      }
    })
  })
}

export async function createPages(params) {
  console.log('Creating pages!')
  // Create pages dynamically
  await turnProjectsIntoPages(params);
}