// see https://github.com/mswjs/msw/issues/1916#issuecomment-1919965699

const JSDOMEnvironment = require("jest-environment-jsdom").default

class JSDOMEnvironmentExtended extends JSDOMEnvironment {
  constructor(...args) {
    super(...args)

    this.global.BroadcastChannel = BroadcastChannel
    this.global.ReadableStream = ReadableStream
    this.global.TextDecoder = TextDecoder
    this.global.TextEncoder = TextEncoder
    this.global.TransformStream = TransformStream

    this.global.Blob = Blob
    this.global.File = File
    this.global.Headers = Headers
    this.global.FormData = FormData
    this.global.Request = Request
    this.global.Response = Response
    this.global.Request = Request
    this.global.Response = Response
    this.global.fetch = fetch
    this.global.structuredClone = structuredClone
  }
}

module.exports = JSDOMEnvironmentExtended
