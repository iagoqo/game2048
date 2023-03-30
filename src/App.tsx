import React, { useCallback, useState } from "react";
import _ from "lodash";
import {
  ArrowButton,
  ArrowButtonContainer,
  Button,
  Cell,
  Container,
  Grid,
  Input,
  Label,
  LossMessage,
  WinMessage,
} from "./styles";

type Direction = "up" | "down" | "left" | "right";

/**
 * Adds a 2 on a random empty cell.
 */
const addRandomTwo = (grid: number[][]) => {
  const offsetRow = Math.floor(Math.random() * grid.length);
  const offsetColumn = Math.floor(Math.random() * grid[0].length);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const row = (i + offsetRow) % grid.length;
      const column = (j + offsetColumn) % grid[0].length;
      if (grid[row][column] === 0) {
        grid[row][column] = 2;
        return grid;
      }
    }
  }
};

/**
 * Creates an empty grid of the specified size with a 2 in a random position.
 */
const generateNewGrid = (size: number) => {
  let safeSize = 2;
  if (size > 2) {
    safeSize = size;
  }

  const grid: number[][] = new Array(safeSize)
    .fill(null)
    .map(() => new Array(safeSize).fill(0));

  addRandomTwo(grid);
  return grid;
};

/**
 * Given a line of numbers, adds them together if they are next to each other.
 */
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

/**
 * Merges all lines in a given direction.
 * All implementations are similar, only changing the order in which lines are created.
 */
const merge = {
  up: (grid: number[][]) => {
    for (let j = 0; j < grid[0].length; j++) {
      const line = [];
      for (let i = 0; i < grid.length; i++) {
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
    for (let j = 0; j < grid[0].length; j++) {
      const line = [];
      for (let i = grid.length - 1; i >= 0; i--) {
        line.push(grid[i][j]);
        grid[i][j] = 0;
      }
      const mergedLine = mergeLine(line);
      mergedLine.forEach((v, idx) => {
        grid[grid.length - 1 - idx][j] = v;
      });
    }
    return grid;
  },
  left: (grid: number[][]) => {
    for (let i = 0; i < grid.length; i++) {
      const line = [];
      for (let j = 0; j < grid[i].length; j++) {
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
    for (let i = 0; i < grid.length; i++) {
      const line = [];
      for (let j = grid[i].length - 1; j >= 0; j--) {
        line.push(grid[i][j]);
        grid[i][j] = 0;
      }
      const mergedLine = mergeLine(line);
      mergedLine.forEach((v, idx) => {
        grid[i][grid[i].length - 1 - idx] = v;
      });
    }
    return grid;
  },
} as const;

/**
 * Runs through the grid checking if there's a win or loss condition.
 * Win: 2048 is found on the grid.
 * Loss: There are no empty spaces and no adjacent numbers of the same value.
 */
const checkWinOrLoss = (grid: number[][]) => {
  let loss = true;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2048) {
        return "win";
      }
      if (
        (loss &&
          (grid[i][j] === 0 ||
            (grid[i + 1] && grid[i][j] === grid[i + 1][j]))) ||
        grid[i][j] === grid[i][j + 1]
      ) {
        loss = false;
      }
    }
  }
  return loss ? "loss" : undefined;
};

function App() {
  const [gridSize, setGridSize] = useState(6);
  const [gridSizeInput, setGridSizeInput] = useState(`${gridSize}`);
  const [grid, setGrid] = useState<number[][]>(generateNewGrid(gridSize));
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  /**
   * Executes a slide action in the given direction, updates the board it it was a valid move
   * and checks for win/loss conditions.
   */
  const slide = useCallback(
    (direction: Direction) => {
      if (hasWon || hasLost) return;
      const newGrid = _.cloneDeep(grid);
      merge[direction](newGrid);
      // Don't add a new number if the move didn't cause changes in the board
      if (_.isEqual(grid, newGrid)) return;
      addRandomTwo(newGrid);
      setGrid(newGrid);

      const status = checkWinOrLoss(newGrid);
      if (status === "win") {
        setHasWon(true);
      }
      if (status === "loss") {
        setHasLost(true);
      }
    },
    [grid, hasLost, hasWon]
  );

  /**
   * Resets the board with the user provided grid size.
   */
  const restart = useCallback(() => {
    const newGridSize = parseInt(gridSizeInput);
    const safeNewGridSize = newGridSize > 2 ? newGridSize : 2;
    setGridSize(safeNewGridSize);
    setGrid(generateNewGrid(safeNewGridSize));
    setHasWon(false);
    setHasLost(false);
  }, [gridSizeInput]);

  return (
    <Container>
      <Grid size={gridSize}>
        {hasWon && <WinMessage>YOU WIN!</WinMessage>}
        {hasLost && <LossMessage>YOU LOSE!</LossMessage>}
        {grid.map((row, i) =>
          row.map((v, j) => (
            <Cell key={`${i}-${j}`} length={`${v}`.length}>
              {v > 0 ? v : ""}
            </Cell>
          ))
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
        <Label>Grid size</Label>{" "}
        <Input
          type="number"
          value={gridSizeInput}
          onChange={(e) => setGridSizeInput(e.target.value)}
          min={2}
        />
      </div>
      <div>
        <Button onClick={restart}>Restart</Button>
      </div>
    </Container>
  );
}

export default App;
