import { createContext, useState } from 'react'

export const FilterContext = createContext()

const shipmentTypes = [
  {
    name: `domestic`,
    identifiers: [
      {
        name: `Carrier PRO`,
        value: `carrierPro`,
      },
      {
        name: `Bill of Lading`,
        value: `bol`,
      },
    ],
  },
  {
    name: `international`,
    identifiers: [
      {
        name: `SORD`,
        value: `sord`,
      },
      {
        name: `House Bill`,
        value: `houseBill`,
      },
      {
        name: `Booking Number`,
        value: `booking`,
      },
    ],
  },
]

export const FilterContextProvider = ({ children }) => {
  const [selectedShipmentType, setSelectedShipmentType] = useState(`domestic`)
  const [selectedIdentifier, setSelectedIdentifier] = useState(`carrierPro`)
  const [trackingResults, setTrackingResults] = useState([])
  const [trackingNumber, setTrackingNumber] = useState(``)

  return (
    <FilterContext.Provider
      value={{
        shipmentTypes,
        selectedShipmentType,
        setSelectedShipmentType,
        selectedIdentifier,
        setSelectedIdentifier,
        trackingResults,
        setTrackingResults,
        trackingNumber,
        setTrackingNumber,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
