import React from "react"
import { setStaticQuery } from "../../test/mockStaticQuery"
import { act, render, screen, waitFor } from "@testing-library/react"
import Search from "./Search"
import { searchApiUrl } from "../mocks/handlers"

describe("Search", () => {
  beforeEach(async () => {
    setStaticQuery({
      site: {
        siteMetadata: {
          searchUrl: searchApiUrl,
        },
      },
    })

    await act(async () => {
      render(<Search query="search-query" />)
    })
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
