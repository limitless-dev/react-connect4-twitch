import { useState, useReducer } from "react";
import { Connect4, gameReducer, initialGameState } from "./Connect4";
import { useTimeout, useInterval } from "@mantine/hooks";
import { generateNewBoard } from "./gameUtils";
import { ArrowPathIcon, BackwardIcon } from "@heroicons/react/24/outline";
import { ReactComponent as TwitchIcon } from "./assets/twitch.svg";
import { MenuButton } from "./components/MenuButton";
import { Header } from "@mantine/core";
import { useTheme } from "./hooks/useTheme";
import TwitchSettings from "./TwitchSettings";
import "./App.css";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [startPlayer, setStartPlayer] = useState(1);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [command, setCommand] = useState("play");
  const [client, setClient] = useState("");
  const [twitchMessage, setTwitchMessage] = useState("");
  const [twitchUser, setTwitchUser] = useState("");
  const [twitchTime, setTwitchTime] = useState(null);
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  );
  const [boardHistory, setBoardHistory] = useState([]);
  const [openWinner, setOpenWinner] = useState(false);
  const { start, clear } = useTimeout(() => setOpenWinner(true), 5000);

  const [milliseconds, setMilliseconds] = useState(0);
  const interval = useInterval(() => setMilliseconds((ms) => ms + 10), 10);

  const { color, changeColor } = useTheme();

  return (
    <div className="text-center bg-game-logo">
      <Header
        height={60}
        className="bg-transparent border-transparent flex flex-wrap items-center justify-end  pr-4 gap-2 "
        fixed={false}
      >
        <MenuButton
          tooltipText="Twitch Settings"
          type="button"
          onClick={() => {
            clear();
            setOpenModal(true);
          }}
        >
          <TwitchIcon />
        </MenuButton>

        <MenuButton
          tooltipText="New Game"
          onClick={() => {
            clear();
            interval.stop();
            setMilliseconds(0);
            dispatchGameState({
              type: "newGame",
              board: generateNewBoard(),
              currentPlayer: parseInt(startPlayer),
            });
            setBoardHistory([]);
          }}
        >
          <ArrowPathIcon className="h-7 w-7" aria-hidden="true" />
        </MenuButton>

        <MenuButton
          tooltipText="Go back one step"
          type="button"
          id="button-settings"
          onClick={() => {
            clear();
            interval.stop();
            setMilliseconds(0);
            dispatchGameState({
              type: "newGame",
              board:
                boardHistory.length > 1
                  ? boardHistory[boardHistory.length - 2].board
                  : generateNewBoard(),
              currentPlayer:
                boardHistory.length > 1
                  ? boardHistory[boardHistory.length - 2].currentPlayer
                  : parseInt(startPlayer),
            });

            if (boardHistory.length === 1) {
              setBoardHistory([]);
            } else if (boardHistory.length === 0) {
              return;
            } else {
              setBoardHistory(boardHistory.slice(0, -1));
            }
          }}
        >
          <BackwardIcon className="h-7 w-7" aria-hidden="true" />
        </MenuButton>
      </Header>

      <header className="p-5">
        <TwitchSettings
          openModal={openModal}
          setOpenModal={setOpenModal}
          firstPlayer={firstPlayer}
          setFirstPlayer={setFirstPlayer}
          secondPlayer={secondPlayer}
          setSecondPlayer={setSecondPlayer}
          client={client}
          setClient={setClient}
          command={command}
          setCommand={setCommand}
          twitchMessage={twitchMessage}
          setTwitchMessage={setTwitchMessage}
          twitchUser={twitchUser}
          setTwitchUser={setTwitchUser}
          startPlayer={startPlayer}
          setStartPlayer={setStartPlayer}
          setTwitchTime={setTwitchTime}
        />

        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1"></div>
          <div className="mt-4 flex md:mt-0 md:ml-4"></div>
        </div>
      </header>

      <div className="container">
        <div className="connect4-area">
          <Connect4
            firstPlayer={firstPlayer}
            secondPlayer={secondPlayer}
            twitchMessage={twitchMessage}
            twitchUser={twitchUser}
            startPlayer={startPlayer}
            twitchTime={twitchTime}
            gameState={gameState}
            dispatchGameState={dispatchGameState}
            setBoardHistory={setBoardHistory}
            boardHistory={boardHistory}
            start={start}
            openWinner={openWinner}
            setOpenWinner={setOpenWinner}
            interval={interval}
            setMilliseconds={setMilliseconds}
          />
        </div>
        <div className="chatBox-area">
          <div className="chatBox"></div>
        </div>
        <div className="player-area">
          <div className="playerTag">
            {gameState.currentPlayer === 1 ? (
              firstPlayer !== "" ? (
                <div>{firstPlayer}</div>
              ) : (
                <div>Red Player</div>
              )
            ) : secondPlayer !== "" ? (
              <div>{secondPlayer}</div>
            ) : (
              <div>Blue Player</div>
            )}
            <div className="text-5xl">
              <span>
                {("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2)}
              </span>
              :
              <span>
                {("0" + (Math.floor(milliseconds / 1000) % 60)).slice(-2)}
              </span>
              :
              <span>
                {("0" + Math.floor((milliseconds / 10) % 1000)).slice(-2)}
              </span>
              <div className="flex align-super justify-start p-5">
              <div className={`w-20 h-12 ${gameState.currentPlayer === 1 ? 'redCoin' : 'blueCoin' }`} />
              </div>
              {/* {gameState.message === "Red Player Wins!" || gameState.message === "Blue Player Wins!" ? (
                <div>Winner!!</div>
              ) : (
                <div>{gameState.message}</div>
              )} */}
            </div>
          </div>
        </div>
        <div className="empty-top"></div>
        <div className="empty-bottom"></div>
        <div className="empty-right"></div>
        <div className="empty-left"></div>
      </div>
    </div>
  );
}

export default App;
