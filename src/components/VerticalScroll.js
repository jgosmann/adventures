import { css } from "@emotion/react"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
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

const useRefState = initialValue => {
  const ref = useRef(initialValue)
  const [, setState] = useState(initialValue)
  return [
    ref,
    newValue => {
      ref.current = newValue
      setState(newValue)
    },
  ]
}

const VerticalScroll = ({ children }) => {
  const scrollArea = useRef(null)

  const [scrollDirection, setScrollDirection] = useRefState(0)
  const lastScrollProcessing = useRef(null)
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

  const scroll = timestamp => {
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
    scrollArea.current.scrollBy(delta, 0)
    lastScrollProcessing.current = timestamp
    window.requestAnimationFrame(scroll)
  }
  const startScroll = direction => {
    setHover(direction)
    setScrollDirection(direction)
    window.requestAnimationFrame(scroll)
  }
  const stopScroll = (ev, direction) => {
    if (direction !== scrollDirection.current) {
      return
    }
    setScrollDirection(0)
    lastScrollProcessing.current = null
    ev.target.blur()
  }
  const handleMouseLeave = (ev, direction) => {
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
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  )
}

VerticalScroll.propTypes = {
  children: PropTypes.node,
}

export default VerticalScroll
