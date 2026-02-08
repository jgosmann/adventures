import "./styles.css"
import { useRef } from "react"

import CopyButton from "./CopyButton"

export interface CryptedPhoneProps {
  country: string
  area: string
  block0: string
  block1: string
  copyTitle?: string
}

const CryptedPhone = ({
  country,
  area,
  block0,
  block1,
  copyTitle,
}: CryptedPhoneProps) => {
  const elem = useRef<HTMLSpanElement>(null)

  const getPhone = () => {
    if (elem?.current) {
      return (
        (elem.current.getAttribute("data-country") ?? "") +
        (elem.current.getAttribute("data-area") ?? "") +
        elem.current.getAttribute("data-block0") +
        elem.current.getAttribute("data-block1")
      )
    }
    return ""
  }

  return (
    <>
      <span
        ref={elem}
        data-country={country}
        data-area={area}
        data-block0={block0}
        data-block1={block1}
        className="crypted crypted-phone"
      ></span>
      <CopyButton getCopyText={getPhone} title={copyTitle} />
    </>
  )
}

export default CryptedPhone
