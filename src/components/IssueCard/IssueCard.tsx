import React from "react";
import { Issue } from "../../../zustand/store";
import { Card, Flex } from "antd";
import { styles } from "./IssueCard.styles";

const IssueCard: React.FC<{ issue: Issue }> = ({ issue }) => {
  const calculateTime = () => {
    const createdDate = new Date(issue.created_at);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const daysElapsed = Math.floor(timeDifference / (1000 * 3600 * 24));
    return `${daysElapsed} days ago`;
  };

  return (
    <Card style={styles.cardContainer} size="small" hoverable>
      <Flex align="start">
        <p style={styles.cardTitle}>{issue.title}</p>
      </Flex>
      <Flex gap="small">
        <p style={styles.cardContent}>#{issue.number}</p>
        <p style={styles.cardContent}>Opened {calculateTime()}</p>
      </Flex>
      <Flex gap="small">
        <p style={styles.cardContent}>{issue.user.login}</p>
        <p style={styles.cardContent}>| Comments: {issue.comments}</p>
      </Flex>
    </Card>
  );
};

export default IssueCard;
