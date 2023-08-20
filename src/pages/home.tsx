import { Card } from "@/components/card";
import billsToPay from "@/assets/icons/contasapagar.svg";
import billsToReceive from "@/assets/icons/contasareceber.svg";
import PayCheck from "@/assets/icons/folhasdepagamento.svg";

const birthdayDayUsers = [
  {
    id: 1,
    name: "Lucas Oliveira",
    age: 31,
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    name: "Caio Silva",
    age: 36,
    img: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  },
  {
    id: 3,
    name: "Caetano Borges",
    age: 40,
    img: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];
const birthdayMonthUsers = [
  {
    id: 1,
    name: "Valéria Maria",
    birthday: "27/07/2023",
    img: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    name: "Caio Silva",
    birthday: "27/07/2023",
    img: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
  },
  {
    id: 3,
    name: "Bruna Oliveira de Nóbrega",
    birthday: "27/07/2023",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
];

export function Home() {
  return (
    <div className="flex h-full p-2">
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-around gap-2">
          <Card>
            <div className="flex flex-row p-4">
              <div>
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

          <Card>
            <div className="flex flex-row p-4">
              <div>
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

          <Card>
            <div className="flex flex-row p-4">
              <div>
                <p className="text-sm font-medium mb-7 mr-4">
                  Folhas de Pagamento em Aberto
                </p>
                <p className="text-[#FF5D02] text-4xl">15</p>
              </div>
              <img src={PayCheck} alt="Contas a Pagar" height={50} width={50} />
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-3 pl-2">
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
                    <p className="font-light text-xs text-[#343439] ">{user.age} anos</p>
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
                   <p className="font-light text-xs text-[#343439] ">{user.birthday}</p>
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
