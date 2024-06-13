import React from "react";
import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from "./error-boundary.styles"

class ErrorBoundary extends React.Component{
  constructor(){
    super();
    this.state ={
      hasError: false
    }
  }
  static getDerivedStateFromError( ){
    return({hasError: true})
  }
  componentDidCatch(error){
    console.log(error)
  }
  render(){
    if(this.state.hasError){
      return(
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl= 'https://i.imgur.com/yW2W9SC.png'/>
          <ErrorImageText>Sorry, this page is broken</ErrorImageText>
        </ErrorImageOverlay> 

      )
    }
    return(
      this.props.children
    )
       
  }
}

export default ErrorBoundary