import React, { useState } from "react";
import "./App.css";
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

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-template-rows: repeat(3, max-content);
  grid-template-areas:
    ". up ."
    "left . right"
    ". down .";
  grid-gap: 4px;
`;

export const ArrowButton = styled.button<{
  position: "up" | "down" | "left" | "right";
}>(
  ({ position }) => css`
    padding: 0;
    margin: 0;
    grid-area: ${position};
    background-color: #aaa;
    border: 2px solid #ccc;
    border-radius: 2px;
    width: 50px;
    height: 50px;
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
  `
);

const GRID_SIZE = 6;

function App() {
  const [grid, setGrid] = useState<number[][]>(
    new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(0))
  );

  return (
    <Container>
      <Grid>
        {grid.map((row) =>
          row.map((v) => <Cell length={`${v}`.length}>{v}</Cell>)
        )}
      </Grid>
      <ButtonContainer>
        <ArrowButton position="up">&uarr;</ArrowButton>
        <ArrowButton position="left">&larr;</ArrowButton>
        <ArrowButton position="right">&rarr;</ArrowButton>
        <ArrowButton position="down">&darr;</ArrowButton>
      </ButtonContainer>
    </Container>
  );
}

export default App;
