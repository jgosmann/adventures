import "@testing-library/jest-dom"
import "isomorphic-fetch"
import ResizeObserver from "resize-observer-polyfill"

global.ResizeObserver = ResizeObserver

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.123456789)
})

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore()
})
