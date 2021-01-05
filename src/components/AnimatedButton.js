import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { keyframes } from "@emotion/react"

import { defaultShadedButton } from "../styles"

const animation = keyframes`
  from {
    transform: scale(1, 1);
    opacity: 1;
  }
  to {
    transform: scale(3, 3);
    opacity: 0;
  }
`

const AnimatedButton = ({ children, onClick, title }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    if (isAnimating) {
      window.setTimeout(() => setIsAnimating(false), 200)
    }
  }, [isAnimating])

  const onClickInternal = e => {
    setIsAnimating(true)
    onClick(e)
  }

  return (
    <button
      css={[
        defaultShadedButton,
        {
          margin: 4,
          color: "#000",
          padding: "1px 4px",
          position: "relative",
          ["&:hover"]: { color: "#000" },
        },
      ]}
      onClick={onClickInternal}
      title={title}
    >
      {children}
      {isAnimating ? (
        <div
          css={{
            position: "absolute",
            top: 4,
            left: 4,
            animation: `${animation} 0.2s 1`,
          }}
        >
          {children}
        </div>
      ) : null}
    </button>
  )
}

AnimatedButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
}

export default AnimatedButton
