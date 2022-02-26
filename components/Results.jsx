import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useResultContext } from "../contexts/ResultContextProvider";
import { Loader } from "../components";

function Results({ input }) {
  const { results, isLoading, getResults } = useResultContext();
  const location = useRouter().pathname;

  useEffect(() => {
    if (input !== "") {
      if (location === "/videos") {
        getResults(`/search/q=${input} videos`);
      } else {
        getResults(`${location}/q=${input}&num=25`);
      }
    }
  }, [location]);

  if (isLoading) return <Loader />;

  // The question marks before the map methods prevent us having an error even if results are empty.

  switch (location) {
    case "/search":
      return (
        <div className="flex flex-wrap gap-4 justify-between mt-2 px-5 md:px-12 lg:px-52">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="w-full group md:w-2/5 ">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm text-primary">
                  {link.length > 25 ? link.substring(0, 25) : link}
                </p>
                <p className="text-lg group-hover:underline">{title}</p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className="p-5 sm:p-3"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap justify-center">
          {results?.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={video.additional_links?.[0].href}
                controls
                width="300px"
                height="175px"
              />
            </div>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap gap-4 justify-between mt-2 px-5 md:px-12 lg:px-52">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="w-full group md:w-2/5 ">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm text-primary">
                  {link.length > 25 ? link.substring(0, 25) : link}
                </p>
                <p className="text-lg group-hover:underline">{title}</p>
              </a>
            </div>
          ))}
        </div>
      );

    default:
      return "Error";
  }
}

export default Results;
