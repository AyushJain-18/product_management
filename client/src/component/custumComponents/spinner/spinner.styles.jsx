import styled from "styled-components";

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 70px;
  height: 70px;
  border: 8px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: black;
  animation: spin 1.2s ease-in-out infinite;
  -webkit-animation: spin 1.2s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const SpinnerOverlay = styled.div`
  position:absolute;
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

