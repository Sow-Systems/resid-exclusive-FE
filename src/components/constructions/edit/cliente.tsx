import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../button";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { CiFloppyDisk } from "react-icons/ci";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Select from "react-select";

import { useEffect, useState } from "react";
import { ModalDeleteRegister } from "../../modalDeleteRegister";
import { ModalSaveRegister } from "../../modalSaveRegister";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

type ClientState = {
  birthdate: Date | null;
  name: string;
  type: string;
  cpf: string;
  cnpj: string;
  email: string;
  phone: string;
  notes: string;
};

export function Cliente({ data }: any) {
  console.log(data.prj_id);
  const [deleteModalInfo, setDeleteModalInfo] = useState(false);

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

  const [birthDateContact, setBirthDateContact] = useState<Date | null>(null);

  const initialClientState: ClientState = {
    idProject: 1,
    birthdate: null,
    name: "",
    type: "",
    cpf: "",
    cnpj: "",
    email: "",
    phone: "",
    notes: "",
  };

  const [client, setClient] = useState<ClientState>(initialClientState);
  const [isNewClient, setIsNewClient] = useState(false);
  const [clientSelected, setClientSelected] = useState<string | null>(null);

  const [allClients, setAllClients] = useState([]);

  const getAllClients = async () => {
    try {
      const response = await api.get("project-customers");
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

  const handleAddClient = async (event: any) => {
    event.preventDefault();
    console.log("Adicionando", client);
  };

  useEffect(() => {
    getAllClients();
    setClientSelected(null);
  }, []);

  const handleClientSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      console.log(selectedValue);

      if (selectedValue === null) {
        setClientSelected(null);
        setIsNewClient(true);
        setClient(initialClientState);
      } else if (selectedValue === "Novo Cliente") {
        setClientSelected("Novo Cliente");
        setIsNewClient(true);
      } else {
        setClientSelected(selectedValue);
        setIsNewClient(false);

        const selectedClient = allClients.find(
          (c) => c.cus_id.toString() === selectedValue
        );

        if (selectedClient) {
          const birthDate = selectedClient.cus_birthdate
            ? new Date(selectedClient.cus_birthdate)
            : null;

          setClient({
            birthdate: birthDate,
            name: selectedClient.cus_name,
            type: selectedClient.cus_type!,
            cpf: selectedClient.cus_cpf || "",
            cnpj: selectedClient.cus_cnpj || "",
            email: selectedClient.cus_email || "",
            phone: selectedClient.cus_phone || "",
            notes: "",
          });
        }
      }
    }
  };

  const getSelectOptions = () => {
    if (allClients.length === 0) {
      return [{ value: null, label: "Novo Cliente" }];
    }

    const options = allClients.map((client) => ({
      value: client.cus_id.toString(),
      label: client.cus_name,
    }));

    options.unshift({ value: null, label: "Novo Cliente" });

    return options;
  };

  const getClientName = (clientId: string | null) => {
    if (clientId === null) {
      return "Novo Cliente";
    }

    const selectedClient = allClients.find(
      (c) => c.cus_id.toString() === clientId
    );
    return selectedClient ? selectedClient.cus_name : "";
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
              <div className="col-span-2 flex flex-col justify-center">
                <Select
                  value={
                    clientSelected !== null
                      ? {
                          value: clientSelected,
                          label: getClientName(clientSelected),
                        }
                      : null
                  }
                  onChange={handleClientSelectChange}
                  options={getSelectOptions()}
                  isSearchable
                  placeholder="Novo Cliente"
                  getOptionLabel={(option: any) => option.label}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      // width: "150px",
                      height: "20px",
                    }),
                  }}
                />
              </div>
              <div className="col-span-4 flex flex-col">
                Nome do Cliente
                <input
                  type="text"
                  disabled={!isNewClient && clientSelected !== null}
                  value={client.name}
                  onChange={(e) => updateClientField("name", e.target.value)}
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: Joao Alves"
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Data de Nascimento
                <DatePicker
                  selected={client.birthdate}
                  onChange={(date: Date | null) =>
                    updateClientField("birthdate", date)
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-1 text-center text-xs 2xl:text-sm border rounded"
                  locale="pt-BR"
                  placeholderText="ex: 29/04/1992"
                  disabled={!isNewClient && clientSelected !== null}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Tipo
                <input
                  type="text"
                  disabled={!isNewClient && clientSelected !== null}
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
                  disabled={!isNewClient && clientSelected !== null}
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
                  disabled={!isNewClient && clientSelected !== null}
                  value={client.cnpj}
                  onChange={(e) => updateClientField("cnpj", e.target.value)}
                />
              </div>
              <div className="col-span-3 flex flex-col">
                E-mail
                <input
                  type="email"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="ex: cliente@cliente.com.br"
                  disabled={!isNewClient && clientSelected !== null}
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
                  disabled={!isNewClient && clientSelected !== null}
                  value={client.phone}
                  onChange={(e) => updateClientField("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 p-4 justify-between">
              <div className="flex flex-col w-full">
                Observações
                <textarea
                  disabled={!isNewClient && clientSelected !== null}
                  value={client.cus_notes}
                  onChange={(e) =>
                    updateClientField("notes", e.target.value)
                  }
                  className="border text-gray-700 rounded p-1"
                  rows={2}
                  placeholder="Complete com as observações..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Segunda parte */}

          {clientSelected !== null ? (
            <>
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
                    <MdOutlineArrowBackIos size={12} color={"gray"} />
                  </div>
                  <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
                    <MdOutlineArrowForwardIos size={12} color={"gray"} />
                  </div>
                </div>
              </div>

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
                    <MdOutlineArrowBackIos size={12} color={"gray"} />
                  </div>
                  <div className="p-1 rounded-md border-2 border-gray-400 hover:bg-gray-100 cursor-pointer">
                    <MdOutlineArrowForwardIos size={12} color={"gray"} />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Terceira parte */}

        <div className="flex flex-col bg-white m-1 rounded-sm">
          <div className="flex flex-row gap-2 p-1 justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3"
              onClick={handleAddClient}
            >
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
