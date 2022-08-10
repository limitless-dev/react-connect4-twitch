import "./App.css";
import { Connect4 } from "./Connect4";
import Modal from "./modal";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [startPlayer, setStartPlayer] = useState(1);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [command, setCommand] = useState("play");
  const [client, setClient] = useState("");
  const [twitchMessage, setTwitchMessage] = useState("");
  const [twitchUser, setTwitchUser] = useState("");
  const [twitchTime, setTwitchTime] = useState(null)
  return (
    <div className="App dark">
      <header className="App-header">
        <Modal
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
        <div className="">
          <button
            type="submit"
            id="button-settings"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 16 16"
              stroke="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z"
              />
              <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
            </svg>
            Twitch Settings
          </button>


        </div>
      </header>
        <Connect4
          firstPlayer={firstPlayer}
          secondPlayer={secondPlayer}
          twitchMessage={twitchMessage}
          twitchUser={twitchUser}
          startPlayer={startPlayer}
          twitchTime={twitchTime}
        />
        <br></br>
        <br></br>
    </div>
  );
}

export default App;
