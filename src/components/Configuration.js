import React, { useEffect, useState } from "react";

const hourList = [2, 3, 4, 5, 6, 7, 8];
const ModesList = ["Easy", "Medium", "Hard"];

const Configuration = ({ setMode, mode, setHours, hours, setGenerated }) => {
  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    const storedHours = localStorage.getItem("hours");
    if (storedMode) {
      setMode(storedMode);
    }
    if (storedHours) {
      setHours(parseInt(storedHours));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);
  useEffect(() => {
    localStorage.setItem("hours", hours);
  }, [hours]);
  return (
    <section className="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3 text-center my-9">
      <div>
        <h2 className="text-lg mt-12">Amount Of Hours For Todays Work</h2>
        <select
          className="border border-black rounded-md shadow-md px-2 py-1 bg-sky-400 text-white font-semibold"
          name="workHours"
          id=""
          value={hours}
          onChange={(e) => {
            setHours(e.target.value);
          }}
        >
          {hourList.map((item, index) => {
            return (
              <option key={item + index} value={item}>
                {item} Hours Of Work
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg">Modes</h2>
        {ModesList.map((item, index) => {
          let color;
          if (item === "Easy") {
            color =
              item === mode ? "bg-green-300 hover:none" : "hover:bg-green-200";
          } else if (item === "Medium") {
            color =
              item === mode ? "bg-blue-300 hover:none" : "hover:bg-blue-200";
          } else {
            color =
              item === mode ? "bg-red-300 hover:none" : "hover:bg-red-200";
          }
          return (
            <button
              key={`${item}-${index}`}
              className={color}
              onClick={() => {
                setMode(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="my-12">
        <h2>Generate a plan based on the current setting</h2>
        <button
          onClick={() => setGenerated(true)}
          className="w-62 h-12 bg-green-600 hover:bg-green-500 text-white mt-5"
        >
          ⚙️ Generate
        </button>
      </div>
    </section>
  );
};

export default Configuration;
