import React from "react";
import { BallTriangle } from "react-loader-spinner";
function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-transparent flex justify-center items-center z-50">
      <BallTriangle visible color="#4fa94d" width={150} height={150} />
    </div>
  );
}

export default Loading;
