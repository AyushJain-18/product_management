import styled ,{css} from "styled-components";

// css in js styled-component support same syntax of Scss which will make our hovering easy.


const CustumButtonstyles = css`
    min-width: 10vw;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    margin-top: 2vw;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    &:hover {
        background-color: rgb(252, 235, 235);
        color: black;
        border: 1px solid black;
      };
      @media screen and (max-width: 800px){
        min-width: 34vw;
        &:hover{
            background-color: black;
            color: white;
            border: 1px solid black;
        }

    };
     
`;

const googleButtonStyle = css`
    background-color: #4285f4;
    color: white;
            &:hover {
            background-color: #357ae8;
            color: white;
            border: 1px solid black;
        }
`;


const invertButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;
    &:hover{
        background-color: black;
        color: white;
        border: none;
    };
    @media screen and (max-width: 800px){
        &:hover{
            background-color: white;
            color: black;
            border: 1px solid black
        }
    }
`;

const getButtonStyle =(props)=>{
  if(props.isGoogleSignIN){
    return googleButtonStyle;
  }
  if(props.inverted){
    return invertButtonStyles;
  }
}
const Custumbutton =styled.button`
    ${CustumButtonstyles};
    ${getButtonStyle}
`

export default  Custumbutton;