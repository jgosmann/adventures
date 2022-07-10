import "@testing-library/jest-dom"
import "isomorphic-fetch"
import ResizeObserver from "resize-observer-polyfill"
import { matchers } from "@emotion/jest"
import { server } from "./src/mocks/server"

expect.extend(matchers)

global.ResizeObserver = ResizeObserver

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
