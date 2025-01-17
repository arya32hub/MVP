"use client";
import React, {
  ComponentType,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from ".";
import { Icons } from "..";

interface IProps {
  placeHolder: string;
  value?: string; // Add value as an optional string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface IOnClick {
  onClick?: (text?: string) => void;
}

interface ISearchButton {
  SearchButton: ComponentType;
}

interface IOnChange {
  onChange?: (text?: string) => void;
}

interface ISetValue {
  value?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchFieldBase: React.FC<
  IProps & ISearchButton & IOnChange & ISetValue
> = ({ placeHolder, SearchButton, onChange, value }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; //
    }
  }, [value]);

  return (
    <div className="flex-3 ml-2 flex flex-1 flex-row items-center rounded-2xl border-[1px] border-gray-200 bg-white pl-4 transition-all duration-200 ease-in-out focus-within:scale-105 focus-within:shadow-md hover:scale-105 hover:shadow-md">
      <textarea
        className="flex-1 resize-none bg-white px-4 py-2 text-black focus:outline-none"
        ref={textareaRef}
        placeholder={placeHolder}
        rows={1}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        value={value}
      />
      <SearchButton />
    </div>
  );
};

const MainBlue: React.FC<IProps & IOnClick & ISetValue> = ({
  placeHolder,
  onClick,
  value,
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(value);

  // Sync internal state with external value when it changes
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleClick = () => {
    if (internalValue && onClick) onClick(internalValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && internalValue) {
      handleClick();
    }
  };

  const SeaarchButton = () => (
    <Button.PrimaryBig
      className="mr-[6px] flex w-[92px] flex-row justify-center rounded-[10px]"
      onClick={handleClick}
    >
      <Icons.RightArrow.White />
    </Button.PrimaryBig>
  );

  return (
    <SearchFieldBase
      placeHolder={placeHolder}
      SearchButton={SeaarchButton}
      value={internalValue}
      onChange={setInternalValue} // Update internal state
      onKeyDown={handleKeyDown}
    />
  );
};

const MountainLake: React.FC<IProps & IOnClick & ISetValue> = ({
  placeHolder,
  onClick,
  value,
}) => {
  const [text, setText] = useState<string | undefined>(value);
  const handleClick = () => {
    if (onClick) onClick(text);
  };

  const SeaarchButton = () => (
    <Button.PrimaryBigLight
      className="mr-[6px] w-[92px] items-center justify-center rounded-[10px] px-[38px] py-4"
      onClick={handleClick}
    >
      <Icons.RightArrow.Tornado />
    </Button.PrimaryBigLight>
  );
  return (
    <SearchFieldBase
      placeHolder={placeHolder}
      SearchButton={SeaarchButton}
      value={text}
      onChange={setText}
    />
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
      className={`flex flex-col rounded-2xl bg-white p-2 shadow-md ${className}`}
    >
      <div className="flex flex-row">{children}</div>
      {Footer !== undefined ? <Footer /> : <></>}
    </div>
  );
};

export { Container, MainBlue, MountainLake };