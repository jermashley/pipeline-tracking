export const returnReadableIdentifier = (identifier) => {
  let readableIdentifier

  switch (identifier) {
    case `domestic`:
      readableIdentifier = `Domestic`
      break
    case `international`:
      readableIdentifier = `International`
      break
    case `carrierPro`:
      readableIdentifier = `Carrier Pro`
      break
    case `bol`:
      readableIdentifier = `BOL`
      break
    case `sord`:
      readableIdentifier = `SORD`
      break
    case `houseBill`:
      readableIdentifier = `House Bill`
      break
    case `booking`:
      readableIdentifier = `Booking Number`
      break
    default:
      throw new Error(`Can't find that identifier`)
  }

  return readableIdentifier
}
