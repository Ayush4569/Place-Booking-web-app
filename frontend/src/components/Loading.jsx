import React from "react";
import { ColorRing,Oval } from "react-loader-spinner";
function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-transparent flex justify-center items-center z-50">
      <ColorRing visible color="#4fa94d" width={200} height={200} />
    </div>
  );
}

export default Loading;
