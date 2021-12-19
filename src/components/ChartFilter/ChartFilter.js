/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Link } from "gatsby-plugin-react-intl"

import { COLORS, QUERIES, WEIGHTS } from "../../constants"
import { slugify } from "../../lib/utils"

function countChartsInTypes(charts) {
  const counts = charts
    .map(chart => chart.chartTypes)
    .flat()
    .reduce((acc, item) => {
      //check if this is an existing type
      const existingType = acc[item.id]
      // if it is, increment by 1
      if (existingType) {
        existingType.count += 1
      } else {
        // otherwise, create new entry in acc and set it to one
        acc[item.id] = {
          id: item.id,
          title: item.title,
          count: 1,
        }
      }
      return acc
    }, {})

  const sortedTypes = Object.values(counts).sort((a, b) => b.count - a.count)
  return sortedTypes
}

export default function ChartFilter({ activeChart }) {
  // get a list of chart types
  // get a list of charts using these chart types
  const { charts, types } = useStaticQuery(graphql`
    query {
      charts: allSanityChart {
        nodes {
          id
          slug {
            current
          }
          title
          chartTypes {
            id
            title
          }
        }
      }
      types: allSanityChartType {
        nodes {
          id
          title
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `)
  // Count how many charts are in each type
  const typesWithCounts = countChartsInTypes(charts.nodes)
  // console.log({ typesWithCounts })

  return (
    <>
      <Wrapper>
        <Link to="/d3-reference">
          <Badge>
            All
            <Count>{charts.nodes.length}</Count>
          </Badge>
        </Link>
        {typesWithCounts.map(chartType => {
          return (
            <Link
              to={`/d3-reference/chart-type/${slugify(chartType.title)}`}
              key={chartType.id}
              className={chartType.title === activeChart ? "active" : ""}
            >
              <Badge>
                {chartType.title}
                <Count>{chartType.count}</Count>
              </Badge>
            </Link>
          )
        })}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 95%, 750px);
  a {
    border-radius: 0.375rem;
    background-color: var(--color-gray100);
    color: var(--color-gray800);

    &.active {
      background-color: var(--color-gray700);
      color: var(--color-gray50);
    }
    &[aria-current="page"] {
      background-color: var(--color-gray700);
      color: var(--color-gray50);
    }
  }
  @media ${QUERIES.tabletAndUp} {
    padding: 1rem 2.5rem;
  }
`

const Badge = styled.span`
  display: inline-flex;
  flex: 1;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${WEIGHTS.normal};
`

const Count = styled.span`
  flex-shrink: 0;
  margin-left: 0.325rem;
  height: 1rem;
  width: 1rem;
  font-size: 0.65rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.gray200.light};
  color: ${COLORS.gray900.light};
  font-weight: ${WEIGHTS.heavy};
`
