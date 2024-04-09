import React, { useEffect } from "react";
import IssueCard from "../IssueCard/IssueCard";
import { useStore } from "../../store";
import { styles } from "./Column.styles";
import { List, Typography } from "antd";

interface Props {
  columnTitle: string;
}

const Column: React.FC<Props> = ({ columnTitle }) => {
  const { issues, setIssues } = useStore();

  const toDoIssues = issues.filter(
    (issue) => issue.state === "open" && issue.assignee === null
  );
  const inProgressIssues = issues.filter(
    (issue) => issue.state === "open" && issue.assignee !== null
  );
  const doneDoIssues = issues.filter((issue) => issue.state === "closed");

  useEffect(() => {
    const savedIssues = sessionStorage.getItem('issues');
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }
  }, [setIssues]);

  useEffect(() => {
    sessionStorage.setItem('issues', JSON.stringify(issues));
  }, [issues]);

  return (
    <List
      style={styles.columnContainer}
      header={
        <Typography.Title level={4} style={styles.columnTitle}>
          {columnTitle}
        </Typography.Title>
      }
      dataSource={
        columnTitle === "To Do"
          ? toDoIssues
          : columnTitle === "In Progress"
          ? inProgressIssues
          : doneDoIssues
      }
      renderItem={(issue) => (
        <List.Item>
          <IssueCard key={issue.id} issue={issue} />
        </List.Item>
      )}
    />
  );
};

export default Column;
