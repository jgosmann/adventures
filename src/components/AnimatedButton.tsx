import React, { MouseEventHandler, useEffect, useState } from "react"
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

export interface AnimatedButtonProps {
  children?: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  title?: string
}

const AnimatedButton = ({ children, onClick, title }: AnimatedButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    if (isAnimating) {
      window.setTimeout(() => setIsAnimating(false), 200)
    }
  }, [isAnimating])

  const onClickInternal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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

export default AnimatedButton
