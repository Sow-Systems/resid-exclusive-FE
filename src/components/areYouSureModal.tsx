import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ModalHeader from "./modalHeader";
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
      <ModalHeader
        onClose={() => setModalInfo(false)}
        title=""
      />
      <div className="w-full mt-3 flex flex-col space-y-1.5 gap-1 p-2.5 rounded-lg md:max-w-md bg-card-light-gray items-center">
        <div>Você tem certeza?</div>
        <div className="flex flex-row justify-around w-full">
          <Button
            className="text-xs bg-green-700 text-white flex rounded-full"
            onClick={() => {
              setModalInfo(false);
              onConfirm(); // Chame a função de exclusão aqui
            }}
          >
            Sim
          </Button>
          <Button
            onClick={() => setModalInfo(false)}
            className="text-xs bg-red-700 text-white flex rounded-full"
          >
            Não
          </Button>
        </div>
      </div>
    </Modal>
  );
};
