import { SetStateAction, useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Modal from "./modal";
import ModalHeader from "./modalHeader";
import { DadosdaObra } from "./constructions/dadosDaObra";
import { Button } from "./button";
import { Cliente } from "./constructions/cliente";
import { Etapas } from "./constructions/etapas";
import { Planejamento } from "./constructions/planejamento";

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
  const [projectId, setProjectId] = useState<number | null>(null);

  const handleProjectIdChange = (newId: number) => {
    setProjectId(newId);
  };

  return (
    <Modal isOpen={modalInfo} setIsOpen={setModalInfo}>
      <ModalHeader
        onClose={() => setModalInfo(false)}
        title="CADASTRO DE OBRAS"
      />
      <div className="flex flex-col bg-gray-200 overflow-y-auto h-[80vh] w-[70vw]">
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
            disabled={!projectId}
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
            disabled={!projectId}
          >
            Etapas
          </Button>
          <Button
            className={`text-sm ${
              activeTab === "Planejamento"
                ? "bg-blue-700 text-white"
                : "text-blue-950"
            }`}
            onClick={() => setActiveTab("Planejamento")}
            disabled={!projectId}
          >
            Planejamento
          </Button>
        </div>
        {activeTab === "DadosdaObra" && (
          <DadosdaObra onProjectSave={handleProjectIdChange} />
        )}
        {activeTab === "Cliente" && <Cliente id={projectId} />}
        {activeTab === "Etapas" && <Etapas />}
        {activeTab === "Planejamento" && <Planejamento />}
      </div>
    </Modal>
  );
};
