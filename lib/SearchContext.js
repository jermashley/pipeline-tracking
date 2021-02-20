import { createContext, useContext } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { FilterContext } from '@/lib/FilterContext'
import { LocalStorageContext } from '@/lib/LocalStorageContext'

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const {
    trackingNumber,
    setTrackingNumber,
    selectedShipmentType,
    setSelectedShipmentType,
    selectedIdentifier,
    setSelectedIdentifier,
    setTrackingResults,
  } = useContext(FilterContext)
  const { addItemToStoredTrackingItems } = useContext(LocalStorageContext)

  const getTrackingData = useMutation(
    (searchParameters) => {
      return axios.post(
        `/api/getShipmentAndCurrentStatus`,
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
      onMutate: (variables) => {
        // When requesting data, if shipment parameters aren't set
        // (i.e. when triggering search from results history), set parameters
        // and tracking number. It just makes things look pretty.
        selectedShipmentType !== variables.selectedShipmentType &&
          setSelectedShipmentType(variables.selectedShipmentType)

        selectedIdentifier !== variables.selectedIdentifier &&
          setSelectedIdentifier(variables.selectedIdentifier)

        trackingNumber !== variables.trackingNumber &&
          setTrackingNumber(variables.trackingNumber)
      },
      onSuccess: (data, variables) => {
        //  Handle successful data response
        let { shipmentData } = data.data
        shipmentData = shipmentData[0]

        // Throw error if response has anything other than an object (domestic)
        // or string (international magic link), throw error.
        if (
          typeof shipmentData !== `object` &&
          typeof shipmentData !== `string`
        ) {
          throw new Error(`Unexpected data type in response.`)
        }

        // Create a timestamp at time of successful mutation
        const timestamp = new Date().getTime()

        let formattedShipmentData = {
          key: timestamp,
          [variables.selectedIdentifier]: variables.trackingNumber,
          selectedShipmentType: variables.selectedShipmentType,
          selectedIdentifier: variables.selectedIdentifier,
        }

        // If the selected shipment type is domestic and the
        // response data is of type object, set shipmentData
        if (
          variables.selectedShipmentType === `domestic` &&
          typeof shipmentData === `object`
        ) {
          formattedShipmentData = {
            ...formattedShipmentData,
            quoteId: shipmentData.lineItems[0].quoteId,
            carrierPro: shipmentData.carrierPro && shipmentData.carrierPro,
            bol: shipmentData.bolNum && shipmentData.bolNum,
            originLocation: shipmentData.originLocation,
            destinationLocation: shipmentData.destinationLocation,
          }
        }

        // If the selected shipment type is international and the
        // response data is of type string (magic link), set shipmentData
        if (
          selectedShipmentType === `international` &&
          typeof shipmentData === `string`
        ) {
          formattedShipmentData = {
            ...formattedShipmentData,
            magicLink: shipmentData,
          }
        }

        // If the criteria for domestic or international shipments
        // above is met, push data to local storage context and
        // display tracking results – otherwise, clear everything.
        if (
          (variables.selectedShipmentType === `domestic` &&
            typeof shipmentData === `object`) ||
          (variables.selectedShipmentType === `international` &&
            typeof shipmentData === `string`)
        ) {
          addItemToStoredTrackingItems(formattedShipmentData)
          setTrackingResults(formattedShipmentData)
        } else {
          setTrackingNumber(``)
          throw new Error(`Tracking information not set.`)
        }
      },
      onError: () => {
        // If request results in an error, reset mutation to clear error
        // after 5 seconds..
        setTimeout(() => {
          getTrackingData.reset()
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
