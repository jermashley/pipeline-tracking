import { useContext } from 'react'
import { FilterContext } from '@/lib/FilterContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import { Heading2 } from '@/components/Headings'

const Overlay = ({ children, active }) => {
  const { setTrackingResults, setTrackingNumber } = useContext(FilterContext)

  const handleCloseOverlayClick = () => {
    setTrackingNumber(``)
    setTrackingResults([])
  }

  return (
    <main
      className="transition-opacity duration-300 fixed z-50 top-0 right-0 bottom-0 left-0 w-screen h-screen bg-white dark:bg-coolGray-900 bg-opacity-50"
      style={{
        backdropFilter: `blur(12px)`,
        WebkitBackdropFilter: `blur(12px)`,
        opacity: active ? 100 : 0,
        pointerEvents: active || `none`,
      }}
    >
      <section className="w-full max-w-3xl mx-auto mt-12 p-6 shadow-2xl rounded-lg border bg-white dark:bg-coolGray-800 border-coolGray-200 dark:border-coolGray-700">
        <header className="flex flex-row justify-between items-center">
          <Heading2>Tracking Results</Heading2>

          <button
            className="text-xl text-coolGray-500 dark:text-coolGray-200"
            onClick={() => handleCloseOverlayClick()}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth={true} />
          </button>
        </header>

        {children}
      </section>
    </main>
  )
}

export default Overlay
