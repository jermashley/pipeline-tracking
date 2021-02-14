import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons'
import FwLogoColor from '@/components/FwLogoColor'
import FwLogoWhite from '@/components/FwLogoWhite'

const Navbar = () => {
  const [lightTheme, setLightTheme] = useState(``)

  useEffect(() => {
    if (window && window.matchMedia) {
      const prefersColorScheme = window.matchMedia(
        `(prefers-color-scheme: light)`,
      )

      setLightTheme(prefersColorScheme.matches)

      prefersColorScheme.addEventListener(`change`, (e) => {
        setLightTheme(e.matches)
      })

      return () =>
        prefersColorScheme.removeEventListener(`change`, (e) =>
          console.log(e.matches),
        )
    }
  }, null)

  return (
    <nav className="w-full flex flex-row justify-between items-center mt-4">
      {lightTheme ? <FwLogoColor /> : <FwLogoWhite />}

      <a
        href="#"
        className="transition-all duration-300 text-sm font-bold uppercase flex flex-row justify-start items-center space-x-2 text-brand-base hover:text-brand-hover dark:text-coolGray-200 dark:hover:text-coolGray-400 group"
      >
        <span>Global Solutions Home</span>
        {` `}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="transform group-hover:translate-x-1"
        />
      </a>
    </nav>
  )
}

export default Navbar
