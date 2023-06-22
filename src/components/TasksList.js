import React, { useEffect, useState } from "react";

//hours of work to numbers of sessions
const modeLevels = {
  easy: {
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 4,
    7: 5,
    8: 5,
  },
  medium: {
    2: 2,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
  },
  hard: {
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 3,
    7: 3,
    8: 3,
  },
};
const breakDurations = {
  easy: 60,
  medium: 30,
  hard: 10,
};
const TasksList = ({ mode, hours, generated, setGenerated }) => {
  const [plan, setPlan] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [inProgressIndex, setInProgressIndex] = useState(0);

  useEffect(() => {
    setClickedIndices([]);
    setInProgressIndex(0);
    const workSessions = modeLevels[mode.toLowerCase()][hours];
    const workDuration = (hours * 60) / workSessions;
    const breakDuration = breakDurations[mode.toLowerCase()];
    const currentPlan = [];
    for (let i = 0; i < workSessions; i++) {
      currentPlan.push({
        type: "work",
        hours: Math.floor(workDuration / 60),
        minutes: workDuration % 60,
      });
      if (i < workSessions - 1) {
        currentPlan.push({
          type: "break",
          hours: Math.floor(breakDuration / 60),
          minutes: breakDuration % 60,
        });
      }
    }

    setPlan(currentPlan);
    setGenerated(false);
  }, [generated]);
  const handleClick = (index) => {
    if (inProgressIndex === index) {
      setClickedIndices((prevClickedIndices) => [...prevClickedIndices, index]);
      setInProgressIndex(index + 1);
    }
  };

  //ai
  useEffect(() => {
    const storedSmth = localStorage.getItem("plan");
    if (storedSmth) {
      setPlan(JSON.parse(storedSmth));
    }

    const storedClickedIndices = localStorage.getItem("clickedIndices");
    if (storedClickedIndices) {
      setClickedIndices(JSON.parse(storedClickedIndices));
    }

    const storedInProgressIndex = localStorage.getItem("inProgressIndex");
    if (storedInProgressIndex) {
      setInProgressIndex(JSON.parse(storedInProgressIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("clickedIndices", JSON.stringify(clickedIndices));
  }, [clickedIndices]);

  useEffect(() => {
    localStorage.setItem("inProgressIndex", JSON.stringify(inProgressIndex));
  }, [inProgressIndex]);

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {plan.map((item, index) => {
        return (
          <div
            disabled={index !== inProgressIndex}
            onClick={() => handleClick(index)}
            key={`${item.type}-${item.duration}-${index}`}
            className={`disabled:hover-none w-52 h-52 duration-300 flex justify-center  items-center m-2  duration-150 text-center rounded-md shadow-md border border-black border-opacity-25 ${
              clickedIndices.includes(index)
                ? "bg-green-400 cursor-default"
                : inProgressIndex === index
                ? "bg-yellow-400 hover:brightness-95 cursor-pointer"
                : "bg-slate-200 cursor-default"
            }`}
          >
            <div
              className={`w-52 ${
                index < inProgressIndex ? "bg-slate-600 bg-opacity-20" : ""
              }`}
            >
              {" "}
              {item.hours > 0 && item.hours + " Hours "}
              {item.minutes > 0 && item.minutes + " Minutes "}
              {item.type}
              <div>
                {inProgressIndex === index
                  ? "(inprogress)"
                  : inProgressIndex > index
                  ? "(Finished)"
                  : "(Incomplete)"}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TasksList;
