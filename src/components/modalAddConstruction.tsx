import { SetStateAction, useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Modal from "./modal";
import ModalHeader from "./modalHeader";
import { DadosdaObra } from "./constructions/dadosDaObra";
import { Button } from "./button";
import { Cliente } from "./constructions/cliente";
import { Etapas } from "./constructions/etapas";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface ModalAddConstructionProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
}

export const ModalAddConstruction = ({
  modalInfo,
  setModalInfo,
}: ModalAddConstructionProps) => {
  const [activeTab, setActiveTab] = useState("DadosdaObra");

  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <ModalHeader
        onClose={() => setModalInfo(false)}
        title="CADASTRO DE OBRAS"
      />
      <div className="flex flex-col bg-gray-200 overflow-y-auto w-[969px] h-[780px]">
        <div className="bg-gray-300 w-full flex flex-row gap-3 p-2">
          <Button
            className={`text-sm ${
              activeTab === "DadosdaObra"
                ? "bg-blue-700 text-white"
                : "text-blue-950"
            }`}
            onClick={() => setActiveTab("DadosdaObra")}
          >
            Dados da Obra
          </Button>
          <Button
            className={`text-sm ${
              activeTab === "Cliente"
                ? "bg-blue-700 text-white"
                : "text-blue-950"
            }`}
            onClick={() => setActiveTab("Cliente")}
          >
            Cliente
          </Button>
          <Button
            className={`text-sm ${
              activeTab === "Etapas"
                ? "bg-blue-700 text-white"
                : "text-blue-950"
            }`}
            onClick={() => setActiveTab("Etapas")}
          >
            Etapas
          </Button>
          <Button className=" text-blue-950 text-sm">Planejamento</Button>
        </div>
        {activeTab === "DadosdaObra" && <DadosdaObra />}
        {activeTab === "Cliente" && <Cliente />}
        {activeTab === "Etapas" && <Etapas />}
      </div>
    </Modal>
  );
};
