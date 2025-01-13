import { RightArrow } from "@/assets/svg";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface IProps {
  placeHolder: string;
}

interface IColorProps {
  color: string;
}
const SearchFieldBase: React.FC<IProps & IColorProps> = ({
  color,
  placeHolder,
}) => {
  return (
    <div className="flex-3 ml-2 flex flex-1 flex-row items-center rounded-2xl border-[1px] pl-4">
      <input
        className="flex-1 px-4 py-2 text-black focus:outline-none"
        type="text"
        placeholder={placeHolder}
      />
      <div
        className={`m-[6px] flex h-[42px] w-[92px] items-center justify-center rounded-[10px] bg-[${color}]`}
      >
        <Image src={RightArrow} alt={"Search Button"} className="h-6 w-6" />
      </div>
    </div>
  );
};

const MainBlue: React.FC<IProps> = ({ placeHolder }) => {
  return <SearchFieldBase placeHolder={placeHolder} color={"#00236C"} />;
};

const MountainLake: React.FC<IProps> = ({ placeHolder }) => {
  return <SearchFieldBase placeHolder={placeHolder} color={"#87AEEE"} />;
};

type TContainerPros = PropsWithChildren & {
  Footer?: React.FC;
  className?: string;
};

const Container: React.FC<TContainerPros> = ({
  children,
  Footer,
  className,
}) => {
  return (
    <div
      className={`flex flex-col rounded-2xl bg-white p-2 shadow-sm ${className}`}
    >
      <div className="flex flex-row">{children}</div>
      {Footer !== undefined ? <Footer /> : <></>}
    </div>
  );
};

export { Container, MainBlue, MountainLake };
