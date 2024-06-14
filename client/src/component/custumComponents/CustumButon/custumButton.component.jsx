import React from "react"
import "./custumButton.styles.scss"

import Custumbutton from "./custum-button.styels"
const CustumButton =(
  {children,...otherprops}
    
)=>{
  return(
    <Custumbutton {...otherprops}>
      {children}
    </Custumbutton>
  )
}

export default CustumButton
