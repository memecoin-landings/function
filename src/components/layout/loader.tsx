"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  createTimeline,
  utils,
} from "animejs";
import Cookies from "js-cookie";

export default function Loader() {
  const loaderBgRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaderBg = loaderBgRef.current;
    const loaderBar = loaderBarRef.current;

    if (!loaderBg) return;
    if (!loaderBar) return;

    const loaderAnim = animate(loaderBar, {
      x: `100vw`,
      easing: "easeInOut",
      duration: 3000,
      innerHTML: {
        to: '100', modifier: utils.roundPad(0)
      },
    });

    createTimeline()
      .add(loaderBg, { opacity: [0, 1], duration: 10, easing: "easeOutQuad" })
      .sync(loaderAnim)
      .add(loaderBg, {
        opacity: [1, 0],
        duration: 1000,
        delay: 500,
      })
      .then(() => {
        loaderBg.hidden = true;
        Cookies.set("showedLoaderOnce", "true", { expires: 7, path: "/" });
      });
  });
  if (Cookies.get("showedLoaderOnce") === "false") return null;
  return (
    <div
      ref={loaderBgRef}
      id="loader"
      className="opacity-0 z-500 fixed flex items-center justify-center inset-0 bg-black"
    >
      <div
        ref={loaderBarRef}
        id="loader-bar"
        className="fixed transform translate-x-[-100vw] w-screen bg-[#FF3F1A] h-screen font-bold text-[100px] flex items-center justify-end"
      >
        <span className="value ">{`ƒ (${0}%)`}</span>
      </div>
    </div>
  );
}
