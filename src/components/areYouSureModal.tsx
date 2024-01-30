import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Modal from "./modal";
import { Button } from "./button";
import { SetStateAction } from "react";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface AreYouSureModalProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
  onConfirm: () => void;
}

export const AreYouSureModal = ({
  modalInfo,
  setModalInfo,
  onConfirm
}: AreYouSureModalProps) => {
  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <div className="flex flex-col h-full w-full bg-gray-300 rounded">
        <span className="text-red-700 font-semibold p-2">Exclusão de Registro</span>
        <div className="flex justify-center items-center bg-gray-100 p-1 m-1 rounded text-red-600 h-32 text-center">
          Você tem certeza?
        </div>
        <div className="flex flex-row justify-between gap-2 p-1">
          <Button
            onClick={() => setModalInfo(false)}
            className="bg-red-600 hover:bg-red-800 text-white flex flex-row gap-3 w-32 text-center align-middle justify-center"
          >
            Não
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3 w-32 text-center align-middle justify-center"
            onClick={() => {
              setModalInfo(false);
              onConfirm();
            }}
          >
            Sim
          </Button>
        </div>
      </div>
    </Modal>
  );
};

