import { gradeToString } from "./types"

describe("gradeToString", () => {
  describe("given a non-V grade", () => {
    it("joins the system and value with a space", () => {
      expect(gradeToString({ system: "UIAA", value: "7+" })).toEqual("UIAA 7+")
    })
  })

  describe("given a V grade", () => {
    it("it returns the V grade without added space", () => {
      expect(gradeToString({ system: "V", value: "V3" })).toEqual("V3")
    })
  })

  it("replaces underscores in the system with a space", () => {
    expect(gradeToString({ system: "Fb_bloc", value: "6a+" })).toEqual(
      "Fb bloc 6a+"
    )
  })
})
