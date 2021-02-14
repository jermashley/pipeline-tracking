import { useContext, useState } from 'react'
import axios from 'axios'
import { Heading2 } from '@/components/Headings'
import { SmallButton } from '@/components/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMinusCircle } from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons'
import { FilterContext } from '@/lib/FilterContext'
import { useQuery } from 'react-query'
import { LocalStorageContext } from '@/lib/LocalStorageContext'

const TrackingNumberForm = () => {
  const {
    selectedIdentifier,
    setTrackingResults,
    trackingNumber,
    setTrackingNumber,
  } = useContext(FilterContext)

  const { addItemToStoredTrackingItems } = useContext(LocalStorageContext)

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    `getTracking`,
    async () =>
      axios.post(
        `/api/getTracking`,
        {
          trackNum: trackingNumber,
          searchOption: selectedIdentifier,
          globalSearch: true,
        },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        },
      ),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  const getTrackingRequest = () => {
    refetch().then(() => {
      if (data) {
        setTrackingResults(data.data.shipmentData[0])

        addItemToStoredTrackingItems(data.data.shipmentData[0])
      }
    })
  }

  return (
    <>
      <Heading2 className="mt-16 mb-2">Tracking Number</Heading2>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-row justify-start items-center space-x-1 bg-white border border-coolGray-300 rounded-xl focus-within:border-blue-500 focus-within:border-dashed dark:bg-coolGray-800 dark:border-coolGray-600"
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

        <div className="w-6 h-6 flex flex-row justify-start items-center">
          {(isFetching || isLoading) && (
            <FontAwesomeIcon
              icon={faSpinnerThird}
              className="text-lg text-coolGray-400"
              fixedWidth={true}
              spin={true}
            />
          )}
        </div>

        <div className="flex flex-row space-x-1 py-2 px-3 transform translate-x-px">
          <SmallButton onClick={() => setTrackingNumber(``)}>
            <FontAwesomeIcon
              icon={faMinusCircle}
              fixedWidth={true}
              style={{ width: `0.75rem`, height: `0.75rem` }}
            />
          </SmallButton>

          <SmallButton onClick={() => getTrackingRequest()}>
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
