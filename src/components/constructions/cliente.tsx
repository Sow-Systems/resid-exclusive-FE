import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { CiFloppyDisk } from "react-icons/ci";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { useState } from "react";
import { ModalDeleteRegister } from "../modalDeleteRegister";
import { ModalSaveRegister } from "../modalSaveRegister";

export function Cliente() {
  const [startDate, setStartDate] = useState(new Date());

  const [deleteModalInfo, setDeleteModalInfo] = useState(false);

  const handleModalRemoveRegister = () => {
    setDeleteModalInfo(true);
  };

  const [saveModalInfo, setSaveModalInfo] = useState(false);

  const handleModalSaveRegister = () => {
    setSaveModalInfo(true);
  };

  return (
    <>
      <div className="flex flex-col bg-white mx-2 my-1 rounded-sm">
        <div className="flex flex-row gap-2 pt-4 pl-4 pr-4 justify-between">
          <div className="flex flex-col w-3/5">
            Nome do Cliente
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: Edificio Marina"
            />
          </div>
          <div className="flex flex-col w-1/5 justify-center items-center">
            Data de Nascimento
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              dateFormat="dd/MM/yyyy"
              className="w-44 p-[6px] text-center text-sm border rounded"
              locale="pt-BR"
            />
          </div>
          <div className="flex flex-col w-1/5">
            Tipo
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Pessoa Jurídica"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 pt-4 pl-4 pr-4 justify-between">
          <div className="flex flex-col w-1/3">
            CPF
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="123.135.456-08"
            />
          </div>
          <div className="flex flex-col w-1/3">
            CNPJ
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="01.12.456/0001-01"
            />
          </div>
          <div className="flex flex-col w-1/3">
            E-mail
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: cliente@cliente.com.br"
            />
          </div>
          <div className="flex flex-col w-1/3">
            Celular
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="(16) 98956-5656"
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

      <div className="flex flex-col bg-white mx-2 my-1 rounded-sm">
        <div className="mb-1 mt-3 ml-4 flex flex-row justify-between">
          <p className="font-semibold text-lg">Contatos</p>
          <div className="flex flex-row mr-5 gap-2">
            <div className="p-2 rounded-lg  bg-gray-500 hover:bg-gray-700 cursor-pointer">
              <GoPencil size={20} color={"white"} />
            </div>
            <div
              className="p-2 rounded-lg  bg-red-500 hover:bg-red-700 cursor-pointer"
              onClick={handleModalRemoveRegister}
            >
              <FaRegTrashAlt size={20} color={"white"} />
            </div>
            <div className="p-2 rounded-lg  bg-green-800 hover:bg-green-700 cursor-pointer">
              <FiPlus size={20} color={"white"} />
            </div>
            <div className="p-2 rounded-lg  bg-blue-700 hover:bg-blue-900 cursor-pointer" onClick={handleModalSaveRegister}>
              <CiFloppyDisk size={20} color={"white"} />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col">
            Descrição
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Recados"
            />
          </div>
          <div className="flex flex-col ">
            Nome
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Gilberto Barros"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            Data de Nascimento
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              dateFormat="dd/MM/yyyy"
              className="w-44 p-[6px] text-center text-sm border rounded"
              locale="pt-BR"
            />
          </div>
          <div className="flex flex-col w-36">
            Telefone
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="(16) 98956-5656"
            />
          </div>
          <div className="flex flex-col ">
            E-mail
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="ex: cliente@cliente.com.br"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 mb-2 mr-3 ">
          <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
            <MdOutlineArrowBackIos size={20} color={"gray"} />
          </div>
          <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
            <MdOutlineArrowForwardIos size={20} color={"gray"} />
          </div>
        </div>
      </div>

      {/* Terceira parte */}

      <div className="flex flex-col bg-white mx-2 my-1 rounded-sm">
        <div className="mb-1 mt-3 ml-4 flex flex-row justify-between">
          <p className="font-semibold text-lg">Endereços</p>
          <div className="flex flex-row mr-5 gap-2">
            <div className="p-2 rounded-lg  bg-gray-500 hover:bg-gray-700 cursor-pointer">
              <GoPencil size={20} color={"white"} />
            </div>
            <div className="p-2 rounded-lg  bg-red-500 hover:bg-red-700 cursor-pointer">
              <FaRegTrashAlt size={20} color={"white"} onClick={handleModalRemoveRegister}/>
            </div>
            <div className="p-2 rounded-lg  bg-green-800 hover:bg-green-700 cursor-pointer">
              <FiPlus size={20} color={"white"} />
            </div>
            <div className="p-2 rounded-lg  bg-blue-700 hover:bg-blue-900 cursor-pointer" onClick={handleModalSaveRegister}>
              <CiFloppyDisk size={20} color={"white"} />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 pt-4 pl-4 pr-4 justify-between">
          <div className="flex flex-col">
            Descrição
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Cobranças"
            />
          </div>
          <div className="flex flex-col w-full">
            Nome
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Logradouro"
            />
          </div>
          <div className="flex flex-col w-16">
            Nº
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="123"
            />
          </div>
          <div className="flex flex-col">
            Complemento
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Ao lado do Prédio X"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 p-4 justify-between">
          <div className="flex flex-col w-full">
            Bairro
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Bairro Alamada"
            />
          </div>
          <div className="flex flex-col ">
            CEP
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="14.095-050"
            />
          </div>
          <div className="flex flex-col">
            Cidade
            <input
              type="text"
              className="border text-gray-700 rounded p-1"
              placeholder="Tóquio"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2 mb-2 mr-3 rounded-sm">
          <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
            <MdOutlineArrowBackIos size={20} color={"gray"} />
          </div>
          <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
            <MdOutlineArrowForwardIos size={20} color={"gray"} />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white mx-2 my-1 rounded-sm">
        <div className="flex flex-row gap-2 p-3 justify-end">
          <Button className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3">
            <CiFloppyDisk size={20} />
            Salvar
          </Button>
        </div>
      </div>
      <ModalDeleteRegister modalInfo={deleteModalInfo} setModalInfo={setDeleteModalInfo} />
      <ModalSaveRegister modalInfo={saveModalInfo} setModalInfo={setSaveModalInfo} />

    </>
  );
}
