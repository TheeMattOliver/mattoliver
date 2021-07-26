import React, { useState } from 'react';
import styled from 'styled-components';

import LanguageList from './LanguageList'

const LanguagesPanelDiv = styled.div`
	background: var(--color-dropdownPanelBackground);
`;

const LanguagesPanelButton = styled.button`
	color: var(--color-text);
`;

const LanguageFlyoutMenu = () => {
	const [isActive, setActive] = useState(false);

	return (
		<div className="relative">
		  <LanguagesPanelButton 
		  	type="button" 
		  	className="text-gray-500 p-4 group rounded-md inline-flex items-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
		  	aria-expanded="false"
		  	onClick={() => setActive(!isActive)}
		  >
		    <span>Languages</span>
		    <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
		      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
		    </svg>
		  </LanguagesPanelButton>

		{/*<!--
    Flyout menu, show/hide based on flyout menu state.

    Entering: "transition ease-out duration-200"
      From: "opacity-0 translate-y-1"
      To: "opacity-100 translate-y-0"
    Leaving: "transition ease-in duration-150"
      From: "opacity-100 translate-y-0"
      To: "opacity-0 translate-y-1"
  	-->*/}

  	{isActive && (
		  <div className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
		    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
		      <LanguagesPanelDiv className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">   
		      	<LanguageList />
		      </LanguagesPanelDiv>
		    </div>
		  </div>
  		)}
		</div>
	)
}

export default LanguageFlyoutMenu