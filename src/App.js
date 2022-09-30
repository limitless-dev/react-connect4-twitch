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
    <div className="text-center dark:bg-slate-900 bg-game-logo bg-repeat">
      <Header
        height={60}
        className="dark:bg-slate-900 flex flex-wrap items-center justify-end border-slate-800 pr-4 gap-2 "
        fixed={false}
      >
        <MenuButton
          tooltipText="Twitch Settings"
          backgroundColor="#6441A4"
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
      
      <div className="grid grid-rows-1s grid-flow-col align-middle justify-evenly">
        <div className="row-span-1">
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

        <div className="w-80 self-center">
          <div className="parent">
            <div className="line">
              <div className={`c ${gameState.currentPlayer === 1 ? 'bg-[#dc30f6]': 'bg-[#e6d542]'}`}></div>
            </div>
            <div className="time">
              <div className="player1 text-5xl">
                <span>
                  {("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2)}
                </span>
                :
                <span>{("0" + Math.floor(milliseconds / 1000) % 60).slice(-2)}</span>
                :
                <span>
                  {("0" + Math.floor((milliseconds / 10) % 1000)).slice(-2)}
                </span>
              </div>
            </div>
            <div className="players-container">
              {gameState.currentPlayer === 1
                ? firstPlayer !== "" && (
                    <div className="player1 text-white text-center">
                      {firstPlayer}
                    </div>
                  )
                : secondPlayer !== "" && (
                    <div className="player2 text-center">{secondPlayer}</div>
                  )}
            </div>
            <div className="right-side">
              <div className={`a ${gameState.currentPlayer === 1 ? 'bg-[#dc30f6]': 'bg-[#e6d542]'}`}></div>
            </div>
            <div className="left-side">
              <div className={`b ${gameState.currentPlayer === 1 ? 'bg-[#dc30f6]': 'bg-[#e6d542]'}`}></div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
