import React, { useEffect, useState } from "react";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { useStore } from "../../store";
import { Issue } from "../../store";
import { Flex } from "antd";
import Column from "../Column/Column";

const assignee = {
  id: 127191734,
};

const columns = [
  { columnId: "1", columnTitle: "To Do" },
  { columnId: "2", columnTitle: "In Progress" },
  { columnId: "3", columnTitle: "Done" },
];

const Board: React.FC = () => {
  const { issues, setIssues, repoURL } = useStore();
  const [filteredColumns, setFilteredColumns] = useState<{
    [key: string]: Issue[];
  }>({});

  const saveToSessionStorage = (key: string, data: any) => {
    const savedData = sessionStorage.getItem(key);
    if (savedData) {
      sessionStorage.removeItem(key);
    }
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  useEffect(() => {
    const filteredColumnsData = {
      "1": issues.filter(
        (issue) => issue.state === "open" && issue.assignee === null
      ),
      "2": issues.filter(
        (issue) => issue.state === "open" && issue.assignee !== null
      ),
      "3": issues.filter((issue) => issue.state === "closed"),
    };
    setFilteredColumns(filteredColumnsData);
  }, [issues]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const updatedIssues = Array.from(issues);
    const draggedIssue = updatedIssues.find(
      (issue) => issue.id.toString() === draggableId
    );

    if (!draggedIssue) {
      return;
    }

    const newColumn = destination.droppableId;

    if (newColumn === "1") {
      draggedIssue.assignee = null;
      draggedIssue.state = "open";
    } else if (newColumn === "2") {
      draggedIssue.assignee = assignee;
    } else if (newColumn === "3") {
      draggedIssue.state = "closed";
    }

    const sourceIssues = updatedIssues.filter(
      (issue) => issue.id.toString() !== draggableId
    );
    sourceIssues.splice(destination.index, 0, draggedIssue);

    const updatedColumnIssues = sourceIssues.map((issue, index) => ({
      ...issue,
      number: index + 1,
    }));

    setIssues(updatedColumnIssues);

    const sessionStorageKey = `${repoURL}`;
    saveToSessionStorage(sessionStorageKey, updatedColumnIssues);
  };

  useEffect(() => {
    const sessionStorageKey = `${repoURL}`;
    const savedIssues = sessionStorage.getItem(sessionStorageKey);
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }
  }, [repoURL, setIssues]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex gap="small" justify="space-around">
        {columns.map((column) => (
          <Column
            key={column.columnId}
            columnId={column.columnId}
            columnTitle={column.columnTitle}
            filteredIssues={filteredColumns[column.columnId]}
          />
        ))}
      </Flex>
    </DragDropContext>
  );
};

export default Board;
