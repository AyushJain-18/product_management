import React from "react"
import "./custumButton.styles.scss"

import Custumbutton from "./custum-button.styels"
const CustumButton =(
  // {children,isGoogleSignIN, inverted ,...otherprops}
  {children,...otherprops}
    
)=>{
  return(
  // <button 
  //     className ={
  //                 `${isGoogleSignIN? 'google-button custom-button': 
  //                 (inverted? 'inverted custom-button': 'custom-button') }`
  //             }
  //      {...otherprops}>
  //          {children}
  // </button>

    <Custumbutton {...otherprops}>
      {children}
    </Custumbutton>
  )
}

export default CustumButton
