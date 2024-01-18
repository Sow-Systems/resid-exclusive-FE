import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { CiFloppyDisk } from "react-icons/ci";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { useEffect, useState } from "react";
import { ModalDeleteRegister } from "../modalDeleteRegister";
import { ModalSaveRegister } from "../modalSaveRegister";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

type ClientInfo = {
  id: number;
  selected?: boolean;
  name: string;
  birthDate?: Date;
  type?: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
};

type ClientState = {
  birthDateClient: Date | null;
  name: string;
  type: string;
  cpf: string;
  cnpj: string;
  email: string;
  phone: string;
  observations: string;
};

type ClienteProps = {
  id: number | null;
};

export function Cliente({ id }: ClienteProps) {
  const [deleteModalInfo, setDeleteModalInfo] = useState(false);

  console.log("Id do new project:", id);

  const handleModalRemoveRegister = () => {
    setDeleteModalInfo(true);
  };

  const [saveModalInfo, setSaveModalInfo] = useState(false);

  const handleModalSaveRegister = () => {
    setSaveModalInfo(true);
  };

  const handleDeleteItem = () => {
    setDeleteModalInfo(false);
  };

  const [clients] = useState<ClientInfo[]>([
    {
      id: 1,
      name: "Jorge",
      birthDate: new Date("1985-05-05"),
      type: "Pessoa Jurídica",
      cpf: "123.135.456-08",
      cnpj: "01.12.456/0001-01",
      email: "jorge@email.com",
      phone: "(16) 98956-5656",
    },
    {
      id: 2,
      name: "Luis",
      birthDate: new Date("1989-05-05"),
      type: "Pessoa Física",
      cpf: "987.654.321-00",
      email: "luis@email.com",
      phone: "(16) 94561-7890",
    },
    {
      id: 3,
      name: "Augusto",
      birthDate: new Date("1980-05-05"),
      type: "Pessoa Física",
      cpf: "456.789.123-55",
      email: "augusto@email.com",
      phone: "(16) 91234-5678",
    },
  ]);

  const [birthDateContact, setBirthDateContact] = useState<Date | null>(null);

  const initialClientState: ClientState = {
    birthDateClient: null,
    name: "",
    type: "",
    cpf: "",
    cnpj: "",
    email: "",
    phone: "",
    observations: "",
  };

  const [client, setClient] = useState<ClientState>(initialClientState);
  const [isNewClient, setIsNewClient] = useState(false);
  const [clientSelected, setClientSelected] = useState<string>("");

  const handleNewClientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setIsNewClient(isChecked);
    if (isChecked) {
      setClientSelected("");
      setClient(initialClientState);
    }
  };

  const [allClients, setAllClients] = useState([]);

  const getAllClients = async () => {
    try {
      const response = await api.get("project/customers");
      console.log(response);
      setAllClients(response.data);
    } catch (error: any) {
      console.log(error);
      if (error.message == "Network Error") toast.error(`Servidor inacessível`);
      else {
        toast.error(`${error.response.data.message}`);
      }
    }
  };

  console.log("os clientes", allClients);

  useEffect(() => {
    getAllClients();
  }, []);

  const handleClientSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedClientId = event.target.value;
    setClientSelected(selectedClientId);
    setIsNewClient(false);

    const selectedClient = clients.find(
      (c) => c.id.toString() === selectedClientId
    );
    if (selectedClient) {
      setClient({
        birthDateClient: new Date(selectedClient.birthDate!),
        name: selectedClient.name,
        type: selectedClient.type!,
        cpf: selectedClient.cpf!,
        cnpj: selectedClient.cnpj!,
        email: selectedClient.email!,
        phone: selectedClient.phone!,
        observations: "",
      });
    }
  };

  const updateClientField = <K extends keyof ClientState>(
    field: K,
    value: ClientState[K]
  ) => {
    setClient((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <form className="flex flex-col h-full overflow-x-auto">
        <div className="flex flex-col h-full overflow-x-auto">
          {/* Primeira parte */}

          <div className="flex flex-col bg-white mx-1 my-1 rounded-sm text-xs 2xl:text-sm ">
            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-2 flex flex-col">
                Cliente
                <select
                  value={clientSelected}
                  onChange={handleClientSelectChange}
                  disabled={isNewClient}
                  className="p-[2px] text-left font-medium border bg-white text-gray-600"
                >
                  <option value="" className="text-gray-500">
                    Selecione
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id.toString()}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex flex-row text-center justify-around align-middle items-center">
                Novo Cliente
                <input
                  type="checkbox"
                  checked={isNewClient}
                  onChange={handleNewClientChange}
                  className="border text-gray-700 rounded p-1"
                />
              </div>
              <div className="col-span-4 flex flex-col">
                Nome do Cliente
                <input
                  type="text"
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.name}
                  onChange={(e) => updateClientField("name", e.target.value)}
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: Edificio Marina"
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Data de Nascimento
                <DatePicker
                  selected={client.birthDateClient}
                  onChange={(date: Date | null) =>
                    updateClientField("birthDateClient", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-1 text-center text-xs 2xl:text-sm border rounded"
                  locale="pt-BR"
                  placeholderText="ex: 29/04/1992"
                  disabled={!isNewClient && clientSelected !== ""}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Tipo
                <input
                  type="text"
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.type}
                  onChange={(e) => updateClientField("type", e.target.value)}
                  className="border text-gray-700 rounded p-1"
                  placeholder="Pessoa Jurídica"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-3 flex flex-col">
                CPF
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="123.135.456-08"
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.cpf}
                  onChange={(e) => updateClientField("cpf", e.target.value)}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                CNPJ
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="01.12.456/0001-01"
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.cnpj}
                  onChange={(e) => updateClientField("cnpj", e.target.value)}
                />
              </div>
              <div className="col-span-3 flex flex-col">
                E-mail
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="ex: cliente@cliente.com.br"
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.email}
                  onChange={(e) => updateClientField("email", e.target.value)}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Celular
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="(16) 98956-5656"
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.phone}
                  onChange={(e) => updateClientField("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 p-4 justify-between">
              <div className="flex flex-col w-full">
                Observações
                <textarea
                  disabled={!isNewClient && clientSelected !== ""}
                  value={client.observations}
                  onChange={(e) =>
                    updateClientField("observations", e.target.value)
                  }
                  className="border text-gray-700 rounded p-1"
                  rows={2}
                  placeholder="Complete com as observações..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Segunda parte */}

          <div className="flex flex-col bg-white mx-1 my-1 rounded-sm text-xs 2xl:text-sm ">
            <div className="mb-1 mt-3 ml-4 flex flex-row justify-between">
              <p className="font-semibold">Contatos</p>
              <div className="flex flex-row mr-5 gap-2">
                <div className="p-2 rounded-lg  bg-gray-500 hover:bg-gray-700 cursor-pointer">
                  <GoPencil size={15} color={"white"} />
                </div>
                <div
                  className="p-2 rounded-lg  bg-red-500 hover:bg-red-700 cursor-pointer"
                  onClick={handleModalRemoveRegister}
                >
                  <FaRegTrashAlt size={15} color={"white"} />
                </div>
                <div className="p-2 rounded-lg  bg-green-800 hover:bg-green-700 cursor-pointer">
                  <FiPlus size={15} color={"white"} />
                </div>
                <div
                  className="p-2 rounded-lg  bg-blue-700 hover:bg-blue-900 cursor-pointer"
                  onClick={handleModalSaveRegister}
                >
                  <CiFloppyDisk size={15} color={"white"} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-2 flex flex-col">
                Descrição
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="Recados"
                />
              </div>
              <div className="col-span-3 flex flex-col">
                Nome
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="Gilberto Barros"
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Data de Nascimento
                <DatePicker
                  selected={birthDateContact}
                  onChange={(date) => setBirthDateContact(date!)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-1 text-center text-xs 2xl:text-sm  border rounded"
                  locale="pt-BR"
                  placeholderText="ex: 29/04/1992"
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Telefone
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="(16) 98956-5656"
                />
              </div>
              <div className="col-span-3 flex flex-col">
                E-mail
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="ex: cliente@cliente.com.br"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2 mb-2 mr-3 ">
              <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
                <MdOutlineArrowBackIos size={15} color={"gray"} />
              </div>
              <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
                <MdOutlineArrowForwardIos size={15} color={"gray"} />
              </div>
            </div>
          </div>

          {/* Terceira parte */}

          <div className="flex flex-col bg-white mx-1 my-1 rounded-sm text-xs 2xl:text-sm ">
            <div className="mb-1 mt-3 ml-4 flex flex-row justify-between">
              <p className="font-semibold">Endereços</p>
              <div className="flex flex-row mr-5 gap-2">
                <div className="p-2 rounded-lg  bg-gray-500 hover:bg-gray-700 cursor-pointer">
                  <GoPencil size={15} color={"white"} />
                </div>
                <div className="p-2 rounded-lg  bg-red-500 hover:bg-red-700 cursor-pointer">
                  <FaRegTrashAlt
                    size={15}
                    color={"white"}
                    onClick={handleModalRemoveRegister}
                  />
                </div>
                <div className="p-2 rounded-lg  bg-green-800 hover:bg-green-700 cursor-pointer">
                  <FiPlus size={15} color={"white"} />
                </div>
                <div
                  className="p-2 rounded-lg  bg-blue-700 hover:bg-blue-900 cursor-pointer"
                  onClick={handleModalSaveRegister}
                >
                  <CiFloppyDisk size={15} color={"white"} />
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
                  className="border text-gray-700 rounded p-1 w-52"
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
                <MdOutlineArrowBackIos size={15} color={"gray"} />
              </div>
              <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
                <MdOutlineArrowForwardIos size={15} color={"gray"} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white m-1 rounded-sm">
          <div className="flex flex-row gap-2 p-1 justify-end">
            <Button className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3">
              <CiFloppyDisk size={20} />
              Salvar
            </Button>
          </div>
        </div>
      </form>
      <ModalDeleteRegister
        modalInfo={deleteModalInfo}
        setModalInfo={setDeleteModalInfo}
        onDeleteConfirm={handleDeleteItem}
      />
      <ModalSaveRegister
        modalInfo={saveModalInfo}
        setModalInfo={setSaveModalInfo}
      />
    </>
  );
}
