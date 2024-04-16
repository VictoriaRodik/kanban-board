import React from "react";
import { Issue } from "../../../zustand/store";
import { Droppable, Draggable } from "react-beautiful-dnd";
import IssueCard from "../IssueCard/IssueCard";
import { styles } from "./Column.styles";
import { List, Typography } from "antd";

export interface Props {
  columnTitle: string;
  columnId: string;
  filteredIssues: Issue[];
}

const Column: React.FC<Props> = ({ columnTitle, columnId, filteredIssues }) => {
  return (
    <Droppable droppableId={`${columnId}`}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Typography.Title level={4} style={styles.columnTitle}>
            {columnTitle}
          </Typography.Title>
          <List
            size="small"
            style={styles.columnContainer}
            dataSource={filteredIssues}
            renderItem={(issue, index) => (
              <Draggable
                draggableId={`${issue.id}`}
                index={index}
                key={`${issue.id}`}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <IssueCard issue={issue} />
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
