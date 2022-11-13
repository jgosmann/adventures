export const mockLocation = (url: string): Location =>
  Object.assign(new URL(url), {
    ancestorOrigins: {
      length: 0,
      contains: jest.fn(),
      item: jest.fn(),
      [Symbol.iterator]: jest.fn(),
    },
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
  })
