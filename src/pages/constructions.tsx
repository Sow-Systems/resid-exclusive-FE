import SearchBar from "@/components/searchBar";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { CiClock2 } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full items-center p-3">
      <div className="bg-[#FFFFFF] flex flex-col w-full justify-between p-3 pb-6 gap-4 rounded">
        <div className="flex flex-row justify-between">
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
          <div>Adicionar Obra</div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <SearchBar placeholder="Procure pelo Nome do Cliente" />
            <SearchBar placeholder="Procure pelo Nome da Obra" />
            <SearchBar placeholder="Procure pela Categoria" />
          </div>
          <div className="bg-gray-300 flex items-center justify-center align-middle gap-2 rounded px-3 text-center cursor-pointer hover:bg-gray-400">
            <MdKeyboardDoubleArrowUp size={25} />
            Filtros
          </div>
        </div>
      </div>
    </div>
  );
}
