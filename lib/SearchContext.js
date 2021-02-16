import { createContext, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { FilterContext } from '@/lib/FilterContext'
import { LocalStorageContext } from '@/lib/LocalStorageContext'

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const {
    trackingNumber,
    selectedShipmentType,
    selectedIdentifier,
    setTrackingResults,
  } = useContext(FilterContext)
  const { addItemToStoredTrackingItems } = useContext(LocalStorageContext)

  const {
    isLoading,
    isSuccess,
    error,
    data,
    mutate,
    mutateAsync,
    reset,
  } = useMutation(
    () =>
      axios
        .post(
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
        )
        .then((res) => res),
    {
      onError: () => {
        setTimeout(() => {
          reset()
        }, 5000)
      },
    },
  )

  const searchForShipment = async () => {
    let resolvedData

    try {
      resolvedData = await mutateAsync()
    } catch (e) {
      console.log(e)
    } finally {
      if (resolvedData) {
        const { shipmentData } = resolvedData.data
        const timestamp = new Date().getTime()

        let formattedShipmentData = {
          key: timestamp,
          selectedShipmentType: selectedShipmentType,
          selectedIdentifier: selectedIdentifier,
          [selectedIdentifier]: trackingNumber,
        }

        if (selectedShipmentType === `domestic`) {
          formattedShipmentData = {
            ...formattedShipmentData,
            carrierPro:
              shipmentData[0].carrierPro && shipmentData[0].carrierPro,
            bol: shipmentData[0].bolNum && shipmentData[0].bolNum,
            originLocation: shipmentData[0].originLocation,
            destinationLocation: shipmentData[0].destinationLocation,
          }
        }

        if (selectedShipmentType === `international`) {
          formattedShipmentData = {
            ...formattedShipmentData,
            magicLink: shipmentData[0],
          }
        }

        addItemToStoredTrackingItems(formattedShipmentData)

        setTrackingResults(resolvedData.data.shipmentData[0])
      }
    }
  }

  return (
    <SearchContext.Provider
      value={{
        isLoading,
        isSuccess,
        error,
        data,
        mutate,
        mutateAsync,
        reset,
        searchForShipment,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
