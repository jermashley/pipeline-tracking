import { parse, format } from 'date-fns'

const ShipmentStatuses = ({ shipmentStatuses, className }) => {
  return (
    <section
      className={`w-full border border-coolGray-200 dark:border-coolGray-500 rounded-xl max-w-2xl mx-auto ${className}`}
    >
      {shipmentStatuses.map((shipmentStatus) => (
        <div
          key={`${shipmentStatus.Id}_${shipmentStatus.QuoteId}`}
          className="w-full grid grid-cols-12 px-6 py-4 odd:bg-coolGray-50 dark:odd:bg-coolGray-700 first:rounded-t-xl last:rounded-b-xl border-b border-coolGray-200 dark:border-coolGray-500 last:border-b-0"
        >
          <div className="w-full col-start-1 col-end-9 flex flex-col justify-start items-start self-center">
            <span className="text-coolGray-700 dark:text-coolGray-200 text-sm font-semibold leading-tight mb-1">
              {shipmentStatus.CurrentStatus}
            </span>

            <time className="text-coolGray-500 dark:text-coolGray-400 text-xs font-normal leading-tight">
              {format(
                parse(
                  shipmentStatus.StatusDateTime,
                  `yyyy-MM-dd H:mm:ss`,
                  new Date(),
                ),
                `MMM do, y`,
              )}
              <span className="mx-1">&#64;</span>
              <span className="font-semibold">
                {format(
                  parse(
                    shipmentStatus.StatusDateTime,
                    `yyyy-MM-dd H:mm:ss`,
                    new Date(),
                  ),
                  `h:mm a`,
                )}
              </span>
            </time>
          </div>

          <div className="col-start-9 col-end-13 text-right self-center">
            <span className="text-coolGray-500 dark:text-coolGray-400 text-sm font-medium">
              {shipmentStatus.CurrentLocation}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ShipmentStatuses
