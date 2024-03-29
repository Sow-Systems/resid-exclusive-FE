import { SetStateAction, useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Modal from "./modal";
import ModalHeader from "./modalHeader";
import { DadosdaObra } from "./constructions/edit/dadosDaObra";
import { Button } from "./button";
import { Cliente } from "./constructions/edit/cliente";
import { Etapas } from "./constructions/edit/etapas";
import { Planejamento } from "./constructions/edit/planejamento";
import { ProjectDataFromApi } from "@/types/projects";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface ModalEditConstructionProps {
  modalInfo: boolean;
  setModalInfo: (value: SetStateAction<boolean>) => void;
  data: ProjectDataFromApi;
}

export const ModalEditConstruction = ({
  modalInfo,
  setModalInfo,
  data,
}: ModalEditConstructionProps) => {
  const [activeTab, setActiveTab] = useState("DadosdaObra");
  console.log("Edit abriu");

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
          <Button
            className={`text-sm ${
              activeTab === "Planejamento"
                ? "bg-blue-700 text-white"
                : "text-blue-950"
            }`}
            onClick={() => setActiveTab("Planejamento")}
          >
            Planejamento
          </Button>
        </div>
        {activeTab === "DadosdaObra" && <DadosdaObra data={data} />}
        {activeTab === "Cliente" && <Cliente data={data} />}
        {activeTab === "Etapas" && <Etapas />}
        {activeTab === "Planejamento" && <Planejamento />}
      </div>
    </Modal>
  );
};
