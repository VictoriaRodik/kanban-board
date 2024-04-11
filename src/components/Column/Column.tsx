import React, { useEffect, useState } from "react";
import { Issue } from "../../store";
import { Droppable, Draggable, DroppableProvided, DraggableProvided } from "react-beautiful-dnd";
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
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const filtered = issues.filter((issue) => {
      if (columnId === "1") {
        return issue.state === "open" && issue.assignee === null;
      } else if (columnId === "2") {
        return issue.state === "open" && issue.assignee !== null;
      } else {
        return issue.state === "closed";
      }
    });

    setFilteredIssues(filtered);
  }, [columnId, issues]);

  useEffect(() => {
    sessionStorage.setItem('issues', JSON.stringify(issues));
  }, [issues]);

  return (
    <Droppable droppableId={columnId} >
      {(provided: DroppableProvided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <List
            style={styles.columnContainer}
            header={
              <Typography.Title level={4} style={styles.columnTitle}>
                {columnTitle}
              </Typography.Title>
            }
            dataSource={filteredIssues}
            renderItem={(issue, index) => (
              <Draggable
              draggableId={issue.id.toString()}
              index={index}
              key={issue.id.toString()}
            >
              {(provided: DraggableProvided) => ( 
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <IssueCard issue={issue} />
                  <p>{columnId}</p>
                  <p>{issue.id.toString()}</p>
                </div>
              )}
            </Draggable>
          )}
        />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
  );
};

export default Column;
