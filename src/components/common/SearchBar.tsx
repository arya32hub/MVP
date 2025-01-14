import { ComponentType, PropsWithChildren } from "react";
import { Button } from ".";
import { Icons } from "..";

interface IProps {
  placeHolder: string;
}

interface ISearchButton {
  SearchButton: ComponentType;
}
const SearchFieldBase: React.FC<IProps & ISearchButton> = ({
  placeHolder,
  SearchButton,
}) => {
  return (
    <div className="flex-3 ml-2 flex flex-1 flex-row items-center rounded-2xl border-[1px] border-gray-200 pl-4">
      <input
        className="text-black bg-white flex-1 px-4 py-2 focus:outline-none"
        type="text"
        placeholder={placeHolder}
      />
      <SearchButton />
    </div>
  );
};

const MainBlue: React.FC<IProps> = ({ placeHolder }) => {
  const SeaarchButton = () => (
    <Button.PrimaryBig className="mr-[6px] flex w-[92px] flex-row justify-center rounded-[10px]">
      <Icons.RightArrow.White />
    </Button.PrimaryBig>
  );
  return (
    <SearchFieldBase placeHolder={placeHolder} SearchButton={SeaarchButton} />
  );
};

const MountainLake: React.FC<IProps> = ({ placeHolder }) => {
  const SeaarchButton = () => (
    <Button.PrimaryBigLight className="mr-[6px] w-[92px] items-center justify-center rounded-[10px] px-[38px] py-4">
      <Icons.RightArrow.Tornado />
    </Button.PrimaryBigLight>
  );
  return (
    <SearchFieldBase placeHolder={placeHolder} SearchButton={SeaarchButton} />
  );
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
      className={`bg-white flex flex-col rounded-2xl p-2 shadow-md ${className}`}
    >
      <div className="flex flex-row">{children}</div>
      {Footer !== undefined ? <Footer /> : <></>}
    </div>
  );
};

export { Container, MainBlue, MountainLake };
