import { SetStateAction } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Modal from "./modal";
import { Button } from "./button";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface ModalSaveRegisterProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
}

export const ModalSaveRegister = ({
  modalInfo,
  setModalInfo,
}: ModalSaveRegisterProps) => {

  const handleModalInfo = () => {
    setModalInfo(false);
  };

  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
       <div className="flex flex-col h-full w-full bg-gray-300 rounded ">
        <span className="text-blue-700 font-semibold p-2">Exclusão de Registro</span>
        <div className="flex justify-center items-center bg-gray-100 p-1 m-1 rounded text-blue-600 h-32 text-center">
          Registro Salvo com Sucesso!
        </div>
        <div className="flex flex-row justify-center gap-2 p-1">
        <Button className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3 w-32 text-center align-middle justify-center" onClick={handleModalInfo}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};
