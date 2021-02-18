import axios from 'axios'

export default async (req, res) => {
  const { data } = await axios
    .get(
      `${process.env.PIPELINE_API_BASE_URL}/ShipmentStatuses/quoteId/${req.query.quoteId}`,
      {
        headers: {
          'Content-Type': `application/json`,
          'apiKey': process.env.PIPELINE_API_TOKEN,
        },
      },
    )
    .then((r) => {
      console.log(r.data.data)
      if (r.data.error || r.data.data.length === 0) {
        res.statusCode = 404
        throw new Error(`No shipment statuses found.`)
      }

      return r.data
    })
    .catch((e) => {
      res.statusCode = 404
      throw new Error(e.response.data.message)
    })

  const shipmentStatuses = data

  res.setHeader(
    `Cache-Control`,
    `public, s-maxage=60, stale-while-revalidate=30`,
  )

  setTimeout(() => {
    return res.json({ shipmentStatuses })
  }, 0)
}
