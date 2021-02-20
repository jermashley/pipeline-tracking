import { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { SearchContext } from '@/lib/SearchContext'
import { FilterContext } from '@/lib/FilterContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons'
import { Heading2 } from '@/components/Headings'
import ShipmentStatuses from '@/components/ShipmentStatuses'
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'

const TrackingDataModal = ({ trackingData }) => {
  const { setTrackingResults, setTrackingNumber } = useContext(FilterContext)
  const { getTrackingData } = useContext(SearchContext)

  const getShipmentStatuses = useQuery(
    `getShipmentStatuses_${trackingData?.quoteId}`,
    () =>
      axios.get(`/api/getShipmentStatuses`, {
        params: {
          quoteId: trackingData.quoteId,
        },
      }),
    {
      enabled: trackingData.selectedShipmentType === `domestic`,
      cacheTime: 300,
    },
  )

  const handleCloseOverlayClick = () => {
    setTrackingNumber(``)
    setTrackingResults([])
    getTrackingData.reset()
  }

  useEffect(() => {
    return () => {
      getShipmentStatuses.remove()
    }
  }, [])

  return (
    <section
      style={{
        overflowY: trackingData.selectedShipmentType === `domestic` && `scroll`,
      }}
      className="flex flex-col items-stretch justify-start flex-grow w-full max-w-4xl mx-auto my-12 bg-white border rounded-lg shadow-2xl dark:bg-coolGray-800 border-coolGray-200 dark:border-coolGray-700"
    >
      <header className="sticky top-0 flex flex-row items-center justify-between px-8 py-6 bg-white dark:bg-coolGray-800">
        <div className="flex flex-row">
          <Heading2>Tracking Information</Heading2>

          {getShipmentStatuses.isFetching && (
            <div className="flex flex-row items-center justify-center ml-4 text-sm animate-pulse text-coolGray-400">
              <FontAwesomeIcon
                icon={faSpinnerThird}
                className="mr-1 animate-spin"
                fixedWidth={true}
              />
            </div>
          )}
        </div>

        <button
          className="text-xl text-coolGray-500 dark:text-coolGray-200"
          onClick={() => handleCloseOverlayClick()}
        >
          <FontAwesomeIcon icon={faTimes} fixedWidth={true} />
        </button>
      </header>

      {trackingData.selectedShipmentType === `domestic` && (
        <div className="relative flex flex-col items-stretch justify-start flex-grow pb-8 overflow-y-scroll">
          <div className="w-full px-8 mx-auto">
            <p className="text-base font-medium text-coolGray-600 dark:text-coolGray-200">
              {trackingData[trackingData.selectedIdentifier]}
            </p>
          </div>

          {getShipmentStatuses.data && (
            <ShipmentStatuses
              className="mt-8"
              shipmentStatuses={getShipmentStatuses.data.data.shipmentStatuses}
            />
          )}
        </div>
      )}

      {trackingData.selectedShipmentType === `international` && (
        <iframe
          title="International shipment tracking results"
          src={`https://pipeline.flatworldgs.com/app.php?r=internationalShipments/shipmentMagicLink&magicLink=${trackingData.magicLink}`}
          frameBorder="0"
          allowFullScreen={true}
          style={{
            marginTop: `48px`,
            marginBottom: `64px`,
            width: `100%`,
            height: `calc(100% - 52px)`,
            flexGrow: 1,
          }}
        />
      )}
    </section>
  )
}

export default TrackingDataModal
