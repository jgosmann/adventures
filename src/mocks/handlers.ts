import { rest } from "msw"

export const handlers = [
  rest.get("/track.gpx", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.xml(`<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
 <trk>
  <name>ACTIVE LOG002027</name>
  <trkseg>
   <trkpt lat="46.720161" lon="11.658346">
    <ele>540.680</ele>
    <time>2022-05-09T07:23:09Z</time>
   </trkpt>
   <trkpt lat="46.720665" lon="11.658008">
    <ele>547.950</ele>
    <time>2022-05-09T07:23:24Z</time>
   </trkpt>
   <trkpt lat="46.760972" lon="12.034122">
    <ele>1046.056</ele>
    <time>2022-05-09T16:01:55Z</time>
   </trkpt>
  </trkseg>
  <trkseg>
   <trkpt lat="46.756634" lon="12.039714">
    <ele>1075.223</ele>
    <time>2022-05-09T16:06:14Z</time>
   </trkpt>
   <trkpt lat="46.756603" lon="12.039679">
    <ele>1076.544</ele>
    <time>2022-05-09T16:06:33Z</time>
   </trkpt>
  </trkseg>
 </trk>
</gpx>
            `)
    )
  }),
]
