import React from "react";
import { Bars } from "react-loader-spinner";

function Loader(props) {
  return (
    <div className="flex justify-center items-center">
      <Bars color="#1E67EA" height={550} width={80} />
    </div>
  );
}

export default Loader;
