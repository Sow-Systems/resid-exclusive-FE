import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import instagram from "@/assets/icons/instagram.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import youtube from "@/assets/icons/youtube.svg";

const FOOTER_CLASSES = "h-8 w-8 rounded-lg bg-[#E7E6F2] flex items-center justify-center cursor-pointer hover:bg-[#b4b3c4]"

export function Footer() {


  return (
    <footer className="h-20 flex flex-row justify-end p-8 items-center text-white gap-5">
      <h1>By Sow Systems</h1>
      <div className={FOOTER_CLASSES}>
        <img src={facebook} alt="" height={10} width={10} />
      </div>
      <div className={FOOTER_CLASSES}>
        <img src={twitter} alt="" height={15} width={15} />
      </div>
      <div className={FOOTER_CLASSES}>
        <img src={instagram} alt="" height={17} width={17} />
      </div>
      <div className={FOOTER_CLASSES}>
        <img src={linkedin} alt="" height={15} width={15} />
      </div>
      <div className={FOOTER_CLASSES}>
        <img src={youtube} alt="" height={19} width={19} />
      </div>
    </footer>
  );
}
