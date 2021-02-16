import axios from 'axios'

export default async (req, res) => {
  if (req.method === `POST`) {
    const { data } = await axios
      .post(
        process.env.PIPELINE_API_BASE_URL,
        {
          trackNum: req.body.trackNum,
          searchOption: req.body.searchOption,
          globalSearch: true,
        },
        {
          headers: {
            'Content-Type': `application/json`,
            'apiKey': process.env.PIPELINE_API_TOKEN,
          },
        },
      )
      .then((res) => {
        if (res.data.data.length === 0) {
          throw new Error(`No shipment data returned.`)
        }

        res.statusCode = 200

        return res.data
      })
      .catch((e) => {
        res.statusCode = 404
      })

    const shipmentData = data

    res.setHeader(
      `Cache-Control`,
      `public, s-maxage=60, stale-while-revalidate=30`,
    )

    setTimeout(() => {
      return res.json({ shipmentData })
    }, 2000)
  }
}
