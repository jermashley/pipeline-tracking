import { createContext, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { FilterContext } from '@/lib/FilterContext'
import { LocalStorageContext } from '@/lib/LocalStorageContext'

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const {
    setTrackingNumber,
    selectedShipmentType,
    setTrackingResults,
  } = useContext(FilterContext)
  const { addItemToStoredTrackingItems } = useContext(LocalStorageContext)

  const getTrackingData = useMutation(
    (searchParameters) => {
      return axios.post(
        `/api/getTracking`,
        {
          trackNum: searchParameters.trackingNumber,
          searchOption: searchParameters.selectedIdentifier,
        },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        },
      )
    },
    {
      onSuccess: (data, variables) => {
        //  Handle successful data response
        const { shipmentData } = data.data
        console.log(shipmentData[0])

        /**
         * Throw error if response has anything other than an object (domestic)
         * or string (international magic link), throw error.
         */
        if (
          typeof shipmentData[0] !== `object` &&
          typeof shipmentData[0] !== `string`
        ) {
          throw new Error(`Unexpected data type in response.`)
        }

        /**
         *
         */
        const timestamp = new Date().getTime()

        let formattedShipmentData = {
          key: timestamp,
          [variables.selectedIdentifier]: variables.trackingNumber,
          selectedShipmentType: variables.selectedShipmentType,
          selectedIdentifier: variables.selectedIdentifier,
        }

        if (
          variables.selectedShipmentType === `domestic` &&
          typeof shipmentData[0] === `object`
        ) {
          formattedShipmentData = {
            ...formattedShipmentData,
            carrierPro:
              shipmentData[0].carrierPro && shipmentData[0].carrierPro,
            bol: shipmentData[0].bolNum && shipmentData[0].bolNum,
            originLocation: shipmentData[0].originLocation,
            destinationLocation: shipmentData[0].destinationLocation,
          }
        }

        if (
          selectedShipmentType === `international` &&
          typeof shipmentData[0] === `string`
        ) {
          formattedShipmentData = {
            ...formattedShipmentData,
            magicLink: shipmentData[0],
          }
        }

        if (
          (variables.selectedShipmentType === `domestic` &&
            typeof shipmentData[0] === `object`) ||
          (variables.selectedShipmentType === `international` &&
            typeof shipmentData[0] === `string`)
        ) {
          addItemToStoredTrackingItems(formattedShipmentData)
          setTrackingResults(shipmentData[0])
        } else {
          setTrackingNumber(``)
        }
      },
      onError: () => {
        setTimeout(() => {
          // Set error in status context
        }, 5000)
      },
    },
  )

  return (
    <SearchContext.Provider value={{ getTrackingData }}>
      {children}
    </SearchContext.Provider>
  )
}
