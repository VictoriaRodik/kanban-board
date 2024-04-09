import React from "react";
import { Input, Button, Flex } from "antd";
import { useStore } from "../../store";

interface InputBlockProps {
  onLoadIssues: () => void;
  setRepoURL: (url: string) => void;
}

const InputBlock: React.FC<InputBlockProps> = ({
  onLoadIssues,
  setRepoURL,
}) => {
  const { repoURL } = useStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoURL(event.target.value);
  };

  const handleLoadIssuesClick = () => {
    onLoadIssues();
  };

  return (
    <>
      <Flex gap="small">
        <Input placeholder="Enter Repo URL" onChange={handleInputChange} />
        <Button type="primary" onClick={handleLoadIssuesClick}>
          Load Issues
        </Button>
      </Flex>
      <Button
        type="link"
        block
        href={`https://github.com/${repoURL.split("/")[3]}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Owner Profile
      </Button>
      <Button
        type="link"
        block
        href={repoURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Repository
      </Button>
    </>
  );
};

export default InputBlock;
