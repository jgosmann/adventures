import React, { type MouseEventHandler, useEffect, useState } from "react"

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
      className="shaded-button copy-button"
      onClick={onClickInternal}
      title={title}
    >
      {children}
      {isAnimating ? <div className="enlarge-fade-elem">{children}</div> : null}
    </button>
  )
}

export default AnimatedButton
