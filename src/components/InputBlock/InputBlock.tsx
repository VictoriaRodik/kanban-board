import React from "react";
import { Input, Button, Flex } from "antd";

interface InputBlockProps {
  onLoadIssues: () => void;
  setRepoURL: (url: string) => void; // Include setRepoURL in the interface
}

const InputBlock: React.FC<InputBlockProps> = ({ onLoadIssues, setRepoURL }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoURL(event.target.value);
  };

  const handleLoadIssuesClick = () => {
    onLoadIssues(); 
  };

  return (
    <>
      <Flex gap="small">
        <Input
          placeholder="Enter Repo URL"
          onChange={handleInputChange}
        />
        <Button type="primary" onClick={handleLoadIssuesClick}>
          Load Issues
        </Button>
      </Flex>
      <Button type="link" block>
        Link
      </Button>
    </>
  );
};

export default InputBlock;
