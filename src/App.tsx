import React from "react";
import "./App.css";
import Column from "./components/Column/Column";
import InputBlock from "./components/InputBlock/InputBlock";
import { useStore } from "./store";
import { fetchIssues } from "./components/services/issue-service";
import { Flex } from "antd";

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
      <Flex gap="small" justify="space-around">
        <Column columnTitle="To Do" />
        <Column columnTitle="In Progress" />
        <Column columnTitle="Done" />
      </Flex>
    </>
  );
};

export default App;
