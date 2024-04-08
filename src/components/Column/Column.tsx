import React from "react";
import IssueCard from "../IssueCard/IssueCard";
import { useStore } from "../../store";
import { styles } from "./Column.styles";
import { List, Typography } from "antd";

interface Props {
  columnTitle: string;
}

const Column: React.FC<Props> = ({ columnTitle }) => {
  const { issues } = useStore();

  const filteredIssues = columnTitle === "To Do" ? issues : [];
  
  return (
    <List
      style={styles.columnContainer}
      header={
        <Typography.Title level={4} style={styles.columnTitle}>
          {columnTitle}
        </Typography.Title>
      }
      dataSource={filteredIssues}
      renderItem={(issue) => (
        <List.Item>
          <IssueCard key={issue.id} issue={issue} />
        </List.Item>
      )}
    />
  );
};

export default Column;
