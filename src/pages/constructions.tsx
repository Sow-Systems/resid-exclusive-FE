import SearchBar from "@/components/searchBar";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { CiClock2 } from "react-icons/ci";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import excelIcon from "@/assets/icons/excel.svg";
import pdfIcon from "@/assets/icons/pdf.svg";
import addIcon from "@/assets/icons/add.svg";
import { Button } from "@/components/button";
import { dadosMockados } from "@/utils/mock/table";
import { clsx } from "@/utils/classes";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Pagination } from "@/components/pagination";
import { ModalAddConstruction } from "@/components/modalAddConstruction";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

type ProjectData = {
  [key: string | number]: any;
};

const Pill = ({
  status,
  title,
}: {
  status: "Em andamento" | "Finalizado";
  title: string;
}) => {
  return (
    <div
      className={clsx(
        `text-xs px-1 py-0.5 rounded-full text-center font-semibold`,
        status === "Em andamento"
          ? `bg-green-200 text-green-950 `
          : `bg-orange-400 text-orange-950`
      )}
    >
      {title}
    </div>
  );
};

export function Constructions() {
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [showInitialDatePicker, setShowInitialDatePicker] = useState(false);
  const [showFinalDatePicker, setShowFinalDatePicker] = useState(false);

  const [constructionStatus, setConstructionStatus] = useState("Selecione");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(dadosMockados.length);

  const [clientName, setClientName] = useState("");
  const [constructionName, setConstructionName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [modalInfo, setModalInfo] = useState(false);

  const handleModalAddConstruction = () => {
    setModalInfo(true);
  };

  const handleSearchNameClient = (term: string) => {
    setClientName(term);
  };

  const handleSearchConstructionClient = (term: string) => {
    setConstructionName(term);
  };

  const handleSearchCategoryClient = (term: string) => {
    setCategoryName(term);
  };

  const onPageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event: { target: { value: string } }) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const initialDatePickerRef = useRef<HTMLDivElement | null>(null);
  const finalDatePickerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: { target: never }) => {
    if (
      initialDatePickerRef.current &&
      !initialDatePickerRef.current.contains(event.target)
    ) {
      setShowInitialDatePicker(false);
    }

    if (
      finalDatePickerRef.current &&
      !finalDatePickerRef.current.contains(event.target)
    ) {
      setShowFinalDatePicker(false);
    }
  };

  const [sortConfig, setSortConfig] = useState<{
    key: string | number;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredProjects = useMemo(() => {
    return dadosMockados.filter((projeto) => {
      return (
        (clientName ? projeto.cliente.toLowerCase().includes(clientName.toLowerCase()) : true) &&
        (constructionName ? projeto.obra.toLowerCase().includes(constructionName.toLowerCase()) : true) &&
        (categoryName ? projeto.categoria.toLowerCase().includes(categoryName.toLowerCase()) : true) &&
        (constructionStatus !== "Selecione" ? projeto.status === constructionStatus : true)
      );
    });
  }, [clientName, constructionName, categoryName, constructionStatus, dadosMockados]);

  const sortedProjectsPaginated = useMemo(() => {
    const sortedItems = [...filteredProjects];
    if (sortConfig && ["cliente", "obra", "dataInicio", "dataFim"].includes(sortConfig.key)) {
      sortedItems.sort((a, b) => {
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
    return sortedItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, itemsPerPage, filteredProjects, sortConfig]);

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

  const [isDivVisible, setIsDivVisible] = useState(true);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTotalItems(filteredProjects.length);
    setCurrentPage(1);
  }, [filteredProjects]);

  useEffect(() => {
    setTotalItems(dadosMockados.length);
  }, [dadosMockados]);

  return (
    <div className="flex flex-col h-full items-center p-3 gap-2">
      <div className="bg-[#FFFFFF] flex flex-col w-full justify-between p-3 pb-6 gap-4 rounded">
        <div
          className={`${
            isDivVisible ? "" : "hidden-section"
          } transition-all duration-200 flex flex-row justify-between`}
        >
          <div className="flex flex-row gap-3">
            <div
              className="flex flex-col gap-1 relative"
              ref={initialDatePickerRef}
            >
              <p className="text-black font-semibold">Data de Início</p>
              <div
                className="px-2 py-1 flex justify-between items-center text-center gap-1 flex-row font-medium border min-w-[200px]"
                onClick={() => setShowInitialDatePicker(!showInitialDatePicker)}
              >
                <p className="text-gray-500">
                  {initialDate
                    ? initialDate.toLocaleDateString()
                    : "Escolha uma data"}
                </p>
                <CiClock2 size={18} />
              </div>
              {showInitialDatePicker && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    top: "100%",
                    left: 0,
                  }}
                >
                  <DatePicker
                    selected={initialDate}
                    onChange={(date) => setInitialDate(date)}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    inline
                    className="text-center"
                  />
                </div>
              )}
            </div>
            <div
              className="flex flex-col gap-1 relative"
              ref={finalDatePickerRef}
            >
              <p className="text-black font-semibold">Data de Finalização</p>
              <div
                className="px-2 py-1 flex justify-between items-center text-center gap-1 flex-row font-medium border min-w-[200px]"
                onClick={() => setShowFinalDatePicker(!showFinalDatePicker)}
              >
                <p className="text-gray-500">
                  {finalDate
                    ? finalDate.toLocaleDateString()
                    : "Escolha uma data"}
                </p>
                <CiClock2 size={18} />
              </div>
              {showFinalDatePicker && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    top: "100%",
                    left: 0,
                  }}
                >
                  <DatePicker
                    selected={finalDate}
                    onChange={(date) => setFinalDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={initialDate}
                    locale="pt-BR"
                    inline
                    className="text-center"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-black font-semibold">Status da Obra</p>
              <select
                value={constructionStatus}
                onChange={(e) => setConstructionStatus(e.target.value)}
                className="px-2 py-1 text-left font-medium border min-w-[200px] bg-white text-gray-600"
              >
                <option value="Selecione">Selecione</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Em andamento">Em andamento</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center align-middle items-center gap-2">
            <Button className="flex flex-row items-center gap-2 h-10 bg-blue-600 hover:bg-blue-800 rounded text-white text-sm" onClick={handleModalAddConstruction}>
              <img src={addIcon} width={15} />
              Adicionar Obra
            </Button>
            <img
              src={excelIcon}
              width={35}
              className="hover:opacity-70 cursor-pointer"
            />
            <img
              src={pdfIcon}
              width={35}
              className="hover:opacity-70 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <SearchBar
              placeholder="Procure pelo Nome do Cliente"
              onSearchTermChange={handleSearchNameClient}
            />
            <SearchBar
              placeholder="Procure pelo Nome da Obra"
              onSearchTermChange={handleSearchConstructionClient}
            />
            <SearchBar
              placeholder="Procure pela Categoria"
              onSearchTermChange={handleSearchCategoryClient}
            />
          </div>
          <div
            onClick={toggleDivVisibility}
            className="bg-gray-300 flex items-center justify-center align-middle gap-2 rounded px-3 text-center cursor-pointer hover:bg-gray-400"
          >
            <MdKeyboardDoubleArrowUp size={25} />
            Filtros
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] flex flex-col h-full w-full justify-between p-3 pb-6 gap-4 rounded">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => requestSort("cliente")}
                >
                  CLIENTE
                  <SortIcon
                    isSorted={sortConfig?.key === "cliente"}
                    isAsc={sortConfig?.direction === "asc"}
                  />
                </th>
                <th className="px-4 py-2">OBRA</th>
                <th className="px-4 py-2">DATA INICIO</th>
                <th className="px-4 py-2">DATA FIM</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2">VALOR DO CONTRATO</th>
                <th className="px-4 py-2">CATEGORIA</th>
                <th className="px-4 py-2">ÁREA</th>
                <th className="px-4 py-2">ETAPA ATUAL</th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {sortedProjectsPaginated.map((projeto, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.cliente}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">{projeto.obra}</td>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.dataInicio}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.dataFim}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.status && projeto.status === "Em andamento" && (
                      <Pill status="Em andamento" title="Em andamento" />
                    )}
                    {projeto.status && projeto.status === "Finalizado" && (
                      <Pill status="Finalizado" title="Finalizado" />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.valorContrato}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.categoria}
                  </td>
                  <td className="px-4 py-2 border-b text-sm">{projeto.area}</td>
                  <td className="px-4 py-2 border-b text-sm">
                    {projeto.etapaAtual}
                  </td>
                  <td className="border-b text-sm">
                    <FaEdit size={19} className="cursor-pointer" />
                  </td>
                  <td className="border-b text-sm">
                    <IoTrashBin size={19} className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex flex-row gap-2 items-center justify-end">
            <select
              className="border p-1 rounded text-sm bg-white"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              {[10, 25, 50].map((size) => (
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
      <ModalAddConstruction
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
    </div>
  );
}
