import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(6, max-content);
  grid-template-rows: repeat(6, max-content);
  background-color: #555;
  padding: 20px;
  border-radius: 2px;
`;

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
