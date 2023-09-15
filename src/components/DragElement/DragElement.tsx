import React from 'react';
import styled, { css } from 'styled-components';

interface DragElementProps {
    id: string;
    posX: number;
    posY: number;
    color: string;
    onDragItem: (itemId: string | null, posX: number, posY: number) => void;
}

const DragElementComponent = ({id, posX, posY, color, onDragItem}: DragElementProps) => {
  

  return (
    <DraggebleDiv
        style={{transform: `translate3d(${posX}px, ${posY}px, 0)`, backgroundColor: `${color}`}}
        onMouseDown={(obj) => {
            onDragItem(id, Math.abs(obj.pageX - posX), Math.abs(obj.pageY - posY))
        }}
        onMouseUp={() => {
            onDragItem(null, 0, 0)
        }}
    >

    </DraggebleDiv>)
};

export const DragElement = React.memo(DragElementComponent);

export const DraggebleDiv = styled.div(() => css`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
`);
