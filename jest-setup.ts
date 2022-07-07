import "@testing-library/jest-dom"
import "isomorphic-fetch"
import ResizeObserver from "resize-observer-polyfill"
import { matchers } from "@emotion/jest"

expect.extend(matchers)

global.ResizeObserver = ResizeObserver
