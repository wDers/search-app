import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { Footer } from "../components";
import { CgMenuGridO } from "react-icons/cg";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useDebounce } from "use-debounce";

export default function Home({
  language,
  setLanguage,
  handleLanguage,
  links,
  input,
  setInput,
  isOpen,
  setIsOpen,
  current,
  setCurrent,
}) {
  const [debouncedValue] = useDebounce(input, 300);

  useEffect(() => {
    if (debouncedValue) setInput(debouncedValue);
  }, [debouncedValue]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Router.push("/search");
    }
  };

  return (
    <div className="h-screen min-w-[250px] bg-primary">
      <header>
        <div className="py-5 flex flex-row justify-between align-center items-center md:pr-10 md:pb-20">
          <div className="flex items-center">
            <span className="bg-secondary text-white px-6 py-1.5 rounded-r-xl cursor-default select-none md:text-lg lg:text-xl">
              {handleLanguage("Search", "Keresés")}
            </span>
            <button
              className="w-[25px] h-[25px] flex justify-center items-center p-1 relative right-2 bg-white rounded-full md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <CgMenuGridO />
            </button>
            <a
              href="https://github.com/wDers"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <button className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]">
                <img src="/avatar.jpg" alt="Avatar" className="rounded-full" />
              </button>
            </a>
          </div>
          <a
            href="https://github.com/wDers/search-app"
            target="_blank"
            rel="noreferrer"
            className="h-7 flex items-center mx-3 px-4 border rounded-full text-white text-xs font-semibold md:text-base md:font-normal transition duration-200 ease transform hover:scale-110"
          >
            {handleLanguage("Source", "Forrás")}
          </a>
        </div>
      </header>
      <main>
        <section>
          <div className="flex justify-center xl:mt-16">
            <div className="w-3/4 bg-white drop-shadow-xl md:max-w-md lg:max-w-xl xl:max-w-2xl">
              <div className="h-16 bg-gradient-to-t from-[#1e67ea] to-[#0f95f2] flex justify-center items-center py-2.5 text-white text-2xl font-semibold md:h-24 md:text-4xl lg:h-28 lg:text-5xl xl:h-32">
                {handleLanguage("Search", "Keresés")}
              </div>
              <input
                className="w-full py-1 px-2 outline-none md:py-1.5 lg:py-2"
                value={input}
                type="text"
                placeholder={handleLanguage(
                  "Enter something ...",
                  "írjon be valamit ..."
                )}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="w-screen flex justify-center mt-6">
            <div className="flex flex-row gap-4">
              <Link href={input.length > 1 ? current : "/"}>
                <button
                  className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full text-primary drop-shadow-xl transition duration-200 ease transform hover:-translate-y-1 md:w-[45px] md:h-[45px] xl:w-[50px] xl:h-[50px]"
                  onClick={() => setIsOpen(false)}
                >
                  <FaSearch className="w-[15px] h-[15px]" />
                </button>
              </Link>
              <button className="w-[40px] h-[40px] flex justify-center items-center bg-gradient-to-t from-[#1e67ea] to-[#0f95f2] rounded-full text-white drop-shadow-xl transition duration-200 ease transform hover:-translate-y-1 md:w-[45px] md:h-[45px] xl:w-[50px] xl:h-[50px]">
                <FaMicrophone />
              </button>
            </div>
          </div>
        </section>
        {isOpen ? (
          <aside>
            <div className="flex justify-center mt-10 animate__heartBeat">
              <div className="w-1/5 max-w-[576px] h-40 bg-secondary drop-shadow-xl md:mt-8 md:w-2/5 md:h-14 md:px-10 xl:px-20">
                <div className="h-full flex flex-col justify-between items-center py-3 text-primary md:flex-row md:py-0">
                  {links.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(link.url)}
                      className={current === link.url ? "text-white" : null}
                    >
                      {link.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        ) : null}
      </main>
      <footer>
        <Footer
          language={language}
          setLanguage={setLanguage}
          handleLanguage={handleLanguage}
        />
      </footer>
    </div>
  );
}
