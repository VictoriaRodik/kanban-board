import React from "react";
import "./App.css";
import Board from "./components/Board/Board";
import InputBlock from "./components/InputBlock/InputBlock";
import { useStore } from "../zustand/store";
import { fetchIssues } from "../services/issue-service";


const App: React.FC = () => {
  const { repoURL, setRepoURL, setIssues } = useStore();

  const handleLoadIssues = async () => {
    try {
      const data = await fetchIssues(repoURL);
      
      setIssues(data);
    } catch (error) {
      console.error("Error loading issues:", error);
    }
  };


  return (
    <>
      <InputBlock onLoadIssues={handleLoadIssues} setRepoURL={setRepoURL} />
      <Board />
    </>
  );
};

export default App;
