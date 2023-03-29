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

type Direction = "up" | "down" | "left" | "right";

const GRID_SIZE = 6;

const generateNewGrid = () => {
  const grid: number[][] = new Array(GRID_SIZE)
    .fill(null)
    .map(() => new Array(GRID_SIZE).fill(0));
  addRandomTwo(grid);
  return grid;
};

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

const mergeLine = (line: number[]) => {
  const cleanLine = line.filter((v) => v !== 0);
  let mergedLine = [];
  let idx = 0;
  while (idx < cleanLine.length) {
    if (cleanLine[idx] === cleanLine[idx + 1]) {
      mergedLine.push(cleanLine[idx] * 2);
      idx = idx + 2;
    } else {
      mergedLine.push(cleanLine[idx]);
      idx++;
    }
  }
  return mergedLine;
};

const merge = {
  up: (grid: number[][]) => {
    for (let j = 0; j < GRID_SIZE; j++) {
      const line = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        line.push(grid[i][j]);
        grid[i][j] = 0;
      }
      const mergedLine = mergeLine(line);
      mergedLine.forEach((v, idx) => {
        grid[idx][j] = v;
      });
    }
    return grid;
  },
  down: (grid: number[][]) => {
    for (let j = 0; j < GRID_SIZE; j++) {
      const line = [];
      for (let i = GRID_SIZE - 1; i >= 0; i--) {
        line.push(grid[i][j]);
        grid[i][j] = 0;
      }
      const mergedLine = mergeLine(line);
      mergedLine.forEach((v, idx) => {
        grid[GRID_SIZE - 1 - idx][j] = v;
      });
    }
    return grid;
  },
  left: (grid: number[][]) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      const line = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        line.push(grid[i][j]);
        grid[i][j] = 0;
      }
      const mergedLine = mergeLine(line);
      mergedLine.forEach((v, idx) => {
        grid[i][idx] = v;
      });
    }
    return grid;
  },
  right: (grid: number[][]) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      const line = [];
      for (let j = GRID_SIZE - 1; j >= 0; j--) {
        line.push(grid[i][j]);
        grid[i][j] = 0;
      }
      const mergedLine = mergeLine(line);
      mergedLine.forEach((v, idx) => {
        grid[i][GRID_SIZE - 1 - idx] = v;
      });
    }
    return grid;
  },
} as const;

function App() {
  const [grid, setGrid] = useState<number[][]>(generateNewGrid());

  const slide = useCallback(
    (direction: Direction) => {
      const newGrid = _.cloneDeep(grid);
      merge[direction](newGrid);
      if (_.isEqual(grid, newGrid)) return;
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
