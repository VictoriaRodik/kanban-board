import React from "react";
import Column from "../Column/Column";
import { Flex } from "antd";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { useStore } from "../../store";


const assignee = {
  id: 127191734,
};

const columns = [
  { columnId: "1", columnTitle: "To Do" },
  { columnId: "2", columnTitle: "In Progress" },
  { columnId: "3", columnTitle: "Done" },
];

const Board: React.FC = () => {
  const { issues, setIssues } = useStore();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
  
    if (!destination) {
      return;
    }
    console.log(destination)

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    const updatedIssues = [...issues];
  
    const draggedIssueIndex = updatedIssues.findIndex(
      (issue) => issue.id.toString() === draggableId
    );
  
    const [draggedIssue] = updatedIssues.splice(draggedIssueIndex, 1);
  
     const newColumn = destination.droppableId;
  
    if (newColumn === "2") {
      draggedIssue.assignee = assignee;
    } else if (newColumn === "3") {
      draggedIssue.state = "closed";
    }
console.log(draggedIssue);
    updatedIssues.splice(destination.index, 0, draggedIssue);
  
    setIssues(updatedIssues);
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd} >
      <Flex gap="small" justify="space-around">
        {columns.map((column) => (
          <Column
            columnId={column.columnId}
            columnTitle={column.columnTitle}
            key={column.columnId}
          />
        ))}
      </Flex>
    </DragDropContext>
  );
};

export default Board;
