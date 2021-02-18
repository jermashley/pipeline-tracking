import { useContext } from 'react'
import { format } from 'date-fns'
import { LocalStorageContext } from '@/lib/LocalStorageContext'
import { SearchContext } from '@/lib/SearchContext'
import { SmallButton } from '@/components/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faSearch } from '@fortawesome/pro-solid-svg-icons'
import { returnReadableIdentifier } from '@/lib/readableIdentifiers'

const MiniCard = ({ trackingData }) => {
  const { getTrackingData } = useContext(SearchContext)
  const { removeItemFromStoredTrackingItems } = useContext(LocalStorageContext)

  return (
    <div className="transition-shadow duration-300 w-full flex flex-row justify-between items-center px-4 py-3 rounded-lg bg-white dark:bg-coolGray-800 border border-coolGray-200 dark:border-coolGray-700 group hover:shadow-xl">
      <div className="flex flex-col justify-between items-start h-full">
        <p className="text-coolGray-700 dark:text-coolGray-200 text-md font-semibold leading-tight">
          {trackingData[trackingData.selectedIdentifier]}
        </p>

        <p className="text-coolGray-500 dark:text-coolGray-400 text-xs font-normal leading-normal">
          <time>{format(trackingData.key, `PP`)}</time>
          <span className="mx-1">&#64;</span>
          <time>{format(trackingData.key, `p`)}</time>
        </p>

        <div className="flex flex-row justify-start items-center space-x-1 mt-3">
          <span className="tracking-wide capitalize block px-2 py-0.5 rounded bg-coolGray-100 dark:bg-coolGray-900 text-xs text-coolGray-500 dark:text-coolGray-400 font-medium">
            {returnReadableIdentifier(trackingData.selectedShipmentType)}
          </span>

          <span className="tracking-wide block px-2 py-0.5 rounded bg-coolGray-100 dark:bg-coolGray-900 text-xs text-coolGray-500 dark:text-coolGray-400 font-medium">
            {returnReadableIdentifier(trackingData.selectedIdentifier)}
          </span>
        </div>
      </div>

      <div className="transition-opacity duration-300 flex flex-row space-x-2 opacity-0 group-hover:opacity-100">
        <SmallButton
          onClick={() =>
            getTrackingData.mutate({
              trackingNumber: trackingData[trackingData.selectedIdentifier],
              selectedShipmentType: trackingData.selectedShipmentType,
              selectedIdentifier: trackingData.selectedIdentifier,
            })
          }
        >
          <FontAwesomeIcon icon={faSearch} fixedWidth={true} />
        </SmallButton>

        <SmallButton
          onClick={() =>
            removeItemFromStoredTrackingItems(trackingData.carrierPro)
          }
        >
          <FontAwesomeIcon icon={faTrashAlt} fixedWidth={true} />
        </SmallButton>
      </div>
    </div>
  )
}

export default MiniCard
