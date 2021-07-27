import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const languageName = {
  en: "English",
  ko: "한국어",
  de: "Deutsch",
  es: "Español"
}

const LanguageList = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <a
              key={language}
              className="-m-3 p-3 block rounded-md hover:bg-gray-100 transition ease-in-out duration-150"
              onClick={() => changeLocale(language)}
              onKeyDown={() => changeLocale(language)}
              role="button"
              tabIndex={0}
              style={{
                color: currentLocale === language ? `var(--color-textPrimary)` : `var(--color-textSecondary)`,
                margin: 10,
                textDecoration: `underline`,
                cursor: `pointer`
              }}
            >
              <p className="text-base font-medium">
                {languageName[language]}
              </p>
            </a>
          ))
        }
      </IntlContextConsumer>
    </div>
  )
}

export default LanguageList






