import avatarTemplate from "@/assets/images/avatar.svg";
import bell from "@/assets/icons/bell.svg";

export function Header() {
  return (
    <header className="h-16 xl:h-20 flex flex-row justify-end p-8 text-white">
      <div className="flex flex-row justify-center align-middle items-center gap-10">
        <div>
          <p className="text-base xl:text-lg text-[#D6D2C4] font-bold leading-7">
            Elienai Ivana Thayanne Naiara
          </p>
          <p className="text-right text-[#8FCAB9] text-sm">
            24 Julho 2023 | 11:59
          </p>
        </div>

        <div className=" border-r pr-8">
          <div className="relative cursor-pointer hover:opacity-50">
            <img src={bell} height={30} width={30} alt="" />
            <div className="bg-red-600 w-2 h-2 rounded-full absolute top-0 right-1"></div>
          </div>
        </div>

        <div className="cursor-pointer hover:opacity-50">
          <img src={avatarTemplate} alt="" className="w-11 xl:w-16" />
        </div>
      </div>
    </header>
  );
}
