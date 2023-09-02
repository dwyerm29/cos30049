import React from "react";
import homebg from "../images/homebg.jpg";
export default function AboutGrid() {
  return (
    <div className="w-full h-screen">
      <img
        className="top-14 left-0 w-full h-screen object-cover"
        src={homebg}
        alt=""
      />
      <div className="bg-black/50 absolute top-24 left-0 w-full h-screen" />
      <div className="absolute top-14 h-full flex text-white  mt-auto">
        <div className="md:left-[10%] max-w-[1100px] m-auto  p-4 min-w-min">
          <h1 className="font-bold text-2xl md:text-7xl drop-shadow-2xl">
            About
          </h1>
          <p className="text-xs pt-2 sm:text-base">
            GlowWave is a NFT buy, search, sell company designed for all
            different types of users. It is designed to be eye catching and
            different from traditional NFT selling websites.
          </p>
          <p className="text-xs pt-1 sm:text-base">
            It has been created by Swinburne University of Technology Students
            for the class COS30049 - Mikayla Dwyer(s103943292), Alex
            Nikiolov(s100595852), Zac Ryder (s103643806)
          </p>
          <p className="text-l pt-2 sm:text-base">References:</p>
          <p className="text-xs sm:text-base">
            Photo by Alexander Ant:
            https://www.pexels.com/photo/colorful-mix-of-neon-paints-swirling-on-black-surface-4585185/
            Photo by Ryutaro Tsukata:
            https://www.pexels.com/photo/moon-jellyfish-floating-in-water-5472598/
            Photo by Maria Eduarda Loura Magalhães :
            https://www.pexels.com/photo/artistic-woman-with-painted-face-in-uv-light-4856662/
            https://unsplash.com/photos/7wBFsHWQDlk?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
          </p>
        </div>
      </div>
    </div>
  );
}
