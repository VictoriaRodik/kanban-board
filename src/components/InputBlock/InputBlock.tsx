import React from "react";
import { Input, Button, Flex } from "antd";
import { useStore } from "../../store";
import { styles } from "./InputBlock.styles";

interface InputBlockProps {
  onLoadIssues: () => void;
  setRepoURL: (url: string) => void;
}

const InputBlock: React.FC<InputBlockProps> = ({
  onLoadIssues,
  setRepoURL,
}) => {
  const { repoURL } = useStore();
  const [owner, repo] = repoURL.split("/").slice(3);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoURL(event.target.value);
  };

  const handleLoadIssuesClick = () => {
    onLoadIssues();
  };

  return (
    <Flex vertical style={styles.inputBlockContainer}>
      <Flex gap="small">
        <Input placeholder="Enter Repo URL" onChange={handleInputChange} />
        <Button type="primary" onClick={handleLoadIssuesClick}>
          Load Issues
        </Button>
      </Flex>
      <Flex justify="flex-start" style={styles.linksContainer}>
        <Button
          type="link"
          href={`https://github.com/${repoURL.split("/")[3]}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textAlign: "left", width: "auto" }}
        >
          {owner}
        </Button>
        <Button type="link" style={{ border: "none" }}>
          {repoURL && ">"}
        </Button>
        <Button
          type="link"
          href={repoURL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textAlign: "left" }}
        >
          {repo}
        </Button>
      </Flex>
    </Flex>
  );
};

export default InputBlock;
