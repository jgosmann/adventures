import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { setStaticQuery } from "../../test/mockStaticQuery"
import {
  mockGatsbyImage,
  mockImageFileNode,
} from "../../test/gatsby-image-fixture"
import { act, render, screen, waitFor } from "@testing-library/react"
import Search from "./Search"

describe("Search", () => {
  const apiUrl = "https://apiUrl"

  const server = setupServer(
    rest.post(apiUrl, (req, res, ctx) => {
      const page =
        (req.body &&
          typeof req.body === "object" &&
          req.body["variables"]["page"]) ||
        "page0"
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            search: {
              page: page,
              next: "next",
              result: [
                {
                  pagePath: `/${page}`,
                  childMdx: {
                    id: page,
                    background: mockImageFileNode(
                      mockGatsbyImage({
                        url: "background.png",
                        width: 300,
                        height: 250,
                        layout: "fixed",
                      })
                    ),
                    frontmatter: {
                      title: `Title ${page}`,
                      date: "2022-08-21 13:37",
                      categories: ["Box 1", "Box 2"],
                    },
                    fields: { timeToRead: { minutes: 42 } },
                  },
                },
              ],
            },
          },
        })
      )
    })
  )

  beforeEach(async () => {
    setStaticQuery({
      site: {
        siteMetadata: {
          searchUrl: apiUrl,
        },
      },
    })
    server.listen({ onUnhandledRequest: "error" })

    await act(async () => {
      render(<Search query="search-query" />)
    })
  })

  afterEach(() => {
    server.close()
  })

  it("fetches and displays the search results", async () => {
    await waitFor(() => {
      expect(screen.getByText("Title page0")).toBeInTheDocument()
    })
  })

  describe("when clicking the 'load more' button", () => {
    beforeEach(async () => {
      await waitFor(() => {
        expect(screen.getByText("Load more")).toBeInTheDocument()
      })
      await act(async () => screen.getByText("Load more").click())
    })

    it("loads more results", async () => {
      await waitFor(() => {
        expect(screen.getByText("Title page0")).toBeInTheDocument()
        expect(screen.getByText("Title next")).toBeInTheDocument()
      })
    })
  })
})
