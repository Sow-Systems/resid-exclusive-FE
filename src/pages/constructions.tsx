import SearchBar from "@/components/searchBar";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { CiClock2 } from "react-icons/ci";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import excelIcon from "@/assets/icons/excel.svg";
import pdfIcon from "@/assets/icons/pdf.svg";
import addIcon from "@/assets/icons/add.svg";
import { Button } from "@/components/button";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Pagination } from "@/components/pagination";
import { ModalAddConstruction } from "@/components/modalAddConstruction";
import { ModalEditConstruction } from "@/components/modalEditConstruction";
import { ModalDeleteRegister } from "@/components/modalDeleteRegister";
import { Pill } from "@/utils/pill";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { ProjectDataFromApi } from "@/types/projects";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

type ProjectData = {
  [key: string | number]: any;
};

type ProjectProps = {
  prj_id: string;
  cus_name: string;
  prj_name: string;
  prj_start_date: Date;
  prj_end_date: Date;
  prj_status: string;
  prj_contract_value: number;
  prj_category: string;
  prj_area: number;
  stg_name: string;
};

export function Constructions() {
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);
  const [showInitialDatePicker, setShowInitialDatePicker] = useState(false);
  const [showFinalDatePicker, setShowFinalDatePicker] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  const [constructionStatus, setConstructionStatus] = useState("Selecione");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(projects.length);

  const [clientName, setClientName] = useState("");
  const [constructionName, setConstructionName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [modalInfo, setModalInfo] = useState(false);

  const handleModalAddConstruction = () => {
    setModalInfo(true);
  };

  const [modalEdit, setModalEdit] = useState(false);
  const [projectSelected, setProjectSelected] = useState<ProjectDataFromApi>([]);

  const handleModalEditConstruction = (project: any) => {
    setModalEdit(true);
    setProjectSelected(project);
  };

  const [deleteModalInfo, setDeleteModalInfo] = useState(false);

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
    return projects.filter((projeto) => {
      const dataInicioProjeto = new Date(projeto.prj_start_date);
      const dataFimProjeto = new Date(projeto.prj_end_date);

      const matchesClientName = clientName
        ? projeto.cus_name?.toLowerCase().includes(clientName.toLowerCase())
        : true;
      const matchesConstructionName = constructionName
        ? projeto.prj_name
            .toLowerCase()
            .includes(constructionName.toLowerCase())
        : true;
      const matchesCategoryName = categoryName
        ? projeto.prj_category
            .toLowerCase()
            .includes(categoryName.toLowerCase())
        : true;
      const matchesConstructionStatus =
        constructionStatus !== "Selecione"
          ? projeto.prj_status === constructionStatus
          : true;
      const matchesInitialDate =
        !initialDate || dataInicioProjeto >= initialDate;
      const matchesFinalDate = !finalDate || dataFimProjeto <= finalDate;

      return (
        matchesClientName &&
        matchesConstructionName &&
        matchesCategoryName &&
        matchesConstructionStatus &&
        matchesInitialDate &&
        matchesFinalDate
      );
    });
  }, [
    projects,
    clientName,
    constructionName,
    categoryName,
    constructionStatus,
    initialDate,
    finalDate,
  ]);

  const sortedProjectsPaginated = useMemo(() => {
    const sortedItems = [...filteredProjects];
    if (
      sortConfig &&
      [
        "cus_name",
        "prj_name",
        "prj_start_date",
        "prj_end_date",
        "prj_status",
        "prj_contract_value",
        "prj_category",
        "prj_area",
        "stg_name",
      ].includes(sortConfig.key)
    ) {
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
        {isSorted ? (isAsc ? "↓" : "↑") : "↓"}
      </span>
    );
  };

  const [isDivVisible, setIsDivVisible] = useState(true);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleShowDeleteModal = (itemId) => {
    setSelectedItemId(itemId);
    setDeleteModalInfo(true);
  };

  const handleDeleteItem = () => {
    const updatedProjects = projects.filter(
      (projeto) => projeto.id !== selectedItemId
    );
    setProjects(updatedProjects);
    setDeleteModalInfo(false);
  };

  const [loading, setLoading] = useState(true);

  const fetchProjectsData = async () => {
    try {
      const response = await api.get("projects-info");
      setProjects(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      if (error.message == "Network Error") toast.error(`Servidor inacessível`);
      else {
        toast.error(`${error.response.data.message}`);
      }
    }
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
    setTotalItems(projects.length);
  }, [projects]);

  useEffect(() => {
    fetchProjectsData();
  }, []);

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
              <p className="text-black font-semibold text-sm 2xl:text-base">
                Data de Início
              </p>
              <div
                className="px-2 py-1 flex justify-between items-center text-center gap-1 flex-row font-medium border min-w-[200px]"
                onClick={() => setShowInitialDatePicker(!showInitialDatePicker)}
              >
                <p className="text-gray-500 text-sm 2xl:text-base">
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
              <p className="text-black font-semibold text-sm 2xl:text-base">
                Data de Finalização
              </p>
              <div
                className="px-2 py-1 flex justify-between items-center text-center gap-1 flex-row font-medium border min-w-[200px]"
                onClick={() => setShowFinalDatePicker(!showFinalDatePicker)}
              >
                <p className="text-gray-500 text-sm 2xl:text-base">
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
              <p className="text-black font-semibold text-sm 2xl:text-base">
                Status da Obra
              </p>
              <select
                value={constructionStatus}
                onChange={(e) => setConstructionStatus(e.target.value)}
                className="px-2 py-1 text-left font-medium border min-w-[200px] bg-white text-gray-600 text-sm 2xl:text-base"
              >
                <option value="Selecione">Selecione</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Em andamento">Em andamento</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center align-middle items-center gap-2">
            <Button
              className="flex flex-row items-center gap-2 h-10 bg-blue-600 hover:bg-blue-800 rounded text-white text-sm"
              onClick={handleModalAddConstruction}
            >
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
              className="text-xs 2xl:text-sm min-w-[280px] 2xl:max-w-[320px]"
            />
            <SearchBar
              placeholder="Procure pelo Nome da Obra"
              onSearchTermChange={handleSearchConstructionClient}
              className="text-xs 2xl:text-sm min-w-[280px] 2xl:max-w-[320px]"
            />
            <SearchBar
              placeholder="Procure pela Categoria"
              onSearchTermChange={handleSearchCategoryClient}
              className="text-xs 2xl:text-sm max-w-[240px] 2xl:max-w-[320px]"
            />
          </div>
          <div
            onClick={toggleDivVisibility}
            className="bg-gray-300 flex items-center justify-center align-middle gap-2 rounded px-3 text-center cursor-pointer hover:bg-gray-400"
          >
            {isDivVisible === true ? (
              <MdKeyboardDoubleArrowUp size={25} />
            ) : (
              <MdKeyboardDoubleArrowDown size={25} />
            )}
            Filtros
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] flex flex-col h-[70vh] w-full justify-between p-3 gap-4 rounded">
        {loading === true ? (
          <div className="loader-container flex items-center justify-center align-middle h-full">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="darkblue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("cus_name")}
                  >
                    CLIENTE
                    <SortIcon
                      isSorted={sortConfig?.key === "cus_name"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_name")}
                  >
                    OBRA
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_name"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_start_date")}
                  >
                    DATA INICIO
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_start_date"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_end_date")}
                  >
                    DATA FIM
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_end_date"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_status")}
                  >
                    STATUS
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_status"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_contract_value")}
                  >
                    CONTRATO $
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_contract_value"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_category")}
                  >
                    CATEGORIA
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_category"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("prj_area")}
                  >
                    ÁREA
                    <SortIcon
                      isSorted={sortConfig?.key === "prj_area"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer text-xs 2xl:text-sm whitespace-nowrap"
                    onClick={() => requestSort("stg_name")}
                  >
                    ETAPA ATUAL
                    <SortIcon
                      isSorted={sortConfig?.key === "stg_name"}
                      isAsc={sortConfig?.direction === "asc"}
                    />
                  </th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {sortedProjectsPaginated.map((projeto) => {
                  const contract_value_divided =
                    projeto.prj_contract_value / 100;
                  const area_divided = projeto.prj_area / 100;

                  return (
                    <tr key={projeto.prj_id}>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {projeto.cus_name}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {projeto.prj_name}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {new Date(projeto.prj_start_date).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {new Date(projeto.prj_end_date).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 min-w-[150px] border-b text-xs 2xl:text-sm">
                        {projeto.prj_status &&
                          projeto.prj_status === "Em andamento" && (
                            <Pill status="Em andamento" title="Em andamento" />
                          )}
                        {projeto.prj_status &&
                          projeto.prj_status === "Finalizado" && (
                            <Pill status="Finalizado" title="Finalizado" />
                          )}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        R$:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                        }).format(contract_value_divided)}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {projeto.prj_category}
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {area_divided} m²
                      </td>
                      <td className="px-2 py-1 2xl:px-4 2xl:py-2 border-b text-xs 2xl:text-sm">
                        {projeto.stg_name}
                      </td>
                      <td className="border-b text-xs 2xl:text-sm">
                        <FaEdit
                          size={19}
                          className="cursor-pointer"
                          onClick={() => handleModalEditConstruction(projeto)}
                        />
                      </td>
                      <td className="border-b text-xs 2xl:text-sm">
                        <IoTrashBin
                          size={19}
                          className="cursor-pointer"
                          onClick={() => handleShowDeleteModal(projeto.prj_id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex flex-row gap-2 items-center justify-end">
          <select
            className="border p-1 rounded text-sm bg-white"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {[10, 20, 40].map((size) => (
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
      <ModalAddConstruction modalInfo={modalInfo} setModalInfo={setModalInfo} />
      <ModalEditConstruction
        modalInfo={modalEdit}
        setModalInfo={setModalEdit}
        data={projectSelected}
      />
      <ModalDeleteRegister
        modalInfo={deleteModalInfo}
        setModalInfo={setDeleteModalInfo}
        onDeleteConfirm={handleDeleteItem}
      />
    </div>
  );
}
