import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ openModal, setOpenModal, title, children }) {
  const cancelButtonRef = useRef(null);
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
              <Dialog.Panel className={`relative bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-full ${title === "Winners" ? 'sm:max-w-5xl': "sm:max-w-lg sm:w-full"}`}>
                <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className={`${title.includes("Winner") ? 'sm:block': ""}`}>
                    <div className="space-y-10 m:p-12 mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                      <div className="mt-12">{children}</div>
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-4 px-4 py-3 sm:px-6 bg-gray-50 dark:bg-gray-900">
                  <div className="col-span-2 sm:col-span-2 col-start-1 sm:col-start-1"></div>

                  <div className="col-span-4 sm:col-span-4 col-start-5 sm:col-start-5 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex items-center mr-2 px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-indigo-500 bg-indigo-600 dark:border-gray-700 dark:bg-transparent hover:bg-indigo-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-700"
                      onClick={() => setOpenModal(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>

                    <button ref={cancelButtonRef}></button>
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
