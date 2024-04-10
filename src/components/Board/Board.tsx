import React from "react";
import Column from "../Column/Column";
import { Flex } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import { useStore } from "../../store";

const assignee = {
  id: 127191734,
  login: "login",
  node_id: "U_kgDOB5TKtg",
  site_admin: false,
  type: "User",
};

const Board: React.FC = () => {
  const { issues, setIssues } = useStore();

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedIssues = [...issues];
    const draggedIssueIndex = updatedIssues.findIndex(
      (issue) => issue.id === draggableId
    );
    console.log(draggedIssueIndex);
    const [draggedIssue] = updatedIssues.splice(draggedIssueIndex, 1);
    const newColumn = destination.droppableId;

    if (newColumn === "2") {
      draggedIssue.assignee = assignee;
    } else if (newColumn === "3") {
      draggedIssue.state = "closed";
    }

    updatedIssues.splice(destination.index, 0, draggedIssue);
    setIssues(updatedIssues);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex gap="small" justify="space-around">
        <Column columnTitle="To Do" columnId="1" />
        <Column columnTitle="In Progress" columnId="2" />
        <Column columnTitle="Done" columnId="3" />
      </Flex>
    </DragDropContext>
  );
};

export default Board;
