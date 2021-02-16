import { createContext, useState, useEffect } from 'react'

export const LocalStorageContext = createContext()

export const LocalStorageContextProvider = ({ children }) => {
  const [storedTrackingItems, setStoredTrackingItems] = useState(null)

  useEffect(() => {
    if (window) {
      const initialStore = localStorage.getItem(`fw-tracking-data`)

      if (initialStore) {
        setStoredTrackingItems(
          JSON.parse(localStorage.getItem(`fw-tracking-data`)),
        )
      } else {
        localStorage.setItem(`fw-tracking-data`, JSON.stringify([]))

        setStoredTrackingItems(
          JSON.parse(localStorage.getItem(`fw-tracking-data`)),
        )
      }
    }
  }, [])

  useEffect(() => {
    if (storedTrackingItems !== null) {
      localStorage.setItem(
        `fw-tracking-data`,
        JSON.stringify(storedTrackingItems),
      )
    }
  }, [storedTrackingItems])

  const addItemToStoredTrackingItems = (item) => {
    const itemExistsInStoredTrackingItems =
      storedTrackingItems.filter(
        (storedTrackingItem) =>
          storedTrackingItem[storedTrackingItem.selectedIdentifier] ===
          item[item.selectedIdentifier],
      ).length !== 0

    console.log(itemExistsInStoredTrackingItems)

    if (!itemExistsInStoredTrackingItems) {
      setStoredTrackingItems([item, ...storedTrackingItems])
    } else {
      let shiftedStoredTrackingItems = storedTrackingItems.filter(
        (storedTrackingItem) =>
          storedTrackingItem[storedTrackingItem.selectedIdentifier] !==
          item[item.selectedIdentifier],
      )

      shiftedStoredTrackingItems.unshift(item)

      setStoredTrackingItems(shiftedStoredTrackingItems)
    }
  }

  const removeItemFromStoredTrackingItems = (identifier) => {
    const filteredStoredTrackingItems = storedTrackingItems.filter(
      (storedTrackingItem) => storedTrackingItem.carrierPro !== identifier,
    )

    setStoredTrackingItems(filteredStoredTrackingItems)
  }

  const clearStoredTrackingItems = () => {
    setStoredTrackingItems([])
  }

  return (
    <LocalStorageContext.Provider
      value={{
        storedTrackingItems,
        setStoredTrackingItems,
        addItemToStoredTrackingItems,
        removeItemFromStoredTrackingItems,
        clearStoredTrackingItems,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}
