import React from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { BiDotsVerticalRounded } from "react-icons/bi";

function Footer({ language, setLanguage, handleLanguage }) {
  const leftSide = [
    { en: "Advertise", hu: "Hírdetés" },
    { en: "Business", hu: "Üzlet" },
    { en: "About", hu: "Névjegy" },
  ];

  const rightSide = [
    { en: "Privacy", hu: "Adatvédelem" },
    { en: "Help", hu: "Segítség" },
    { en: "Terms", hu: "Feltételek" },
  ];

  return (
    <div className="w-screen mt-14 py-3 flex flex-col text-white items-center text-center uppercase md:flex-row md:justify-between md:px-16 md:mt-0 md:absolute md:bottom-10">
      <ul className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-4">
        <li
          className="border rounded-full hover:no-underline mx-2 md:px-2"
          onClick={() =>
            language === "en" ? setLanguage("hu") : setLanguage("en")
          }
        >
          {language}
        </li>
        <li className="flex justify-center mt-2 hover:cursor-auto md:mt-0 md:relative md:right-4">
          <BiDotsVerticalRounded />
        </li>
        {leftSide.map((language, index) => (
          <li className="hover:underline underline-offset-2" key={index}>
            {handleLanguage(language.en, language.hu)}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-4">
        {rightSide.map((language, index) => (
          <li className="hover:underline underline-offset-2" key={index}>
            {handleLanguage(language.en, language.hu)}
          </li>
        ))}
        <li className="flex justify-center md:ml-4">
          <HiQuestionMarkCircle className="w-[25px] h-[25px]" />
        </li>
      </ul>
    </div>
  );
}

export default Footer;
