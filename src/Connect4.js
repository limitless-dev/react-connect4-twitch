import { useEffect } from "react";
import { checkForWin, deepCloneBoard, generateNewBoard } from "./gameUtils";
import { Row } from "./Row";

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "newGame":
      return {
        ...initialGameState,
        board: action.board,
        currentPlayer: action.currentPlayer ? action.currentPlayer : 1,
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
export const initialGameState = {
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
  gameState,
  dispatchGameState,
  setBoardHistory,
  start,
  interval,
  setMilliseconds,
}) => {
  // When the preferred start player change (from
  // Twitch Settings Model), reset the board with new settings.
  useEffect(() => {
    initialGameState.currentPlayer = parseInt(startPlayer);
    setMilliseconds(0);
    interval.stop();
    dispatchGameState({
      type: "newGame",
      board: generateNewBoard(),
      currentPlayer: parseInt(startPlayer),
    });
  }, [startPlayer]);

  // holder of board history, not related to the game logic.
  const addBoard = (newBoard) =>
    setBoardHistory((board) => [
      ...board,
      {
        board: newBoard,
        currentPlayer: gameState.currentPlayer === 1 ? 2 : 1,
      },
    ]);

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
      if (result.winner === gameState.player1) {
        dispatchGameState({
          type: "endGame",
          message: "Red Player Wins!",
          board,
        });
        interval.stop();
      } else if (result.winner === gameState.player2) {
        dispatchGameState({
          type: "endGame",
          message: "Blue Player Wins!",
          board,
        });
        interval.stop();
      } else if (result.winner === "draw") {
        dispatchGameState({
          type: "endGame",
          message: "Draw Game!",
          board,
        });
        interval.stop();
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1;
        dispatchGameState({ type: "togglePlayer", nextPlayer, board });
        addBoard(board);

        if (!interval.active) {
          interval.start();
        }
        setMilliseconds(0);
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

  useEffect(() => {
    if (
      gameState.message.includes("Wins") ||
      gameState.message.includes("Draw")
    ) {
      start();
    }
  }, [gameState.message]);

  return (
    <>
      <div className="connect4-container">
        <div className="p-[4.5rem]">
          <table id="table1" className="mt-[-3.5rem]">
            <tbody>
              <tr className="text-2xl dark:text-white text-center arabicText">
                <td>١</td>
                <td>٢</td>
                <td>٣</td>
                <td>٤</td>
                <td>٥</td>
                <td>٦</td>
                <td>٧</td>
              </tr>
              {gameState.board.map((row, i) => (
                <Row
                  key={i}
                  rowId={i}
                  row={row}
                  play={play}
                  result={checkForWin(deepCloneBoard(gameState.board))}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
