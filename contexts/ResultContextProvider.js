import React, { useState, createContext, useContext } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

function ResultContextProvider({ children }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-proxy-location": "EU",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY,
      },
    });
    const data = await response.json();

    if (type.includes("/news")) setResults(data.entries);
    else if (type.includes("/images")) setResults(data.image_results);
    else setResults(data.results);

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider value={{ results, getResults, isLoading }}>
      {children}
    </ResultContext.Provider>
  );
}

export default ResultContextProvider;

export const useResultContext = () => useContext(ResultContext);
