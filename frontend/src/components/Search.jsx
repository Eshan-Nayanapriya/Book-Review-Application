import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  return (
    <div className="w-full bg-slate-100 border overflow-hidden min-w-[300px] lg:min-w-[420px] rounded-lg h-8 flex items-center text-neutral-500 relative">
      <div className="flex justify-center items-center h-full p-3 ">
      <div>
        <TypeAnimation
          sequence={[
            'Search  "Gulliver\'s Travels"',
            1000,
            'Search  "Robinson Crusoe"',
            1000,
            'Search  "Jane Eyre"',
            1000,
            'Search  "Moby-Dick"',
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
      <button className="absolute right-3 h-full flex items-center">
        <BiSearchAlt />
      </button>
      </div>
    </div>
  );
};

export default Search;
