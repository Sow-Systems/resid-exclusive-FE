type ProjectData = {
  id: string;
  etapa: string;
  tipoMaoDeObra: string;
  especialidade: string;
  valor: number;
  dataInicio: Date;
  dataFim: Date;
};

export const dadosMockados: ProjectData[] = [
  {
    id: "1",
    etapa: "Acabamento",
    tipoMaoDeObra: "Funcionários",
    especialidade: "",
    valor: 50000.00,
    dataInicio: new Date("2023-05-29"),
    dataFim: new Date("2024-01-29"),
  },
  {
    id: "2",
    etapa: "Acabamento",
    tipoMaoDeObra: "Terceirizada",
    especialidade: "Pintor",
    valor: 50000.00,
    dataInicio: new Date("2023-05-29"),
    dataFim: new Date("2024-01-29"),
  },
  {
    id: "3",
    etapa: "Acabamento",
    tipoMaoDeObra: "Funcionários",
    especialidade: "",
    valor: 50000.00,
    dataInicio: new Date("2023-09-29"),
    dataFim: new Date("2023-10-29"),
  },
  {
    id: "4",
    etapa: "Fundação",
    tipoMaoDeObra: "Terceirizada",
    especialidade: "Carpinteiro",
    valor: 50000.00,
    dataInicio: new Date("2023-05-29"),
    dataFim: new Date("2024-01-29"),
  },
  {
    id: "5",
    etapa: "Alvenaria",
    tipoMaoDeObra: "Funcionários",
    especialidade: "",
    valor: 50000.00,
    dataInicio: new Date("2023-07-29"),
    dataFim: new Date("2023-10-29"),
  },
  {
    id: "6",
    etapa: "Viga Baldrame",
    tipoMaoDeObra: "Terceirizada",
    especialidade: "Pintor",
    valor: 35000.00,
    dataInicio: new Date("2023-05-29"),
    dataFim: new Date("2024-01-29"),
  },
  {
    id: "7",
    etapa: "Acabamento",
    tipoMaoDeObra: "Funcionários",
    especialidade: "",
    valor: 50000.00,
    dataInicio: new Date("2023-07-29"),
    dataFim: new Date("2023-10-29"),
  },
  {
    id: "8",
    etapa: "Muro",
    tipoMaoDeObra: "Terceirizada",
    especialidade: "Carpinteiro",
    valor: 20000.00,
    dataInicio: new Date("2023-05-29"),
    dataFim: new Date("2024-01-29"),
  },
  {
    id: "9",
    etapa: "Viga Baldrame",
    tipoMaoDeObra: "Terceirizada",
    especialidade: "Carpinteiro",
    valor: 10000.00,
    dataInicio: new Date("2023-07-29"),
    dataFim: new Date("2023-10-29"),
  },
];
