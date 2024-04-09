import React, { useState } from 'react';
import { Flex } from 'antd';
import { useStore } from '../../store';

interface DragAndDropProps {
  initialState: [];
  children: React.ReactNode;
  style: React.CSSProperties;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  initialState = [],
  children,
  style
}) => {
  const [isDrag, setIsDrag] = useState(false);
  const { setIssues } = useStore();

  const dragLeave = (event: React.DragEvent<HTMLDivElement>) => { 
    event.preventDefault();
    setIsDrag(false);
  };

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => { 
    event.preventDefault();
    setIsDrag(true);
  };

  const dragDrop = (event: React.DragEvent<HTMLDivElement>) => { 
    event.preventDefault();
    setIsDrag(false);
  };

  return (
    <Flex
      onDragLeave={dragLeave}
      onDragOver={dragStart}
      onDragStart={dragStart}
      onDrop={dragDrop}
      style={style}     >
      <Flex style={[style.uploadBox, isDrag && style.activeDrag]}>{children}</Flex> // Змінено sx на style
    </Flex>
  );
};

export default DragAndDrop;
