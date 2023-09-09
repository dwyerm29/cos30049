import React from "react";
import homebg from "../images/homebg.jpg";
import { Container } from "@mui/material";

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
          <ul className="text-xs sm:text-base">
            <li>
              Colorful mix of neon paints swirling on black surface by Alexander
              Ant:
              https://www.pexels.com/photo/colorful-mix-of-neon-paints-swirling-on-black-surface-4585185/
            </li>
            <li>
              Photo by Ryutaro Tsukata:
              https://www.pexels.com/photo/moon-jellyfish-floating-in-water-5472598/
            </li>
            <li>
              Photo by Maria Eduarda Loura Magalhães:
              https://www.pexels.com/photo/artistic-woman-with-painted-face-in-uv-light-4856662/
            </li>
            <li>
              https://unsplash.com/photos/7wBFsHWQDlk?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
            </li>
            <li>
              A Pair of Purple Jellyfishes Floating Underwater by Twiggy Jia:
              https://www.pexels.com/photo/a-pair-of-purple-jellyfishes-floating-underwater-8601366/
            </li>
            <li>
              Pink and Black Illustration by Anni Roenkae:
              https://www.pexels.com/photo/pink-and-black-illustration-3109816/
            </li>
            <li>
              Pink and Multicolored Abstract Painting by Dids:
              https://www.pexels.com/photo/pink-and-multicolored-abstract-painting-2911544/
            </li>
            <li>
              Bright painted abstract background with flow effect and spots by
              Damir Mijailovic:
              https://www.pexels.com/photo/bright-painted-abstract-background-with-flow-effect-and-spots-3651579/
            </li>
            <li>
              Faceless person standing with glowing neon threads on shoulders by
              Marlene Leppänen:
              https://www.pexels.com/photo/faceless-person-standing-with-glowing-neon-threads-on-shoulders-5621016/
            </li>
            <li>
              Code Projected Over Woman by ThisIsEngineering:
              https://www.pexels.com/photo/code-projected-over-woman-3861969/
            </li>
            <li>
              Green Orchid Plant by Julia Sakelli:
              https://www.pexels.com/photo/monochrome-photography-of-a-chimpanzee-605223/
            </li>
            <li>
              Yellow Rose by Anthony:
              https://www.pexels.com/photo/yellow-rose-133472/
            </li>
            <li>
              White Rose by Pixabay Pixabay:
              https://www.pexels.com/photo/white-rose-160916/
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
