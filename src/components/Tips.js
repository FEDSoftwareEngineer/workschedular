import React, { useState, useEffect } from "react";
import tipsData from "../../data/tipsData";

const Tips = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count === 6 ? 0 : count + 1));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return <div className="text-center my-9">💡Tips: {tipsData[count]}</div>;
};
export default Tips;
