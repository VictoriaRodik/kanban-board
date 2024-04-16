import React, { useEffect, useState } from "react";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import { useStore } from "../../../zustand/store";
import { Issue } from "../../../zustand/store";
import { Row, Col } from "antd";
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

  const saveToSessionStorage = (key: string, data: Issue[]) => {
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

  const handleDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const toDoIssues = [...filteredColumns["1"]];
    const inProgressIssues = [...filteredColumns["2"]];
    const doneIssues = [...filteredColumns["3"]];

    const draggedIssue = issues.find(
      (issue) => issue.id.toString() === draggableId
    );

    if (!draggedIssue) {
      return;
    }
    const sourceArray =
      source.droppableId === "1"
        ? toDoIssues
        : source.droppableId === "2"
        ? inProgressIssues
        : doneIssues;

    sourceArray.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceArray.splice(destination.index, 0, draggedIssue);
    } else {
      if (destination.droppableId === "1") {
        draggedIssue.assignee = null;
        draggedIssue.state = "open";
        toDoIssues.splice(destination.index, 0, draggedIssue);
      } else if (destination.droppableId === "2") {
        draggedIssue.assignee = assignee;
        draggedIssue.state = "open";
        inProgressIssues.splice(destination.index, 0, draggedIssue);
      } else if (destination.droppableId === "3") {
        draggedIssue.state = "closed";
        doneIssues.splice(destination.index, 0, draggedIssue);
      }
    }

    const sourceIssues = toDoIssues.concat(inProgressIssues, doneIssues);
    setIssues(sourceIssues);

    const sessionStorageKey = `${repoURL}`;
    saveToSessionStorage(sessionStorageKey, sourceIssues);
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
        <Row gutter={{ xs: 8, sm: 16, md: 24}}>
          {columns.map((column) => (
            <Col key={column.columnId} span={8}>
              <Column
                columnId={column.columnId}
                columnTitle={column.columnTitle}
                filteredIssues={filteredColumns[column.columnId]}
              />
            </Col>
          ))}
        </Row>
    </DragDropContext>
  );
};

export default Board;
