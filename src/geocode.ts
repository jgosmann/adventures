import * as fs from "node:fs"
import axios from "axios"

const accessTokensPromise = (async () =>
  JSON.parse((await fs.promises.readFile("access-tokens.json")).toString()))()

export async function reverseGeocode({
  lat,
  long,
}: {
  lat: number
  long: number
}) {
  const languages = ["de", "en"]
  const access_token = (await accessTokensPromise).mapbox
  if (!access_token) {
    console.warn(
      "Skipping geocoding for search because of missing mapbox token."
    )
    return ""
  }
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`,
      {
        params: {
          types: "place",
          language: languages.join(","),
          access_token,
        },
      }
    )
    return response.data.features
      .map(feature =>
        [feature.place_name].concat(
          languages.map(lang => feature[`place_name_${lang}`])
        )
      )
      .join("; ")
  } catch (error) {
    console.error(error)
    throw error
  }
}
