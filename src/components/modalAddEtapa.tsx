import { SetStateAction, useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Modal from "./modal";
import { Button } from "./button";
import ModalHeader from "./modalHeader";
import { ImCheckmark2 } from "react-icons/im";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface ModalAddEtapaProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
}

type Etapa = {
  id: number;
  content: string;
  selected?: boolean;
};

export const ModalAddEtapa = ({
  modalInfo,
  setModalInfo,
}: ModalAddEtapaProps) => {
  const handleModalInfo = () => {
    setModalInfo(false);
  };

  const [etapas, setEtapas] = useState<Etapa[]>([
    { id: 1, content: "Pintura" },
    { id: 2, content: "Piscina" },
    { id: 3, content: "Terraplanagem" },
    { id: 4, content: "Estrutura" },
    { id: 5, content: "Telhado" },
    { id: 6, content: "Esquadrias" },
    { id: 7, content: "Limpeza" },
  ]);

  const toggleSelection = (id: number) => {
    setEtapas(
      etapas.map((etapa) =>
        etapa.id === id ? { ...etapa, selected: !etapa.selected } : etapa
      )
    );
  };

  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <div className="bg-gray-300">
        <ModalHeader
          onClose={() => setModalInfo(false)}
          title="INCLUIR ETAPAS"
        />
        <div className="flex flex-col h-full w-full bg-white rounded">
          <div className="flex flex-col justify-center items-center p-1 m-1 rounded text-center">
            <p>Selecione as etapas que você deseja incluir na Obra</p>

            <div className="grid grid-cols-4 gap-2 p-4 auto-rows-fr">
              {etapas.map((etapa) => (
                <div
                  key={etapa.id}
                  onClick={() => toggleSelection(etapa.id)}
                  className={`bg-gray-300 hover:bg-blue-300 flex justify-center items-center cursor-pointer px-6 py-5 rounded-md ${
                    etapa.selected ? "bg-blue-400 text-white" : ""
                  }`}
                >
                  <span>{etapa.content}</span>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="flex flex-col bg-white mt-2 rounded-sm">
            <div className="flex flex-row gap-2 p-3 justify-end">
              <Button
                className="bg-green-800 hover:bg-green-900 text-white flex flex-row gap-3 w-32 text-center align-middle justify-center items-center"
                onClick={handleModalInfo}
              >
                <ImCheckmark2 size={20} />
                Incluir
              </Button>
            </div>
          </div>
      </div>
    </Modal>
  );
};
