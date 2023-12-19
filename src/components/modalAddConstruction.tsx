import {
  SetStateAction,
} from "react";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale, setDefaultLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Modal from "./modal";
import ModalHeader from "./modalHeader";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface ModalClientAddProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
}

export const ModalClientAdd = ({
  modalInfo,
  setModalInfo,
}: ModalClientAddProps) => {


  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <ModalHeader
        onClose={() => setModalInfo(false)}
        title="Adicionar Construção"
      />
      <div className="flex flex-col h-full w-full">
          <div className="bg-gray-200 w-full">Opções do Cabeçalho</div>
          <div>Formulario</div>
      </div>
    </Modal>
  );
};
