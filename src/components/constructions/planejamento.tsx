import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";
import { CiFloppyDisk } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { IoBackspaceOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

import { useEffect, useMemo, useState } from "react";
import { dadosMockados } from "@/utils/mock/planejamentoTable";
import { Pagination } from "../pagination";

type ProjectData = {
  [key: string | number]: any;
};

type Options = {
  id: number;
  content: string;
  selected?: boolean;
};

export function Planejamento() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [projects, setProjects] = useState(dadosMockados);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(dadosMockados.length);

  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(
    new Set()
  );

  const [etapaSelected, setEtapaSelected] = useState<string>("");

  const [etapas] = useState<Options[]>([
    { id: 1, content: "Fundação" },
    { id: 2, content: "Viga Baldrame" },
    { id: 3, content: "Alvenaria" },
    { id: 4, content: "Reboco" },
    { id: 5, content: "Acabamento" },
    { id: 6, content: "Area Externa" },
    { id: 7, content: "Muro" },
  ]);

  const [typeWorkingClass, setTypeWorkingClass] = useState<string>("");

  const [typesOfWorkingClass] = useState<Options[]>([
    { id: 1, content: "Funcionários" },
    { id: 2, content: "Terceirizada" },
    { id: 3, content: "Autônoma" },
  ]);

  const [specialty, setSpecialty] = useState<string>("");

  const [typesOfSpecialty] = useState<Options[]>([
    { id: 1, content: "Eletricista" },
    { id: 2, content: "Encanador" },
    { id: 3, content: "Pintor" },
    { id: 4, content: "Pedreiro" },
    { id: 5, content: "Vidraceiro" },
    { id: 6, content: "Carpinteiro" },
    { id: 7, content: "Paisagista" },
  ]);

  const handleTypeWorkingClassChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = e.target.value;
    setTypeWorkingClass(selectedType);

    if (selectedType !== "2") {
      setSpecialty("");
    }
  };

  const onPageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string } }) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const [sortConfig, setSortConfig] = useState<{
    key: string | number;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedProjectsPaginated = useMemo(() => {
    if (
      sortConfig &&
      [
        "etapa",
        "obra",
        "tipoMaoDeObra",
        "especialidade",
        "valor",
        "dataInicio",
        "dataFim",
      ].includes(sortConfig.key)
    ) {
      projects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return projects.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, itemsPerPage, projects, sortConfig]);

  const requestSort = (key: keyof ProjectData) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ isSorted, isAsc }) => {
    return (
      <span className="inline-block ml-2">
        {isSorted ? (isAsc ? "↓" : "↑") : "↕️"}
      </span>
    );
  };

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjectIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(projectId)) {
        newSelected.delete(projectId);
      } else {
        newSelected.add(projectId);
      }
      return newSelected;
    });
  };

  const deleteSelectedProjects = () => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => !selectedProjectIds.has(project.id))
    );
    setSelectedProjectIds(new Set()); // Limpa a seleção
  };

  useEffect(() => {
    setTotalItems(projects.length);
    setCurrentPage(1);
  }, [projects]);

  useEffect(() => {
    setTotalItems(dadosMockados.length);
  }, [dadosMockados]);

  return (
    <>
      <div className="flex flex-col bg-white mx-1 my-1 rounded-sm text-xs 2xl:text-sm  h-full">
        <div className="mb-1 mt-3 ml-4 flex flex-row justify-between">
          <p className="font-semibold">Dados do Planejamento</p>
        </div>
        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col">
            Etapa
            <select
              value={etapaSelected}
              onChange={(e) => setEtapaSelected(e.target.value)}
              className="px-2 py-1 text-left font-medium border bg-white text-gray-600"
            >
              <option value="" disabled hidden className="text-gray-500">
                Selecione
              </option>
              {etapas.map((etapa) => (
                <option key={etapa.id} value={etapa.id.toString()}>
                  {etapa.content}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col ">
            Tipo da Mão de Obra
            <select
              value={typeWorkingClass}
              onChange={handleTypeWorkingClassChange}
              className="px-2 py-1 text-left font-medium border bg-white text-gray-600 w-40"
            >
              <option value="" disabled hidden className="text-gray-500">
                Selecione
              </option>
              {typesOfWorkingClass.map((type) => (
                <option key={type.id} value={type.id.toString()}>
                  {type.content}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col ">
            Especialidade
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              disabled={typeWorkingClass !== "2"}
              className="px-2 py-1 text-left font-medium border bg-white text-gray-600 w-44"
            >
              <option value="" disabled hidden className="text-gray-500">
                Selecione
              </option>
              {typesOfSpecialty.map((type) => (
                <option key={type.id} value={type.id.toString()}>
                  {type.content}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col ">
            Valor
            <input
              type="text"
              className="border text-gray-700 rounded p-1 w-32"
              placeholder="R$: 3.500.000,00"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            Data de Início
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              dateFormat="dd/MM/yyyy"
              className="w-32 p-1 text-center text-xs 2xl:text-sm  border rounded"
              locale="pt-BR"
              placeholderText="ex: 29/04/2022"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            Data Fim
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date!)}
              dateFormat="dd/MM/yyyy"
              className="w-32 p-1 text-center text-xs 2xl:text-sm  border rounded"
              minDate={startDate}
              locale="pt-BR"
              placeholderText="ex: 01/05/2023"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 mb-2 mr-3 ">
          <Button className="p-1 rounded-md border-2 bg-yellow-500 hover:bg-yellow-700 cursor-pointer text-white flex flex-row justify-center gap-1 items-center">
            <IoBackspaceOutline size={20} color={"white"} />
            Limpar
          </Button>
          <Button className="px-2 py-1 rounded-md border-2 bg-green-700 hover:bg-green-800 cursor-pointer text-white flex flex-row justify-center gap-1 items-center">
            <FiPlus size={18} color={"white"} />
            Adicionar
          </Button>
        </div>

        <div className="flex flex-col justify-between h-full p-3">
          <div className="overflow-x-auto ">
            <table className="min-w-full table-auto text-left text-gray-500">
              <thead>
                <tr>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => requestSort("etapa")}
                  >
                    Etapa
                    <SortIcon
                      isSorted={sortConfig?.key === "etapa"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => requestSort("tipoMaoDeObra")}
                  >
                    Tipo da Mão de Obra
                    <SortIcon
                      isSorted={sortConfig?.key === "tipoMaoDeObra"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => requestSort("especialidade")}
                  >
                    Especialidade
                    <SortIcon
                      isSorted={sortConfig?.key === "especialidade"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => requestSort("valor")}
                  >
                    Valor
                    <SortIcon
                      isSorted={sortConfig?.key === "valor"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => requestSort("dataInicio")}
                  >
                    Data de Início
                    <SortIcon
                      isSorted={sortConfig?.key === "dataInicio"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => requestSort("dataFim")}
                  >
                    Data de Finalização
                    <SortIcon
                      isSorted={sortConfig?.key === "dataFim"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProjectsPaginated.map((projeto) => (
                  <tr
                    key={projeto.id}
                    onClick={() => toggleProjectSelection(projeto.id)}
                    className={`cursor-pointer hover:bg-blue-100 text-xs 2xl:text-sm ${
                      selectedProjectIds.has(projeto.id) ? "bg-blue-200" : ""
                    }`}
                  >
                    <td className="px-4 py-2 border-b">{projeto.etapa}</td>
                    <td className="px-4 py-2 border-b">
                      {projeto.tipoMaoDeObra}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {projeto.especialidade}
                    </td>
                    <td className="px-4 py-2 border-b">
                      R$:
                      {new Intl.NumberFormat("pt-BR", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                      }).format(projeto.valor)}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {projeto.dataInicio.toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {projeto.dataFim.toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-row justify-end gap-2 mt-2">
              <Button className="bg-gray-600 hover:bg-gray-800 text-white flex flex-row gap-3 text-center align-middle justify-center items-center h-10 rounded-md">
                <GoPencil size={15} color={"white"} />
                <p className="text-sm">Editar</p>
              </Button>
              <Button
                onClick={deleteSelectedProjects}
                className="bg-red-700 hover:bg-red-800 text-white flex flex-row gap-3 text-center align-middle justify-center items-center rounded-md"
              >
                <FaRegTrashAlt size={15} color={"white"} />
                <p className="text-sm">Excluir</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-end mt-4">
            <select
              className="border p-1 rounded text-sm bg-white"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {[10, 15, 25].map((size) => (
                <option key={size} value={size}>
                  {size} Linhas
                </option>
              ))}
            </select>
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white mx-1 my-1 rounded-sm">
        <div className="flex flex-row gap-2 p-1 justify-end">
          <Button className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3">
            <CiFloppyDisk size={20} />
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}
