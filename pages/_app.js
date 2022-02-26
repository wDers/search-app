import Head from "next/head";
import ResultContextProvider from "../contexts/ResultContextProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { FaSearch } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";
import { ImVideoCamera } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import "../styles/global.css";

function MyApp({ Component }) {
  const [language, setLanguage] = useState("en");
  const [input, setInput] = useState("Tobey Maguire");
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("search");

  // In this case where we deal with only 2 languages i could simply use the ternary operator but the reason i made this function is that if we want to introduce a 3rd language, the only place we need to change the code is here and we simply add the new words.

  const handleLanguage = (en, hu) => {
    if (language !== "en") {
      return hu;
    } else return en;
  };

  useEffect(() => {
    if (language === "en") document.title = "Search App";
    else document.title = "Kereső Applikáció";
  }, [handleLanguage]);

  const links = [
    { url: "search", icon: <FaSearch /> },
    { url: "images", icon: <BsCardImage /> },
    { url: "videos", icon: <ImVideoCamera /> },
    { url: "news", icon: <BiNews /> },
  ];

  useEffect(() => {
    links.map((link) =>
      location.pathname === `/${link.url}` ? setCurrent(link.url) : null
    );
  }, []);

  const languageProps = {
    language: language,
    setLanguage: setLanguage,
    handleLanguage: handleLanguage,
    links: links,
  };

  const inputProps = {
    input: input,
    setInput: setInput,
  };

  const searchTypeProps = {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
    current: current,
    setCurrent: setCurrent,
  };

  const router = useRouter();

  return (
    <ResultContextProvider>
      <Head>
        <title>Search App</title>
        <meta name="description" content="Search applikáció" />
        <meta name="author" content="Walek Ders" />
        <meta name="language" content={language} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      {router.pathname === "/" ? (
        <Component {...languageProps} {...inputProps} {...searchTypeProps} />
      ) : (
        <Layout {...languageProps} {...inputProps} {...searchTypeProps}>
          <Component />
        </Layout>
      )}
    </ResultContextProvider>
  );
}

export default MyApp;
