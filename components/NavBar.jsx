import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useResultContext } from "../contexts/ResultContextProvider";
import { FaSearch } from "react-icons/fa";
import { BsGlobe, BsWrench } from "react-icons/bs";
import { IoLanguageSharp } from "react-icons/io5";
import { MdOutlineFingerprint } from "react-icons/md";

function Navbar({
  language,
  setLanguage,
  handleLanguage,
  links,
  current,
  setCurrent,
  input,
  setInput,
}) {
  const { getResults } = useResultContext();

  const languages = [
    { en: "Search", hu: "Keresés" },
    { en: "Images", hu: "Képek" },
    { en: "Videos", hu: "Videók" },
    { en: "News", hu: "Hírek" },
  ];
  const location = useRouter().pathname;

  const handleSearch = () => {
    if (location === "/videos") {
      getResults(`/search/q=${input} videos`);
    } else {
      getResults(`${location}/q=${input}&num=25`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (location === "/videos") {
        getResults(`/search/q=${input} videos`);
      } else {
        getResults(`${location}/q=${input}&num=25`);
      }
    }
  };

  return (
    <nav>
      <div className="w-screen min-w-[250px] h-28 bg-primary flex items-center px-10 lg:h-20">
        <div className="w-full flex flex-col items-center gap-2 md:flex-row md:gap-12">
          <Link href="/">
            <span className="min-w-[120px] text-white text-4xl select-none cursor-pointer md:mb-1.5">
              {handleLanguage("Search", "Keresés")}
            </span>
          </Link>
          <div className="w-full flex justify-center lg:justify-start">
            <input
              className="w-full max-w-xl font-semibold py-1 px-2 outline-none md:py-1.5"
              value={input}
              type="text"
              placeholder={handleLanguage(
                "Enter something ...",
                "írjon be valamit ..."
              )}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="bg-white px-3" onClick={handleSearch}>
              <FaSearch className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
        <button
          className="hidden lg:block lg:mr-4"
          onClick={() =>
            language === "en" ? setLanguage("hu") : setLanguage("en")
          }
        >
          <IoLanguageSharp className="w-[25px] h-[25px] text-white" />
        </button>
        <a href="https://github.com/wDers" target="_blank" rel="noreferrer">
          <button className="hidden select-none lg:block">
            <img
              width="25px"
              height="25px"
              className="rounded-full md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]"
              src="/avatar.jpg"
              alt="Avatar"
            />
          </button>
        </a>
      </div>
      <div className="w-screen min-w-[250px] h-14 bg-white shadow-lg mb-5">
        <div className="h-full flex justify-center items-center gap-12 md:hidden">
          {links.map((link, index) => (
            <Link href={`/${link.url}`} key={index}>
              <button
                onClick={() => setCurrent(link.url) & getResults(location)}
                className={current === link.url ? "text-primary" : null}
              >
                {link.icon}
              </button>
            </Link>
          ))}
        </div>
        <div className="hidden h-full flex text-gray md:block">
          <div className="h-full flex justify-between items-center">
            <div className="flex gap-24 lg:gap-36">
              <div className="flex items-center gap-4 pl-12 lg:pl-0 lg:relative lg:left-14">
                <MdOutlineFingerprint className="w-[25px] h-[25px] text-primary cursor-pointer" />
                <BsGlobe className="w-[21px] h-[21px] cursor-pointer" />
              </div>
              <ul className="flex gap-5 select-none ">
                {links.map((link, index) => (
                  <Link href={link.url} key={index}>
                    <li
                      onClick={() =>
                        setCurrent(link.url) & getResults(location)
                      }
                      className={`flex items-center gap-1.5 ${
                        current === link.url
                          ? "text-primary border-b-[3px]"
                          : null
                      }`}
                    >
                      {link.icon}
                      {languages.map((language) =>
                        language.en.toLowerCase() == link.url
                          ? handleLanguage(language.en, language.hu)
                          : null
                      )}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="p-2 mr-9 cursor-pointer">
              <BsWrench />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
