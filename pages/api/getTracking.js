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
        return res.data
      })
      .catch(() => {
        return res.status(300)
      })

    const shipmentData = data

    res.setHeader(
      `Cache-Control`,
      `public, s-maxage=60, stale-while-revalidate=30`,
    )

    setTimeout(() => {
      return res.status(200).json({ shipmentData })
    }, 2000)
  }
}
