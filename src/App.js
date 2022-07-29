import "./App.css";
import { Connect4 } from "./Connect4";
import Modal from "./modal";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState("Player 1");
  const [secondPlayer, setSecondPlayer] = useState("Player 2");
  const [command, setCommand] = useState("play");
  const [client, setClient] = useState("");

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
        />

        <div className="">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Twitch Settings
          </button>

          <br></br>
          <br></br>

          <div className="items-center content-center	justify-self-center	justify-items-center	justify-center place-content-center	place-items-center	place-self-center grid grid-cols-12 gap-1">
            <div className="col-start-1 col-span-12">
              <Connect4
                client={client}
                command={command}
                firstPlayer={firstPlayer}
                secondPlayer={secondPlayer}
              />
            </div>
            <div className="self-center	col-start-4 col-span-2 ">
              <div className=" bg-red-600 p-2 text-white border-4 rounded-md border-transparent ">
                {firstPlayer}
              </div>
            </div>

            <div className="self-center	col-start-8 col-span-2 ">
              <div className=" bg-yellow-400  p-2 rounded-md border-transparent ">
                {secondPlayer}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
