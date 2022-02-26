import React from "react";
import { Navbar, Results } from "../components";

function Layout({
  children,
  language,
  setLanguage,
  handleLanguage,
  links,
  current,
  setCurrent,
  input,
  setInput,
}) {
  return (
    <div>
      <header>
        <Navbar
          language={language}
          setLanguage={setLanguage}
          handleLanguage={handleLanguage}
          links={links}
          current={current}
          setCurrent={setCurrent}
          input={input}
          setInput={setInput}
        />
      </header>
      <main>
        <div>
          {children} <Results input={input} />
        </div>
      </main>
    </div>
  );
}

export default Layout;
