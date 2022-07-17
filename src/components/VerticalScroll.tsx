import { css } from "@emotion/react"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"

const scrollArrowStyle = css({
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: "6rem",
  position: "absolute",
  top: 0,
  height: "100%",
  padding: 16,
  background: "none",
  border: "none",
  cursor: "pointer",
  transition: "0.2s ease-out",
  outline: "none",

  "&.inactive.hover": {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },

  "&.active": {
    backgroundColor: "rgba(180, 180, 180, 0.4)",
  },
})

const useRefState = function useRefState<T>(
  initialValue: T
): [React.MutableRefObject<T>, (newValue: T) => void] {
  const ref = useRef(initialValue)
  const [, setState] = useState(initialValue)
  return [
    ref,
    (newValue: T) => {
      ref.current = newValue
      setState(newValue)
    },
  ]
}

export interface VerticalScrollProps {
  children?: React.ReactNode
}

const VerticalScroll = ({ children }: VerticalScrollProps) => {
  const scrollArea = useRef<HTMLDivElement>(null)

  const [scrollDirection, setScrollDirection] = useRefState(0)
  const lastScrollProcessing = useRef<DOMHighResTimeStamp | null>(null)
  const [hover, setHover] = useState(0)

  const [showScrollArrows, setShowScrollArrows] = useState(true)

  useEffect(() => {
    const determineScrollArrowVisibility = () => {
      if (scrollArea.current) {
        setShowScrollArrows(
          scrollArea.current.scrollWidth > scrollArea.current.clientWidth
        )
      }
    }
    window.addEventListener("resize", determineScrollArrowVisibility)
    determineScrollArrowVisibility()
    return () =>
      window.removeEventListener("resize", determineScrollArrowVisibility)
  }, [])

  const scroll = (timestamp: DOMHighResTimeStamp) => {
    if (scrollDirection.current == 0) {
      lastScrollProcessing.current = null
      return
    }
    const delta =
      0.25 *
      scrollDirection.current *
      (lastScrollProcessing.current
        ? timestamp - lastScrollProcessing.current
        : 0)
    scrollArea.current?.scrollBy(delta, 0)
    lastScrollProcessing.current = timestamp
    window.requestAnimationFrame(scroll)
  }
  const startScroll = (direction: number) => {
    setHover(direction)
    setScrollDirection(direction)
    window.requestAnimationFrame(scroll)
  }
  const stopScroll = (
    ev: React.MouseEvent | React.TouchEvent,
    direction: number
  ) => {
    if (direction !== scrollDirection.current) {
      return
    }
    setScrollDirection(0)
    lastScrollProcessing.current = null
    if (ev.target instanceof HTMLButtonElement) {
      ev.target.blur()
    }
  }
  const handleMouseLeave = (
    ev: React.MouseEvent | React.TouchEvent,
    direction: number
  ) => {
    setHover(0)
    stopScroll(ev, direction)
  }

  return (
    <>
      <div
        ref={scrollArea}
        tabIndex={0}
        css={{ overflow: "scroll", fontSize: 0, textAlign: "center" }}
      >
        {children}
      </div>
      <button
        tabIndex={-1}
        onMouseDown={() => startScroll(-1)}
        onTouchStart={() => startScroll(-1)}
        onMouseUp={ev => stopScroll(ev, -1)}
        onMouseEnter={() => setHover(-1)}
        onMouseLeave={ev => handleMouseLeave(ev, -1)}
        onTouchEnd={ev => handleMouseLeave(ev, -1)}
        css={[scrollArrowStyle, { left: 0 }]}
        className={[
          hover < 0 ? "hover" : "",
          scrollDirection.current < 0 ? "active" : "inactive",
        ].join(" ")}
        style={
          showScrollArrows
            ? {}
            : {
                display: "none",
              }
        }
        title="Scroll left"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        tabIndex={-1}
        onMouseDown={() => startScroll(+1)}
        onTouchStart={() => startScroll(+1)}
        onMouseUp={ev => stopScroll(ev, +1)}
        onMouseEnter={() => setHover(+1)}
        onMouseLeave={ev => handleMouseLeave(ev, +1)}
        onTouchEnd={ev => handleMouseLeave(ev, +1)}
        css={[scrollArrowStyle, { right: 0 }]}
        className={[
          hover > 0 ? "hover" : "",
          scrollDirection.current > 0 ? "active" : "inactive",
        ].join(" ")}
        style={
          showScrollArrows
            ? {}
            : {
                display: "none",
              }
        }
        title="Scroll right"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  )
}

export default VerticalScroll
