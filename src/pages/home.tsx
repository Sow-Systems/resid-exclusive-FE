import { Card } from "@/components/card";
import billsToPay from "@/assets/icons/contasapagar.svg";
import billsToReceive from "@/assets/icons/contasareceber.svg";
import PayCheck from "@/assets/icons/folhasdepagamento.svg";
import {
  birthdayDayUsers,
  birthdayMonthUsers,
  deliveryAccounts,
  dueAccounts,
} from "@/utils/mock/home";
import { Button } from "@/components/button";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

export function Home() {
  const [sortByFirstTable, setSortByFirstTable] = useState("description");
  const [sortAscFirstTable, setSortAscFirstTable] = useState(true);

  const handleSortFirstTable = (column: string) => {
    if (sortByFirstTable === column) {
      setSortAscFirstTable(!sortAscFirstTable);
    } else {
      setSortByFirstTable(column);
      setSortAscFirstTable(true);
    }
  };

  const sortedDueAccountsFirstTable = [...dueAccounts].sort((a, b) => {
    const compareValueA = a[sortByFirstTable as keyof typeof a];
    const compareValueB = b[sortByFirstTable as keyof typeof b];

    if (
      typeof compareValueA === "string" &&
      typeof compareValueB === "string"
    ) {
      return sortAscFirstTable
        ? compareValueA.localeCompare(compareValueB)
        : compareValueB.localeCompare(compareValueA);
    } else if (
      typeof compareValueA === "number" &&
      typeof compareValueB === "number"
    ) {
      return sortAscFirstTable
        ? compareValueA - compareValueB
        : compareValueB - compareValueA;
    }

    return 0;
  });

  const [sortBySecondTable, setSortBySecondTable] = useState("client");
  const [sortAscSecondTable, setSortAscSecondTable] = useState(true);

  const handleSortSecondTable = (column: string) => {
    if (sortBySecondTable === column) {
      setSortAscSecondTable(!sortAscSecondTable);
    } else {
      setSortBySecondTable(column);
      setSortAscSecondTable(true);
    }
  };

  const sortedDueAccountsSecondTable = [...deliveryAccounts].sort((a, b) => {
    const compareValueA = a[sortBySecondTable as keyof typeof a];
    const compareValueB = b[sortBySecondTable as keyof typeof b];

    if (
      typeof compareValueA === "string" &&
      typeof compareValueB === "string"
    ) {
      return sortAscSecondTable
        ? compareValueA.localeCompare(compareValueB)
        : compareValueB.localeCompare(compareValueA);
    } else if (
      typeof compareValueA === "number" &&
      typeof compareValueB === "number"
    ) {
      return sortAscSecondTable
        ? compareValueA - compareValueB
        : compareValueB - compareValueA;
    }

    return 0;
  });

  return (
    <div className="flex h-full p-5">
      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-row justify-between gap-2">
          <Card className="w-80">
            <div className="flex flex-row p-4 h-full">
              <div className="flex flex-col justify-around">
                <p className="text-sm font-medium mb-7 mr-4">
                  Contas à Pagar Vencidas
                </p>
                <p className="text-[#FF0000] text-4xl">26</p>
              </div>
              <img
                src={billsToPay}
                alt="Contas a Pagar"
                height={50}
                width={50}
              />
            </div>
          </Card>
          <Card className="w-80">
            <div className="flex flex-row p-4  h-full">
            <div className="flex flex-col justify-around">
                <p className="text-sm font-medium mb-7 mr-4">
                  Contas à Receber Pendencias
                </p>
                <p className="text-[#1300E9] text-4xl">5</p>
              </div>
              <img
                src={billsToReceive}
                alt="Contas a Pagar"
                height={50}
                width={50}
              />
            </div>
          </Card>
          <Card className="w-80">
            <div className="flex flex-row p-4">
            <div className="flex flex-col justify-around">
                <p className="text-sm font-medium mb-7 mr-4">
                  Folhas de Pagamento em Aberto
                </p>
                <p className="text-[#FF5D02] text-4xl">15</p>
              </div>
              <img src={PayCheck} alt="Contas a Pagar" height={50} width={50} />
            </div>
          </Card>
        </div>

        <div className="flex flex-row justify-around gap-2 h-[380px]">
          <Card className="w-full overflow-y-auto">
            <p className="text-sm font-medium text-left w-full p-8 items-center">
              Contas à vencer nos próximos 5 dias
            </p>

            <div className="flex w-full">
              <table className="border-collapse w-full ml-3 mr-3">
                <thead className="text-[#64748B] text-sm font-light text-left">
                  <tr>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2 w-1/6"
                      onClick={() => handleSortFirstTable("description")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        DESCRIÇÃO
                        {sortByFirstTable === "description" ? (
                          sortAscFirstTable ? (
                            <BsChevronDown color="black" />
                          ) : (
                            <BsChevronUp color="black" />
                          )
                        ) : (
                          <BsChevronDown />
                        )}
                      </div>
                    </th>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2 w-1/6"
                      onClick={() => handleSortFirstTable("expensesGroup")}
                    >
                      <div className="flex flex-row">
                        <div className="flex flex-row gap-2 items-center">
                          GRUPO DE DESPESA
                          {sortByFirstTable === "expensesGroup" ? (
                            sortAscFirstTable ? (
                              <BsChevronDown color="black" />
                            ) : (
                              <BsChevronUp color="black" />
                            )
                          ) : (
                            <BsChevronDown />
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2"
                      onClick={() => handleSortFirstTable("dueDate")}
                    >
                      <div className="flex flex-row">
                        <div className="flex flex-row gap-2 items-center">
                          DATA DE VENCIMENTO
                          {sortByFirstTable === "dueDate" ? (
                            sortAscFirstTable ? (
                              <BsChevronDown color="black" />
                            ) : (
                              <BsChevronUp color="black" />
                            )
                          ) : (
                            <BsChevronDown />
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="p-2 pl-4">STATUS</th>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2"
                      onClick={() => handleSortFirstTable("value")}
                    >
                      <div className="flex flex-row">
                        <div className="flex flex-row gap-2 items-center">
                          VALOR
                          {sortByFirstTable === "value" ? (
                            sortAscFirstTable ? (
                              <BsChevronDown color="black" />
                            ) : (
                              <BsChevronUp color="black" />
                            )
                          ) : (
                            <BsChevronDown />
                          )}
                        </div>
                      </div>
                    </th>
                    <th className="p-2 pl-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDueAccountsFirstTable.map((conta) => (
                    <tr
                      key={conta.id}
                      className="text-left text-[#191D23] font-normal text-sm"
                    >
                      <td className="border-b border-t p-3">
                        {conta.description}
                      </td>
                      <td className="border-b border-t p-3">
                        {conta.expensesGroup}
                      </td>
                      <td className="border-b border-t p-3">{conta.dueDate}</td>
                      <td className="border-b border-t p-3">
                        <Button className="bg-[#ECFDF5] text-[#FF0000] font-semibold pl-7 pr-7">
                          {conta.status}
                        </Button>
                      </td>
                      <td className="border-b border-t p-3">
                        R${" "}
                        {Number(conta.value).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border-b border-t pt-2 pb-2 text-center">
                        <Button className="bg-green-800 hover:bg-green-600 text-[white] pl-7 pr-7">
                          Pagar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="flex flex-row justify-around gap-2 h-[380px] pb-4">
          <Card className="w-full overflow-y-auto">
            <p className="text-sm font-medium text-left w-full p-8 items-center">
              Recebimentos dos próximos 5 dias
            </p>

            <div className="flex w-full">
              <table className="border-collapse w-full ml-3 mr-3">
                <thead className="text-[#64748B] text-sm font-light text-left">
                  <tr>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2 w-1/6"
                      onClick={() => handleSortSecondTable("client")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                      CLIENTE
                        {sortBySecondTable === "client" ? (
                          sortAscSecondTable ? (
                            <BsChevronDown color="black" />
                          ) : (
                            <BsChevronUp color="black" />
                          )
                        ) : (
                          <BsChevronDown />
                        )}
                      </div>
                    </th>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2 w-1/6"
                      onClick={() => handleSortSecondTable("construction")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                      OBRA
                        {sortBySecondTable === "construction" ? (
                          sortAscSecondTable ? (
                            <BsChevronDown color="black" />
                          ) : (
                            <BsChevronUp color="black" />
                          )
                        ) : (
                          <BsChevronDown />
                        )}
                      </div>
                    </th>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2"
                      onClick={() => handleSortSecondTable("deliveryDate")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                      DATA DO RECEBIMENTO
                        {sortBySecondTable === "deliveryDate" ? (
                          sortAscSecondTable ? (
                            <BsChevronDown color="black" />
                          ) : (
                            <BsChevronUp color="black" />
                          )
                        ) : (
                          <BsChevronDown />
                        )}
                      </div>
                    </th>
                    <th className="p-2 pl-4">STATUS</th>
                    <th
                      className="p-2 pl-4 cursor-pointer items-center gap-2"
                      onClick={() => handleSortSecondTable("value")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                      VALOR
                        {sortBySecondTable === "value" ? (
                          sortAscSecondTable ? (
                            <BsChevronDown color="black" />
                          ) : (
                            <BsChevronUp color="black" />
                          )
                        ) : (
                          <BsChevronDown />
                        )}
                      </div>
                    </th>
                    <th className="p-2 pl-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDueAccountsSecondTable.map((conta) => (
                    <tr
                      key={conta.id}
                      className="text-left text-[#191D23] font-normal text-sm"
                    >
                      <td className="border-b border-t p-3">{conta.client}</td>
                      <td className="border-b border-t p-3">
                        {conta.construction}
                      </td>
                      <td className="border-b border-t p-3">
                        {conta.deliveryDate}
                      </td>
                      <td className="border-b border-t p-3">
                        <Button className="bg-[#ECFDF5] text-[#064E3B] font-semibold pl-7 pr-7">
                          {conta.status}
                        </Button>
                      </td>
                      <td className="border-b border-t p-3">
                        R${" "}
                        {Number(conta.value).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border-b border-t pt-2 pb-2 text-center">
                        <Button className="bg-blue-800 hover:bg-blue-600 text-white pl-7 pr-7">
                          Recebido
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-3 pl-5">
        <div>
          <Card className="w-72 h-80 flex p-4">
            <p className="mb-5 border-b border-black p-2 pb-3 font-bold text-base w-full text-center">
              Aniversáriantes do dia
            </p>
            <div className="flex flex-col justify-start items-start w-full pl-3 overflow-y-auto">
              {birthdayDayUsers.map((user) => (
                <div className="flex flex-row gap-6 mb-2 mt-2">
                  <div>
                    <img
                      src={user.img}
                      alt="Foto do Usuario"
                      className="rounded-full h-10 w-10 object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{user.name}</p>
                    <p className="font-light text-xs text-[#343439] ">
                      {user.age} anos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="h-screen pb-2">
          <Card className="flex p-4 h-full">
            <p className="mb-5 border-b border-black p-2 pb-3 font-bold text-base w-full text-center">
              Aniversáriantes do Mês
            </p>
            <div className="flex flex-col justify-start items-start w-full pl-3 overflow-y-auto">
              {birthdayMonthUsers.map((user) => (
                <div className="flex flex-row gap-6 mb-2 mt-2">
                  <div>
                    <img
                      src={user.img}
                      alt="Foto do Usuario"
                      className="rounded-full h-10 w-10 object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{user.name}</p>
                    <p className="font-light text-xs text-[#343439] ">
                      {user.birthday}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
