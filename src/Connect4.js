import { useEffect, useState } from "react";
import { useInterval } from "@mantine/hooks";
import { checkForWin, deepCloneBoard, generateNewBoard } from "./gameUtils";
import { Row } from "./Row";
import Modal from "./Layouts/Modal";
import { ReactComponent as DownIcon } from "./assets/DownIcon.svg";


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
  openWinner,
  setOpenWinner,
  interval,
  setMilliseconds,
}) => {
  const [hoveredColumn, setHoveredColumn] = useState(0);
  // triggered through 'Twitch Settings' modal when a user
  // changes the start player
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

  const addBoard = (newBoard) =>
    setBoardHistory((board) => [
      ...board,
      {
        board: newBoard,
        currentPlayer: gameState.currentPlayer === 1 ? 2 : 1,
      },
    ]);



  const [blueRotation, setBlueRotation] = useState(0);
  const winEffect = useInterval(() => {
    if (blueRotation === 5) {
      setBlueRotation(0);
    } else {
      setBlueRotation((img) => img + 1);
    }
  }, 1000);


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
      <Modal openModal={openWinner} setOpenModal={setOpenWinner} title="Winner">
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>

          <div className="space-y-4">
            <div className="space-y-2 winnerBox">
              <div className="text-xs font-medium lg:text-sm">
                <h3 className="dark:text-white text-center text-4xl">
                  {gameState.message === "Red Player Wins!" &&
                  firstPlayer !== "" ? (
                    <div>{firstPlayer}</div>
                  ) : gameState.message === "Blue Player Wins!" &&
                    secondPlayer !== "" ? (
                    <div>{secondPlayer}</div>
                  ) : (
                    <div>{gameState.message}</div>
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="inline-block p-[2px] m-auto connect4-container rounded-[6rem]">
        <div className="p-[3.5rem] bg-[#0f172a] rounded-[6rem]">
          <table id="table1" className="m-auto connect4-table rounded-2xl">
            <tbody>
              <tr>
                <td className="text-2xl text-center inline-block dark:text-white"> {hoveredColumn === 0 ?  (<DownIcon className="mt-[-2rem] m-auto"/>) : null} </td>
                <td className="text-2xl dark:text-white">{hoveredColumn === 1 ?  (<DownIcon className="mt-[-2rem] m-auto"/>) : null}</td>
                <td className="text-2xl dark:text-white">{hoveredColumn === 2 ?  (<DownIcon className="mt-[-2rem] m-auto" />) : null}</td>
                <td className="text-2xl dark:text-white">{hoveredColumn === 3 ?  (<DownIcon className="mt-[-2rem] m-auto"/>) : null}</td>
                <td className="text-2xl dark:text-white">{hoveredColumn === 4 ?  (<DownIcon className="mt-[-2rem] m-auto"/>) : null}</td>
                <td className="text-2xl dark:text-white">{hoveredColumn === 5 ?  (<DownIcon className="mt-[-2rem] m-auto"/>) : null}</td>
                <td className="text-2xl dark:text-white">{hoveredColumn === 6 ?  (<DownIcon className="mt-[-2rem] m-auto"/>) : null}</td>
              </tr>
              {gameState.board.map((row, i) => (
                <Row
                  key={i}
                  rowId={i}
                  row={row}
                  play={play}
                  result={checkForWin(deepCloneBoard(gameState.board))}
                  setHoveredColumn={setHoveredColumn}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
