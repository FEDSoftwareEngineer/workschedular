import React from "react";
import Tips from "./components/Tips";
import Configuration from "./components/Configuration";
import TasksList from "./components/TasksList";
import { useState } from "react";

const App = () => {
  const [hours, setHours] = useState(2);
  const [mode, setMode] = useState("Easy");
  const [generated, setGenerated] = useState(false);

  return (
    <div className="container m-auto flex flex-col justify-center items-center mb-8">
      <Tips />
      <Configuration
        mode={mode}
        hours={hours}
        setGenerated={setGenerated}
        setHours={setHours}
        setMode={setMode}
      />
      <TasksList
        mode={mode}
        hours={hours}
        generated={generated}
        setGenerated={setGenerated}
      />
    </div>
  );
};

export default App;
