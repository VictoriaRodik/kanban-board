import React, {useEffect} from "react";
import { Droppable } from "react-beautiful-dnd";
import IssueCard from "../IssueCard/IssueCard";
import { useStore } from "../../store";
import { styles } from "./Column.styles";
import { List, Typography } from "antd";

interface Props {
  columnTitle: string;
  columnId: string;
}

const Column: React.FC<Props> = ({ columnTitle, columnId }) => {
  const { issues, setIssues } = useStore();


  const getColumnIssues = () => {
    if (columnId === "1") {
      return issues.filter(
        (issue) => issue.state === "open" && issue.assignee === null
      );
    } else if (columnId === "2") {
      return issues.filter(
        (issue) => issue.state === "open" && issue.assignee !== null
      );
    } else {
      return issues.filter((issue) => issue.state === "closed");
    }
  };

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
    <Droppable droppableId={columnId.toString()}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <List
            style={styles.columnContainer}
            header={
              <Typography.Title level={4} style={styles.columnTitle}>
                {columnTitle}
              </Typography.Title>
            }
            dataSource={getColumnIssues()}
            renderItem={(issue, index) => (
              <List.Item>
                <IssueCard key={issue.id} issue={issue} index={index} />
              </List.Item>
            )}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
