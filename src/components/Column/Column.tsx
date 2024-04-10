import React from "react";
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
  const { issues } = useStore();


  const getColumnIssues = () => {
    if (columnTitle === "To Do") {
      return issues.filter(
        (issue) => issue.state === "open" && issue.assignee === null
      );
    } else if (columnTitle === "In Progress") {
      return issues.filter(
        (issue) => issue.state === "open" && issue.assignee !== null
      );
    } else {
      return issues.filter((issue) => issue.state === "closed");
    }
  };

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
