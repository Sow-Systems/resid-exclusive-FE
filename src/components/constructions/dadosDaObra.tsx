import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../button";
import { CiFloppyDisk } from "react-icons/ci";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { ProjectData } from "@/types/projects";
import { toast } from "react-toastify";
import { api } from "@/utils/api";
import { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";

type DadosDaObraProps = {
  data?: {
    prj_id?: number;
  };
};

export function DadosdaObra({ data = {} }: DadosDaObraProps) {
  const { prj_id } = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ProjectData>();

  const saveNewProject = async (data: ProjectData) => {
    console.log("Iniciando envio do projeto", data);
    try {
      const response = await api.post("project", data);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      if (error.message == "Network Error") toast.error(`Servidor inacessível`);
      else {
        toast.error(`${error.response.data.message}`);
      }
    }
  };

  const editData = async () => {
    if (prj_id != undefined) {
      try {
        const response = await api.get(`project/${prj_id}`);
        console.log("Carregou a bagaça", response);
      } catch (error: any) {
        console.log(error);
        if (error.message == "Network Error")
          toast.error(`Servidor inacessível`);
        else {
          toast.error(`${error.response.data.message}`);
        }
      }
    } else {
      return console.log("Não tem nadika");
    }
  };

  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");

  const calculateDuration = () => {
    if (!startDateValue || !endDateValue) {
      return 0;
    }
    const start = new Date(startDateValue);
    const end = new Date(endDateValue);
    const months =
      end.getMonth() -
      start.getMonth() +
      12 * (end.getFullYear() - start.getFullYear());
    return months > 0 ? months : 0;
  };

  const duration = calculateDuration();
  const durationText = duration === 1 ? "Mês" : "Meses";

  const onSubmit = (data: ProjectData) => {
    console.log(data);
    data.area = Number(data.area);
    data.address.number = Number(data.address.number);

    if (typeof data.contractValue === "string") {
      const cleanedValue = data.contractValue
        .replace(/[R$\.,]/g, "")
        .replace(/,/g, ".");
      data.contractValue = parseFloat(cleanedValue);
    } else if (typeof data.contractValue === "number") {
      data.contractValue = data.contractValue * 100;
    } else {
      data.contractValue = 0;
    }

    data.area = Number(data.area) * 100;

    if (data.startDate) {
      const startDate = new Date(data.startDate);
      data.startDate = format(startDate, "yyyy-MM-dd");
    }
    if (data.endDate) {
      const endDate = new Date(data.endDate);
      data.endDate = format(endDate, "yyyy-MM-dd");
    }

    saveNewProject(data);
  };

  useEffect(() => {
    editData();
  }, [prj_id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-x-auto">
      <div className="flex flex-col h-full overflow-x-auto">
          {/* Primeira parte */}
          <div className="flex flex-col bg-white m-1 rounded-sm text-xs 2xl:text-sm ">
            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-8 flex flex-col">
                Nome da obra
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: Edificio Marina"
                  {...register("projectName", { required: true })}
                />
                {errors.projectName && (
                  <span className="text-red-700">Campo obrigatório</span>
                )}
              </div>
              <div className="col-span-2 flex flex-col">
                Área total
                <input
                  type="number"
                  step="any"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: 600 m²"
                  {...register("area")}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Status
                <select
                  className="border text-gray-700 bg-white rounded p-1"
                  {...register("status")}
                >
                  <option value="Em andamento">Em andamento</option>
                  <option value="Aguardando Doc.">Aguardando Doc.</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-4 flex flex-col">
                Categoria
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="Obra de grande porte"
                  {...register("category")}
                />
              </div>
              <div className="col-span-4 flex flex-col">
                Tipo de Contrato
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="Administração"
                  // value={category}
                  // onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="col-span-4 flex flex-col">
                Valor do Contrato
                <Controller
                  name="contractValue"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <CurrencyInput
                      id="contract-value-input"
                      name="contractValue"
                      placeholder="R$ 0,00"
                      decimalsLimit={2}
                      decimalSeparator=","
                      groupSeparator="."
                      prefix="R$ "
                      value={value}
                      onValueChange={(value) => {
                        onChange(value);
                      }}
                      className="border text-gray-700 rounded p-1"
                      ref={ref}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-4 flex flex-col">
                Responsável Técnico
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 "
                  placeholder="ex: Seu Jorge"
                  {...register("technicalLeadName")}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                ART
                <input
                  type="number"
                  className="border text-gray-700 rounded p-1 "
                  placeholder="ex: 123456789"
                  {...register("art")}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Data de Início
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      className="w-full p-1 text-center text-xs 2xl:text-sm border rounded"
                      locale="pt-BR"
                      placeholderText="ex: 29/04/2022"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value ? new Date(field.value) : null}
                    />
                  )}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Data de Finalização
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      className="w-full p-1 text-center text-xs 2xl:text-sm border rounded"
                      locale="pt-BR"
                      placeholderText="ex: 01/05/2023"
                      minDate={
                        watch("startDate")
                          ? new Date(watch("startDate"))
                          : undefined
                      }
                      onChange={(date) => field.onChange(date)}
                      selected={field.value ? new Date(field.value) : null}
                    />
                  )}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Duração
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: 12 meses"
                  value={`${duration} ${durationText}`}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 px-4 py-2 2xl:p-4">
              <div className="col-span-4 flex flex-col">
                Arquiteto
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="ex: Joseph Silva"
                  {...register("architectName")}
                />
              </div>
              <div className="col-span-4 flex flex-col">
                RRT
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="ex: 123456789"
                  {...register("rrt")}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                Mestre de Obras
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1 w-full"
                  placeholder="ex: Alberto de Souza"
                  {...register("foremanName")}
                />
              </div>
              <div className="col-span-2 flex flex-col">
                CNO
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: 123456789"
                  {...register("cno")}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 px-4 py-2 2xl:p-4  h-auto min-h-0">
              <div className="flex flex-col w-full">
                Observações
                <textarea
                  className="border text-gray-700 rounded p-1"
                  rows={3}
                  placeholder="Complete com as observações..."
                  {...register("observations")}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Segunda parte */}

          <div className="flex flex-col bg-white mx-1 my-1 rounded-sm text-xs 2xl:text-sm ">
            <div className="flex flex-row gap-2 px-4 py-2 2xl:p-4  justify-between">
              <div className="flex flex-col w-2/4">
                Endereço
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: Rua Salgado Correia"
                  {...register("address.street")}
                />
              </div>
              <div className="flex flex-col w-1/4">
                Nº
                <input
                  type="number"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: 600 m²"
                  {...register("address.number")}
                />
              </div>
              <div className="flex flex-col w-1/4">
                Complemento
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="Em andamento"
                  {...register("address.complement")}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 px-4 py-2 2xl:p-4  justify-between">
              <div className="flex flex-col w-2/4">
                Bairro
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: Campos Elisios"
                  {...register("address.neighborhood")}
                />
              </div>
              <div className="flex flex-col w-1/4">
                CEP
                <Controller
                  name="address.postalCode"
                  control={control}
                  render={({ field }) => (
                    <InputMask
                      mask="99999-999"
                      maskChar=""
                      value={field.value}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/-/g, "");
                        field.onChange(parseInt(onlyNums, 10));
                      }}
                      className="border text-gray-700 rounded p-1"
                      placeholder="ex: 14055-550"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-1/4">
                Cidade
                <input
                  type="text"
                  className="border text-gray-700 rounded p-1"
                  placeholder="ex: Ribeirão Preto"
                  {...register("address.city")}
                />
              </div>
            </div>
          </div>
      </div>
        <div className="flex flex-col bg-white mx-1 my-1 rounded-sm">
          <div className="flex flex-row gap-2 p-1 justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-800 text-white flex flex-row gap-3"
              type="submit"
            >
              <CiFloppyDisk size={20} />
              Salvar
            </Button>
          </div>
        </div>
    </form>
  );
}
