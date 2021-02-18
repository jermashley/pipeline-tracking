import { useContext } from 'react'
import { Heading2 } from '@/components/Headings'
import { SmallButton } from '@/components/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faMinusCircle,
  faExclamationCircle,
} from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'
import { FilterContext } from '@/lib/FilterContext'
import { SearchContext } from '@/lib/SearchContext'

const TrackingNumberForm = () => {
  const {
    selectedShipmentType,
    selectedIdentifier,
    trackingNumber,
    setTrackingNumber,
  } = useContext(FilterContext)

  const { getTrackingData } = useContext(SearchContext)

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-16 mb-2">
        <Heading2>Tracking Number</Heading2>

        {getTrackingData.isLoading && (
          <div
            className="animate-pulse flex flex-row justify-start items-center transition-opacity duration-300 text-sm text-coolGray-400"
            style={{
              opacity: getTrackingData.isLoading ? 100 : 0,
            }}
          >
            <FontAwesomeIcon
              icon={faSpinnerThird}
              className="text-coolGray-400 animate-spin mr-1"
              fixedWidth={true}
            />
            Please wait while we look up the shipment details
          </div>
        )}

        {getTrackingData.error && (
          <div
            className="flex flex-row justify-start items-center transition-opacity duration-300 text-sm text-red-400"
            style={{
              opacity: getTrackingData.error ? 100 : 0,
            }}
          >
            <FontAwesomeIcon
              icon={faExclamationCircle}
              fixedWidth={true}
              className="mr-1"
            />
            We couldn&apos;t find that shipment
          </div>
        )}
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className={`transition-opacity duration-300 flex flex-row justify-start items-center space-x-1 bg-white border border-coolGray-300 rounded-xl focus-within:border-blue-500 focus-within:border-dashed dark:bg-coolGray-800 dark:border-coolGray-600`}
        style={{
          opacity: getTrackingData.isLoading ? 0.5 : 1,
          pointerEvents: getTrackingData.isLoading && `none`,
        }}
      >
        <input
          type="text"
          name="trackingNum"
          id="trackingNum"
          placeholder="Enter a tracking number to find your shipment"
          className="w-full bg-transparent rounded-xl outline-none pl-5 placeholder-coolGray-400 text-sm font-medium text-coolGray-400"
          value={trackingNumber}
          onChange={(event) => setTrackingNumber(event.target.value)}
        />

        <input
          value={selectedIdentifier}
          type="text"
          name="searchOption"
          hidden={true}
          id="searchOption"
          readOnly={true}
        />

        <div className="flex flex-row space-x-1 py-2 px-3 transform translate-x-px">
          <SmallButton
            onClick={() => setTrackingNumber(``)}
            style={{
              opacity: trackingNumber.length === 0 ? `0.5` : `1`,
              pointerEvents: trackingNumber.length === 0 && `none`,
              cursor: trackingNumber.length === 0 ? `not-allowed` : `pointer`,
            }}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              fixedWidth={true}
              style={{ width: `0.75rem`, height: `0.75rem` }}
            />
          </SmallButton>

          <SmallButton
            onClick={() =>
              getTrackingData.mutate({
                trackingNumber: trackingNumber,
                selectedShipmentType: selectedShipmentType,
                selectedIdentifier: selectedIdentifier,
              })
            }
            style={{
              opacity: trackingNumber.length === 0 ? `0.5` : `1`,
              pointerEvents: trackingNumber.length === 0 && `none`,
              cursor: trackingNumber.length === 0 ? `not-allowed` : `pointer`,
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              fixedWidth={true}
              style={{ width: `0.75rem`, height: `0.75rem` }}
            />
          </SmallButton>
        </div>
      </form>
    </>
  )
}

export default TrackingNumberForm
