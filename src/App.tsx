import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Confetti from "react-confetti";
const App = () => {
  const randomData = Math.floor(Math.random() * 100);
  const [randomNumberValue, setRandomNumberValue] =
    useState<number>(randomData);
  const [isRandomNumber, setRandomNumber] = useState<string>("");
  const [displayResult, setDisplayResult] = useState<string>("");
  const [isGameFinished, setGameFinished] = useState<boolean>(false);

  const [width, setWidth] = useState(window.innerWidth);
  const findNumber = () => {
    if (isRandomNumber === "") {
      alert("Please enter the data");
    } else {
      if (randomNumberValue === Number(isRandomNumber)) {
        setDisplayResult(
          "Congratulation you have selected the correct number..."
        );
        setGameFinished(true);
      } else if (Number(isRandomNumber) > randomNumberValue) {
        setDisplayResult("Your guess is high!");
      } else if (Number(isRandomNumber) < randomNumberValue) {
        setDisplayResult("Your guess is low!");
      }
    }
  };
  const startAgain = () => {
    setDisplayResult("");
    setRandomNumberValue(randomData);
    setRandomNumber("");
    setGameFinished(false);
  };

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      <OpacityAnimation>
        <Container>
          <h1 style={{ color: "#fff" }}>Number Game</h1>
          <ScaleAnimation style={{ fontSize: "50px" }}>
            &#129321;
          </ScaleAnimation>
          <h2 style={{ color: "#fff" }}>Find the number between 1-100</h2>
          <InputField
            type="text"
            name=""
            id=""
            placeholder="Please enter the number..."
            value={isRandomNumber}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setRandomNumber(event.target.value)
            }
          />
          <br />
          <Button onClick={findNumber}>Check</Button>
          <br />
          {isGameFinished && <Button onClick={startAgain}>Start Again</Button>}
          <h3 style={{ color: "#fff" }}>{displayResult}</h3>
          {isGameFinished && <Confetti width={width} numberOfPieces={200} />}
        </Container>
      </OpacityAnimation>
    </>
  );
};

export default App;
export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  text-align: center;
  background-color: #06283d;
`;

export const InputField = styled.input<any>`
  height: 50px;
  width: 300px;
  border-radius: 40px;
  background: #fafafa;
  font-family: "Roboto", sans-serif;
  outline: none;
  border: none;
  color: #000;
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px;
  transition: all linear 0.2s;
  box-sizing: border-box;
  ::placeholder {
    color: #7a798a;
    font-weight: 400;
    font-size: 14px;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;
export const Button = styled.button`
  width: 160px;
  height: 50px;
  background: #82cd47;
  border-radius: 50px;
  border: 0;
  font-family: "Roboto", sans-serif;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;
const opacityAnimation = keyframes`
0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
const scaleAnimation = keyframes`
 0%   {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1)
  }
  50%  {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -o-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5)
  }
  100%  {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1)
  }
`;
export const OpacityAnimation = styled.div`
  animation: ${opacityAnimation} 2s;
`;
export const ScaleAnimation = styled.span`
  animation: ${scaleAnimation} 2.5s infinite;
`;
