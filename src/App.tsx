import React, { useCallback, useState } from "react";
import "./App.css";
import _ from "lodash";
import {
  ArrowButton,
  ArrowButtonContainer,
  Button,
  Cell,
  Container,
  Grid,
} from "./styles";

const GRID_SIZE = 6;

const addRandomTwo = (grid: number[][]) => {
  const offsetRow = Math.floor(Math.random() * GRID_SIZE);
  const offsetColumn = Math.floor(Math.random() * GRID_SIZE);

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const row = (i + offsetRow) % GRID_SIZE;
      const column = (j + offsetColumn) % GRID_SIZE;
      if (grid[row][column] === 0) {
        grid[row][column] = 2;
        return grid;
      }
    }
  }
};

const generateNewGrid = () => {
  const grid: number[][] = new Array(GRID_SIZE)
    .fill(null)
    .map(() => new Array(GRID_SIZE).fill(0));
  addRandomTwo(grid);
  return grid;
};

function App() {
  const [grid, setGrid] = useState<number[][]>(generateNewGrid());

  const slide = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      const newGrid = _.cloneDeep(grid);
      addRandomTwo(newGrid);
      setGrid(newGrid);
    },
    [grid]
  );
  const restart = useCallback(() => {
    setGrid(generateNewGrid());
  }, []);

  return (
    <Container>
      <Grid>
        {grid.map((row) =>
          row.map((v) => <Cell length={`${v}`.length}>{v > 0 ? v : ""}</Cell>)
        )}
      </Grid>
      <ArrowButtonContainer>
        <ArrowButton position="up" onClick={() => slide("up")}>
          &uarr;
        </ArrowButton>
        <ArrowButton position="left" onClick={() => slide("left")}>
          &larr;
        </ArrowButton>
        <ArrowButton position="right" onClick={() => slide("right")}>
          &rarr;
        </ArrowButton>
        <ArrowButton position="down" onClick={() => slide("down")}>
          &darr;
        </ArrowButton>
      </ArrowButtonContainer>
      <div>
        <Button onClick={restart}>Reset</Button>
      </div>
    </Container>
  );
}

export default App;
