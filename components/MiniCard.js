import { useContext } from 'react'
import { LocalStorageContext } from '@/lib/LocalStorageContext'
import { SmallButton } from '@/components/Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faSearch,
  faArrowRight,
} from '@fortawesome/pro-solid-svg-icons'

const MiniCard = ({ trackingData }) => {
  const { removeItemFromStoredTrackingItems } = useContext(LocalStorageContext)

  return (
    <div className="transition-shadow duration-300 w-full flex flex-row justify-between items-center px-4 py-3 rounded-lg bg-white dark:bg-coolGray-800 border border-coolGray-200 dark:border-coolGray-700 group hover:shadow-xl">
      <div>
        <p className="text-coolGray-700 dark:text-coolGray-200 text-sm font-medium">
          {trackingData.carrierPro}
        </p>

        <p className="flex flex-row items-center text-coolGray-500 dark:text-coolGray-400 text-xs font-normal">
          {trackingData.originLocation.zipCode}
          <FontAwesomeIcon
            icon={faArrowRight}
            fixedWidth={true}
            className="mx-1"
            style={{
              fontSize: `8px`,
            }}
          />
          {trackingData.destinationLocation.zipCode}
        </p>
      </div>

      <div className="transition-opacity duration-300 flex flex-row space-x-2 opacity-0 group-hover:opacity-100">
        <SmallButton
          onClick={() =>
            removeItemFromStoredTrackingItems(trackingData.carrierPro)
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
