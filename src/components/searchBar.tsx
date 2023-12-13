import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { twJoin } from "tailwind-merge";

interface SearchBarWithIconProps {
  className?: string;
  placeholder?: string;
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarWithIconProps> = ({
  className,
  placeholder = "Pesquisar por nome...",
  onSearchTermChange,
}) => {
  const baseClasses = "border text-black";
  const inputClasses = twJoin("pl-10 pr-3 py-2 rounded text-sm", baseClasses);

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const term = event.target.value;
    onSearchTermChange(term);
  };

  return (
    <div className="relative flex items-center">
      <IoSearchOutline className="absolute left-3 text-gray-500 text-xl" />
      <input
        type="text"
        placeholder={placeholder}
        className={twJoin(inputClasses, className)}
        onChange={handleSearchTermChange}
      />
    </div>
  );
};

export default SearchBar;
