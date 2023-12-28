import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";
import { CiFloppyDisk } from "react-icons/ci";
import { useState } from "react";

export function DadosdaObra() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <div className="flex flex-col bg-white m-2 rounded-sm">
        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-4/5">
            Nome da obra
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Edificio Marina"
            />
          </div>
          <div className="flex flex-col w-1/5">
            Área total
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 600 m²"
            />
          </div>
          <div className="flex flex-col w-1/5">
            Status
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Em andamento"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-1/3">
            Categoria
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Obra de grande porte"
            />
          </div>
          <div className="flex flex-col w-1/3">
            Tipo de Contrato
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Administração"
            />
          </div>
          <div className="flex flex-col w-1/3">
            Valor do Contrato
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="R$: 3.500.000,00"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col">
            Responsável Técnico
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Seu Jorge"
            />
          </div>
          <div className="flex flex-col">
            ART
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 123456789"
            />
          </div>
          <div className="flex flex-col">
            Data de Início
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              dateFormat="dd/MM/yyyy"
              className="w-32 p-[6px] text-center text-sm border rounded"
              locale="pt-BR"
            />
          </div>
          <div className="flex flex-col">
            Data de Início
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date!)}
              dateFormat="dd/MM/yyyy"
              className="w-32 p-[6px] text-center text-sm border rounded"
              minDate={startDate}
              locale="pt-BR"
            />
          </div>
          <div className="flex flex-col">
            Duração
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 12 meses"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-1/3">
            Arquiteto
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Joseph Silva"
            />
          </div>
          <div className="flex flex-col w-1/3">
            RRT
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 123456789"
            />
          </div>
          <div className="flex flex-col w-1/3">
            Mestre de Obras
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Alberto de Souza"
            />
          </div>
          <div className="flex flex-col w-1/3">
            CNO
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 123456789"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-full">
            Observações
            <textarea
              className="border text-gray-700 rounded p-1"
              rows={2}
              placeholder="Complete com as observações..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white m-2 rounded-sm">
        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-2/4">
            Endereço
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Rua Salgado Correia"
            />
          </div>
          <div className="flex flex-col w-1/4">
            Nº
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 600 m²"
            />
          </div>
          <div className="flex flex-col w-1/4">
            Complemento
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Em andamento"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-2/4">
            Bairro
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Campos Elisios"
            />
          </div>
          <div className="flex flex-col w-1/4">
            CEP
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: 14055-550"
            />
          </div>
          <div className="flex flex-col w-1/4">
            Cidade
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Ribeirão Preto"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white m-2 rounded-sm">
        <div className="flex flex-row gap-2 p-3 justify-end">
          <Button className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3">
            <CiFloppyDisk size={20} />
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}