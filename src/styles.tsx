import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px;
`;

export const Grid = styled.div<{ size: number }>(
  ({ size }) => css`
    position: relative;
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(${size}, max-content);
    grid-template-rows: repeat(${size}, max-content);
    background-color: #555;
    padding: 20px;
    border-radius: 2px;
    max-width: calc(100vw - 40px);
    max-height: 70vh;
    overflow: auto;
  `
);

export const Cell = styled.div<{ length?: number }>(
  ({ length = 1 }) => css`
    width: 50px;
    height: 50px;
    background: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    font-weight: bold;

    // Adjust font size based on number of digits
    font-size: ${2 - length / 4}em;
  `
);

export const ArrowButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-template-rows: repeat(3, max-content);
  grid-template-areas:
    ". up ."
    "left . right"
    ". down .";
  grid-gap: 4px;
`;

export const Button = styled.button`
  padding: 8px;
  margin: 0;
  background-color: #aaa;
  border: 2px solid #ccc;
  border-radius: 2px;
  font-size: 2em;
  cursor: pointer;

  :hover,
  :focus-visible {
    box-shadow: 0px 0px 4px 0px #fff;
    outline: none;
  }

  :active {
    box-shadow: 0px 0px 8px 0px #fff;
  }
`;

export const Label = styled.label`
  color: #ccc;
  font-size: 2em;
`;

export const Input = styled.input`
  background-color: #eee;
  border: 1px solid #aaa;
  font-size: 2em;
  border-radius: 2px;
  width: 3em;

  :focus {
    box-shadow: 0px 0px 4px 0px #fff;
    outline: none;
  }
`;

export const ArrowButton = styled(Button)<{
  position: "up" | "down" | "left" | "right";
}>(
  ({ position }) => css`
    grid-area: ${position};
    padding: 0;
    width: 50px;
    height: 50px;
    font-size: 2em;
  `
);

export const WinMessage = styled.div`
  color: #9f9;
  font-size: 4em;
  font-weight: bold;
  background-color: #0002;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
