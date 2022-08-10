import { useReducer } from "react";
import { Row } from "./Row";
import { Text } from "@chakra-ui/react";
import { checkForWin, deepCloneBoard, generateNewBoard } from "./gameUtils";
import { useEffect } from "react";
import * as gameStyles from "./Home.module.css";
import CurrentPlayer from "./CurrentPlayer";

const gameReducer = (state, action) => {
  switch (action.type) {
    case "newGame":
      return {
        ...initialGameState,
        board: action.board,
      };
    case "togglePlayer":
      return {
        ...state,
        currentPlayer: action.nextPlayer,
        board: action.board,
      };
    case "endGame":
      return {
        ...state,
        gameOver: true,
        message: action.message,
        board: action.board,
      };
    case "updateMessage":
      return {
        ...state,
        message: action.message,
      };
    default:
      throw Error(`Action "${action.type}" is not a valid action.`);
  }
};
const initialGameState = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: "",
};
export const Connect4 = ({
  firstPlayer,
  secondPlayer,
  twitchMessage,
  twitchUser,
  twitchTime,
  startPlayer,
}) => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  );

  // triggered through 'Twitch Settings' modal when a user
  // changes the start player
  useEffect(() => {
    initialGameState.currentPlayer = parseInt(startPlayer);
    dispatchGameState({ type: "newGame", board: generateNewBoard() });
  }, [startPlayer]);

  // triggered when a user clicks a cell or a specified
  // Twitch user sends the desired play position 
  const play = (c) => {
    if (!gameState.gameOver) {
      let board = deepCloneBoard(gameState.board);
      //check if cell is taken by starting at the
      //bottom row and working up
      for (let r = 5; r >= 0; r--) {
        if (r === 0 && !board[r][c] === false) {
          return;
        }
        if (!board[r][c]) {
          board[r][c] = gameState.currentPlayer;
          break;
        }
      }

      let result = checkForWin(board);
      if (result === gameState.player1) {
        dispatchGameState({
          type: "endGame",
          message: "Red Player Wins!",
          board,
        });
      } else if (result === gameState.player2) {
        dispatchGameState({
          type: "endGame",
          message: "Blue Player Wins!",
          board,
        });
      } else if (result === "draw") {
        dispatchGameState({
          type: "endGame",
          message: "Draw Game!",
          board,
        });
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1;
        dispatchGameState({ type: "togglePlayer", nextPlayer, board });
      }
    }
    // If the user clicked on cell but the game is
    // already over
    else {
      dispatchGameState({
        type: "updateMessage",
        message: "Game Over. Please start a new game.",
      });
    }
  };
  useEffect(() => {
    if (twitchUser === "") {
      return;
    }
    if (
      twitchUser !== firstPlayer.toLowerCase() &&
      twitchUser !== secondPlayer.toLowerCase()
    ) {
      return;
    } else if (
      gameState.currentPlayer === 1 &&
      firstPlayer.toLowerCase() !== twitchUser
    ) {
      return;
    } else if (
      gameState.currentPlayer === 2 &&
      secondPlayer.toLowerCase() !== twitchUser
    ) {
      return;
    } else {
      let twitchPlay = parseInt(twitchMessage.slice(1).split(" ")[1]);
      if (twitchPlay >= 1 && twitchPlay <= 7) {
        twitchPlay = twitchPlay - 1;
        play(twitchPlay);
      }
    }
  }, [twitchMessage, twitchUser, twitchTime]);

  return (
    <>
      <Text>{gameState.message}</Text>

      <button
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          dispatchGameState({ type: "newGame", board: generateNewBoard() });
        }}
      >
        New Game
      </button>
      <br></br>
      <br></br>

      <div className="inline-block p-5 m-auto connect4-container rounded-2xl">
        <table id="table1" className="m-auto connect4-table">
          <tbody>
            {gameState.board.map((row, i) => (
              <Row key={i} row={row} play={play} />
            ))}
            <tr>
              <td className="text-xl">1</td>
              <td className="text-xl">2</td>
              <td className="text-xl">3</td>
              <td className="text-xl">4</td>
              <td className="text-xl">5</td>
              <td className="text-xl">6</td>
              <td className="text-xl">7</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>

      {gameState.currentPlayer === 1 && firstPlayer !== "" && (
        <CurrentPlayer player={firstPlayer} />
      )}

      {gameState.currentPlayer === 2 && secondPlayer !== "" && (
        <CurrentPlayer player={secondPlayer} />
      )}
      {/** Below is to show names on side of board */}
      {firstPlayer !== "" && (
        <div className="player1-container self-center	col-start-4 col-span-2 ">
          <div className="player1 text-4xl">{firstPlayer}</div>
          <br></br>
          <div className="player1 text-4xl">
            {gameState.currentPlayer === 1 ? "(Now)" : ""}
          </div>
        </div>
      )}
      {secondPlayer !== "" && (
        <div className="player2-container self-center	col-start-8 col-span-2 ">
          <div className="player2 text-4xl">{secondPlayer}</div>
          <br></br>
          <div className="player2 text-4xl">
            {gameState.currentPlayer === 2 ? "(Now)" : ""}
          </div>
        </div>
      )}
    </>
  );
};
