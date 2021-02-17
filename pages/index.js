import { useContext } from 'react'
import { LocalStorageContext } from '@/lib/LocalStorageContext'
import { FilterContext } from '@/lib/FilterContext'
import { SearchContext } from '@/lib/SearchContext'
import Default from '@/layouts/default'
import TrackingFilter from '@/components/TrackingFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/pro-solid-svg-icons'
import { Heading1, Heading2 } from '@/components/Headings'
import TrackingNumberForm from '@/components/TrackingNumberForm'
import Overlay from '@/components/Overlay'
import { SmallButton } from '@/components/Buttons'
import MiniCard from '@/components/MiniCard'

const Home = () => {
  const { trackingResults } = useContext(FilterContext)
  const { storedTrackingItems, clearStoredTrackingItems } = useContext(
    LocalStorageContext,
  )
  const { getTrackingData } = useContext(SearchContext)

  return (
    <Default>
      <Heading1
        className="mt-12"
        style={{
          lineHeight: `3rem`,
        }}
      >
        Shipment Tracking
      </Heading1>

      <p className="text-base text-coolGray-500 dark:text-coolGray-300">
        Select the type of shipment you would like to track and shipment ID you
        have below.
      </p>

      {/* Tracking selector */}
      <TrackingFilter />

      <TrackingNumberForm />

      <Overlay
        active={getTrackingData.isSuccess}
        trackingData={trackingResults}
      />

      <section className="mt-24">
        <div className="flex flex-row justify-between items-center">
          <Heading2>Recently Tracked</Heading2>

          {storedTrackingItems?.length >= 1 && (
            <SmallButton onClick={() => clearStoredTrackingItems()}>
              <FontAwesomeIcon icon={faBan} fixedWidth={true} />
            </SmallButton>
          )}
        </div>

        {storedTrackingItems?.length >= 1 ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-4">
            {storedTrackingItems?.map((storedTrackingItem) => (
              <MiniCard
                key={storedTrackingItem.key}
                trackingData={storedTrackingItem}
              />
            ))}
          </div>
        ) : (
          <p className="text-xl text-coolGray-500 font-medium mt-4">
            Nothing here &mdash; yet!
          </p>
        )}
      </section>
    </Default>
  )
}

export default Home
