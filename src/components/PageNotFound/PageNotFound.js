import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-plugin-intl'
import { QUERIES } from '../../constants';

const PageNotFound = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
              <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back home
              </Link>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Let us know
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PageNotFound

const Wrapper = styled.div`
  min-height: 100vh;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  @media ${QUERIES.phoneMinAndUp} {
    display: grid;
    place-items: center;  
  }
  @media ${QUERIES.tabletAndUp} {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  @media ${QUERIES.laptopAndUp} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media ${QUERIES.desktopAndUp} {
    
  }
`;