
export default function Example() {
  return (
    <div className="grid grid-cols-3 gap-4">

    <div className="">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-6 gap-6 gap-y-10">
              <div className="col-span-4 sm:col-span-4 col-start-1 sm:col-start-1">
                <label htmlFor="twitch-channel" className="block text-sm font-medium text-gray-700">
                  Twitch Channel
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
                  />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-2 col-start-5 sm:col-start-5">
                <label htmlFor="twitch-command" className="block text-sm font-medium text-gray-700">
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
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Player 1
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
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Player 2
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
                  />
                </div>
              </div>
            </div>



          </div>
          <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-50 sm:px-6">
          <div className="col-span-2 sm:col-span-2 col-start-1 sm:col-start-1">
          <p className="inline-block align-middle text-sm font-light text-gray-700">
          Disconnected
          </p>          
          </div>

          <div className="col-span-2 sm:col-span-2 col-start-5 sm:col-start-5">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Re-Connect
            </button>
            
            </div>
            
          </div>
        </div>
    </div>
    
    </div>

  );
}
