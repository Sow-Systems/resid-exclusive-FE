import { FiPlus } from "react-icons/fi";
import { Button } from "../button";
import { CiFloppyDisk } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ModalAddEtapa } from "../modalAddEtapa";

type Etapa = {
  id: number;
  content: string;
  selected?: boolean;
};

export function Etapas() {
  const [etapas, setEtapas] = useState<Etapa[]>([
    { id: 1, content: "Fundação" },
    { id: 2, content: "Viga Baldrame" },
    { id: 3, content: "Alvenaria" },
    { id: 4, content: "Reboco" },
    { id: 5, content: "Acabamento" },
    { id: 6, content: "Area Externa" },
    { id: 7, content: "Muro" },
  ]);

  const toggleSelection = (id: number) => {
    setEtapas(
      etapas.map((etapa) =>
        etapa.id === id ? { ...etapa, selected: !etapa.selected } : etapa
      )
    );
  };

  const deleteSelected = () => {
    setEtapas(etapas.filter((etapa) => !etapa.selected));
  };

  const [addEtapaModal, setAddEtapaModal] = useState(false);

  const handleModalAddEtapa = () => {
    setAddEtapaModal(true);
  };

  return (
    <>
      <div className="flex flex-col bg-white m-2 rounded-sm h-full">
        <div className="flex flex-row gap-5 px-4 py-2">
          <div className="flex flex-col">
            <Button
              className="bg-green-700 hover:bg-green-800 text-white flex flex-row gap-3 text-center align-middle justify-center items-center h-10 rounded-md"
              onClick={handleModalAddEtapa}
            >
              <FiPlus size={15} color={"white"} />
              <p className="text-sm">Incluir Etapas</p>
            </Button>
          </div>
          <div className="flex flex-col">
            <Button
              onClick={deleteSelected}
              className="bg-red-700 hover:bg-red-800 text-white flex flex-row gap-3 text-center align-middle justify-center items-center w-36 h-10 rounded-md"
            >
              <FaRegTrashAlt size={15} color={"white"} />
              <p className="text-sm">Excluir</p>
            </Button>
          </div>
        </div>

        <ReactSortable
          list={etapas}
          setList={(newList) => {
            setEtapas(
              newList.map((item, index) => ({ ...item, id: index + 1 }))
            );
          }}
          animation={150}
          className="grid grid-cols-4 gap-2 p-4 auto-rows-fr"
        >
          {etapas.map((etapa, index) => (
            <div
              key={etapa.id}
              onClick={() => toggleSelection(etapa.id)}
              className={`bg-gray-300 hover:bg-blue-300 flex justify-center items-center cursor-pointer px-6 py-5 rounded-md ${
                etapa.selected ? "bg-blue-400 text-white" : ""
              }`}
            >
              <span className="font-bold text-xl mr-3">{index + 1}</span>
              <span>{etapa.content}</span>
            </div>
          ))}
        </ReactSortable>
      </div>

      <div className="flex flex-col bg-white m-2 rounded-sm">
        <div className="flex flex-row gap-2 p-3 justify-end">
          <Button className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3">
            <CiFloppyDisk size={20} />
            Salvar
          </Button>
        </div>
      </div>
      <ModalAddEtapa
        modalInfo={addEtapaModal}
        setModalInfo={setAddEtapaModal}
      />
    </>
  );
}
