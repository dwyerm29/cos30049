import React from "react";
import homebg from "../images/homebg.jpg";
export default function HomeGrid() {
  return (
    <div className="w-full h-screen">
      <img
        className="top-24 left-0 w-full h-screen object-cover"
        src={homebg}
        alt=""
      />
      <div className="bg-black/50 absolute top-24 left-0 w-full h-screen" />
      <div className="absolute top-24 h-full flex flex-col justify-center items-center text-white w-screen mt-auto">
        <div className="md:left-[10%] max-w-[1100px] m-auto absolute p-4">
          <p>BUY NFT's</p>
          <h1 className="font-bold text-4xl md:text-7xl drop-shadow-2xl">
            GlowWave
          </h1>
          <p className="max-w-[600px] drop-shadow-2xl py-2 text-xl">
            Buy, Sell, Search for the greatest NFTs through GlowWave
          </p>
        </div>
      </div>
    </div>
  );
}
