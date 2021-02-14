import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons'
import { Button } from '@/components/Buttons'
import { FilterContext } from '@/lib/FilterContext'

const TrackingFilter = () => {
  const {
    shipmentTypes,
    selectedShipmentType,
    setSelectedShipmentType,
    selectedIdentifier,
    setSelectedIdentifier,
  } = useContext(FilterContext)

  const [activeIdentifiers, setActiveIdentifiers] = useState(null)

  useEffect(() => {
    const selectedShipmentTypeData = shipmentTypes.filter(
      (shipmentType) => shipmentType.name === selectedShipmentType,
    )

    setActiveIdentifiers(selectedShipmentTypeData[0].identifiers)
  }, [selectedShipmentType])

  const handleShipmentTypeSelection = (type) => {
    setSelectedShipmentType(type.name)

    selectedShipmentType !== type.name &&
      setSelectedIdentifier(type.identifiers[0].value)
  }

  return (
    <section className="mt-8 px-4 py-3 flex flex-col space-y-3 w-full border border-coolGray-200 dark:border-coolGray-700 rounded-xl">
      <div className="grid grid-cols-12 gap-6">
        <span className="col-start-1 col-end-3 text-sm text-right text-coolGray-500 dark:text-coolGray-200 font-normal self-center">
          Shipment Type
        </span>

        <div className="flex flex-row items-center space-x-2 col-start-3 col-end-13">
          {shipmentTypes.map((shipmentType) => (
            <Button
              className="w-full"
              key={shipmentType.name}
              onClick={() => handleShipmentTypeSelection(shipmentType)}
              active={shipmentType.name === selectedShipmentType}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-xs ${
                  shipmentType.name !== selectedShipmentType && `hidden`
                }`}
              />

              <span className="uppercase">{shipmentType.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <hr className="border-t border-coolGray-200 dark:border-coolGray-700" />

      <div className="grid grid-cols-12 gap-6">
        <span className="col-start-1 col-end-3 text-sm text-right text-coolGray-500 dark:text-coolGray-200 font-normal self-center">
          Shipment ID
        </span>

        <div className="flex flex-row items-center space-x-2 col-start-3 col-end-13">
          {activeIdentifiers?.map((identifier) => (
            <Button
              className="w-full"
              key={identifier.name}
              onClick={() => setSelectedIdentifier(identifier.value)}
              active={identifier.value === selectedIdentifier}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`text-xs ${
                  identifier.value !== selectedIdentifier && `hidden`
                }`}
              />

              <span className="capitalize">{identifier.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrackingFilter
