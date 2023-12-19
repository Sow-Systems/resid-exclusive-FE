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

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

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
  const initialDatePickerRef = useRef(null);
  const finalDatePickerRef = useRef(null);
  const [constructionStatus, setConstructionStatus] = useState("Selecione");

  const handleClickOutside = (event) => {
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
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedProjects = useMemo(() => {
    const sortableItems = [...dadosMockados];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [dadosMockados, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "asc";
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

  return (
    <div className="flex flex-col h-full items-center p-3 gap-2">
      <div className="bg-[#FFFFFF] flex flex-col w-full justify-between p-3 pb-6 gap-4 rounded">
      <div className={`${isDivVisible ? '' : 'hidden-section'} transition-all duration-500 overflow-hidden flex flex-row justify-between`}>
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
                <option value="Em construção">Em construção</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center align-middle items-center gap-2">
            <Button className="flex flex-row items-center gap-2 h-10 bg-blue-600 hover:bg-blue-800 rounded text-white text-sm">
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
            <SearchBar placeholder="Procure pelo Nome do Cliente" />
            <SearchBar placeholder="Procure pelo Nome da Obra" />
            <SearchBar placeholder="Procure pela Categoria" />
          </div>
          <div onClick={toggleDivVisibility} className="bg-gray-300 flex items-center justify-center align-middle gap-2 rounded px-3 text-center cursor-pointer hover:bg-gray-400">
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
              {sortedProjects.map((projeto, index) => (
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
                    <FaEdit size={19} className="cursor-pointer"/>
                  </td>
                  <td className="border-b text-sm">
                  <IoTrashBin size={19} className="cursor-pointer"/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
