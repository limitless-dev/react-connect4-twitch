import { Fragment, useRef, useState, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import tmi from "tmi.js";

export default function Example({
  openModal,
  setOpenModal,
  firstPlayer,
  setFirstPlayer,
  secondPlayer,
  setSecondPlayer,
  client,
  setClient,
  command,
  setCommand,
  setTwitchMessage,
  setTwitchUser,
  setTwitchTime,
  startPlayer,
  setStartPlayer,
}) {
  const [channel, setChannel] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const cancelButtonRef = useRef(null);

  const loadDataOnlyOnce = useCallback(() => {
    setClient(
      new tmi.Client({
        options: {
          debug: true,
        },
        channels: [channel],
      })
    );
  }, [channel, setClient]);

  useEffect(() => {
    loadDataOnlyOnce();
  }, [loadDataOnlyOnce]);

  const connectTwitch = async () => {
    // if the input field for channel id is empty, just return
    if (channel === "") {
      return;
    }
    // if there is an open connection, close it because
    // we will make a new connection
    if (client.readyState() === "OPEN") {
      await client.disconnect();
      setConnectionStatus("Disconnected");
    }

    // establish connection to the channel
    await client.connect();
    if (client.readyState() === "OPEN") {
      setConnectionStatus(`Connected to ${channel}`);
    }

    client.on("message", (channel, tags, message, self) => {
      if (!message.startsWith("!")) return;

      const args = message.slice(1).split(" ");
      const receivedCommand = args.shift().toLowerCase();

      if (receivedCommand !== command) {
        return;
      }
      setTwitchTime(Date.now());
      setTwitchMessage(message);
      setTwitchUser(tags.username.toLowerCase());
    });
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="space-y-10 m:p-12 mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Twitch Configuration
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className=" sm:flex sm:items-start">
                          <div className="">
                            <div className="space-y-0 sm:p-0">
                              <div className="grid grid-cols-6 gap-6 gap-y-10">
                                <div className="col-span-4 sm:col-span-4 col-start-1 sm:col-start-1">
                                  <label
                                    htmlFor="twitch-channel"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Channel
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                      @
                                    </span>
                                    <input
                                      type="text"
                                      name="twitch-channel"
                                      id="twitch-channel"
                                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                      placeholder=""
                                      value={channel}
                                      onChange={(e) =>
                                        setChannel(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-span-2 sm:col-span-2 col-start-5 sm:col-start-5">
                                  <label
                                    htmlFor="twitch-command"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Command
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                      !
                                    </span>
                                    <input
                                      type="text"
                                      name="twitch-command"
                                      id="twitch-command"
                                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                      placeholder=""
                                      value={command}
                                      onChange={(e) =>
                                        setCommand(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className=" col-span-3 sm:col-span-3">
                                  <label
                                    htmlFor="company-website"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Red Player
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                      @
                                    </span>
                                    <input
                                      type="text"
                                      name="twitch-player1"
                                      id="twitch-player1"
                                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                      placeholder=""
                                      value={firstPlayer}
                                      onChange={(e) =>
                                        setFirstPlayer(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-span-3 sm:col-span-3">
                                  <label
                                    htmlFor="company-website"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Blue Player
                                  </label>
                                  <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                      @
                                    </span>
                                    <input
                                      type="text"
                                      name="twitch-player2"
                                      id="twitch-player2"
                                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                      placeholder=""
                                      value={secondPlayer}
                                      onChange={(e) =>
                                        setSecondPlayer(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                  <label
                                    htmlFor="countries"
                                    className="block text-sm font-medium text-gray-700  mb-2 dark:text-gray-400"
                                  >
                                    Who plays first?
                                  </label>
                                  <select
                                    id="players"
                                    defaultValue={startPlayer}
                                    className="w-2/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => {
                                      setStartPlayer(e.target.value);
                                    }}
                                  >
                                    <option value="1">Red Player</option>
                                    <option value="2">Blue Player</option>
                                  </select>
                                  <p className="block text-sm text-gray-700  mt-1 mb-2 dark:text-gray-400">
                                    * Changing the player will result in clearing
                                    the board!
                                  </p>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-4 px-4 py-3 bg-gray-50 sm:px-6 bg-gray-50">
                  <div className="col-span-2 sm:col-span-2 col-start-1 sm:col-start-1">
                    <p
                      className={`inline-block align-middle text-sm font-semibold ${
                        connectionStatus === "Disconnected"
                          ? "text-red-600"
                          : "text-green-700"
                      } `}
                    >
                      {connectionStatus}
                    </p>
                  </div>

                  <div className="col-span-4 sm:col-span-4 col-start-5 sm:col-start-5 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={connectTwitch}
                    >
                      Re-Connect
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenModal(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
