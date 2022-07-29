import { useReducer } from "react";
import { Row } from "./Row";
import { Text } from "@chakra-ui/react";
import { checkForWin, deepCloneBoard } from "./gameUtils";
import { useEffect } from "react";
// initialize temp global variables for twitch client
let twitchPlay = null;
let tempCurrentPlayer = 1;

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
export const Connect4 = ({ client, command, firstPlayer, secondPlayer }) => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  );

  // triggered when a user clicks a cell
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

      // Check status of board
      let result = checkForWin(board);
      if (result === gameState.player1) {
        dispatchGameState({
          type: "endGame",
          message: "Player1 (red) wins!",
          board,
        });
      } else if (result === gameState.player2) {
        dispatchGameState({
          type: "endGame",
          message: "Player2 (yellow) wins!",
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
        // the temp is a workaround for twitch chat
        tempCurrentPlayer =
          gameState.currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1;
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
    // if client object is not connected to tmi.js
    // return to avoid errors
    if (client === "") {
      return;
    }
    // while the connection is open, listen to twitch chat
    client.on("message", (channel, tags, message, self) => {
      // if the message is echo or doesn't start with
      // command !, ignore it and return
      if (self || !message.startsWith("!")) return;

      // if the message starts with command !, check if
      // this is the right command entered from the pop
      // modal
      const args = message.slice(1).split(" ");
      let receivedCommand = args.shift().toLowerCase();

      // if the command recieved from twitch doesn't
      // match the command in the modal return
      if (receivedCommand !== command) {
        return;
      }
      // if the current play is 1 but the message is
      // received from a player not specified as
      // player1 in modal, ignore it and return
      else if (
        tempCurrentPlayer === 1 &&
        firstPlayer.toLowerCase() !== tags.username
      ) {
        return;
      }
      // if the current play is 2 but the message is
      // received from a player not specified as
      // player2 in modal, ignore it and return
      else if (
        tempCurrentPlayer === 2 &&
        secondPlayer.toLowerCase() !== tags.username
      ) {
        return;
      }
      // the user is the current player so allow them
      // to play
      else {
        twitchPlay = parseInt(args.join(" "));
        // only allow 1 through 7 messages
        if (twitchPlay >= 1 && twitchPlay <= 7) {
          // play for user in range of 0 to 6
          twitchPlay = twitchPlay - 1;
          // trigger the click event for specified cell number
          document.getElementsByClassName("cell")[twitchPlay].click();
        }
      }

      // play(parseInt(message))
    });
  }, [client, command, firstPlayer, secondPlayer]);

  return (
    <>
      <table id="table1">
        <tbody>
          {gameState.board.map((row, i) => (
            <Row key={i} row={row} play={play} />
          ))}
        </tbody>
      </table>
      <Text>Twitch Command: !{command}</Text>
    </>
  );
};
