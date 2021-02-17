import { useContext } from 'react'
import { SearchContext } from '@/lib/SearchContext'
import { FilterContext } from '@/lib/FilterContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import { Heading2 } from '@/components/Headings'

const Overlay = ({ active, trackingData }) => {
  const { setTrackingResults, setTrackingNumber } = useContext(FilterContext)
  const { getTrackingData } = useContext(SearchContext)

  const handleCloseOverlayClick = () => {
    setTrackingNumber(``)
    setTrackingResults([])
    getTrackingData.reset()
  }

  return (
    <main
      className="transition-opacity duration-300 fixed z-50 top-0 right-0 bottom-0 left-0 w-screen h-screen flex flex-col justify-start items-stretch bg-white dark:bg-coolGray-900 bg-opacity-50"
      style={{
        backdropFilter: `blur(16px)`,
        WebkitBackdropFilter: `blur(16px)`,
        opacity: active ? 100 : 0,
        pointerEvents: active || `none`,
      }}
    >
      <section className="flex-grow w-full max-w-4xl mx-auto my-12 p-6 shadow-2xl rounded-lg border bg-white dark:bg-coolGray-800 border-coolGray-200 dark:border-coolGray-700">
        <header className="flex flex-row justify-between items-center">
          <Heading2>
            Tracking Results {trackingData[trackingData.selectedIdentifier]}
          </Heading2>

          <button
            className="text-xl text-coolGray-500 dark:text-coolGray-200"
            onClick={() => handleCloseOverlayClick()}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth={true} />
          </button>
        </header>

        {trackingData.selectedShipmentType === `international` && (
          <iframe
            title="International shipment tracking results"
            src={`https://pipeline.flatworldgs.com/app.php?r=internationalShipments/shipmentMagicLink&magicLink=${trackingData.magicLink}`}
            frameBorder="0"
            allowFullScreen={true}
            style={{
              marginTop: `48px`,
              width: `100%`,
              height: `calc(100% - 52px)`,
            }}
          />
        )}
      </section>
    </main>
  )
}

export default Overlay
