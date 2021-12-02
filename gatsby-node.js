import path from "path"
import { slugify } from "./src/lib/utils"

async function turnProjectsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const projectPageTemplate = path.resolve("./src/templates/ProjectPage.js")
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
        slug: project.slug.current,
      },
    })
  })
}

async function turnTechnologiesIntoPages({ graphql, actions }) {
  // 1. Get the template
  const technologyTemplate = path.resolve("./src/pages/work.js")
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
  `)
  // 3. create page for that technology
  data.technologies.nodes.forEach(technology => {
    // console.log(`Creating page for technology:` + technology.title)
    actions.createPage({
      path: `technology/${technology.title}`,
      component: technologyTemplate,
      context: {
        technology: technology.title,
        technologyRegex: `/${technology.title}/i`,
      },
    })
  })
  // 4. pass technology data to work.js
}

async function turnChartTypesIntoPages({ graphql, actions }) {
  const chartTypeTemplate = path.resolve("./src/pages/d3-reference/index.js")

  const { data } = await graphql(`
    query {
      chartTypes: allSanityChartType {
        nodes {
          title
          id
        }
      }
    }
  `)

  data.chartTypes.nodes.forEach(chartType => {
    console.log(`Creating page for chart type: ` + chartType.title)
    actions.createPage({
      path: `d3-reference/chart-type/${slugify(chartType.title)}`,
      component: chartTypeTemplate,
      context: {
        chartType: chartType.title,
        chartTypeRegex: `/${chartType.title}/i`,
      },
    })
  })
}

async function turnChartsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const chartPageTemplate = path.resolve("./src/templates/StaticChartPage.js")

  // 2. Query all the charts in Sanity
  const { data } = await graphql(`
    query {
      charts: allSanityChart {
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
  // 3. Loop over each chart and create a page for that chart
  data.charts.nodes.forEach(chart => {
    actions.createPage({
      path: `d3-reference-lib/${chart.slug.current}`,
      component: chartPageTemplate,
      context: {
        slug: chart.slug.current,
      },
    })
  })
}

export async function createPages(params) {
  console.log("Creating pages!")
  // Create pages dynamically
  await Promise.all([
    turnProjectsIntoPages(params),
    turnTechnologiesIntoPages(params),
    turnChartTypesIntoPages(params),
    turnChartsIntoPages(params),
  ])
}
