import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SetStateAction } from "react";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  children: any
}

const Modal: React.FC<IModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
            <div className="fixed inset-0 flex items-start justify-center max-h-screen p-4 overflow-auto sm:items-center">
              <Dialog.Panel className="min-w-[320px] mx-auto bg-white rounded">
                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
