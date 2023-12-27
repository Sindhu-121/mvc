import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import './DrawingApp.css';

const DrawingApp = () => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [drawing, setDrawing] = useState(false);
  const stageRef = useRef(null);
  const notepadRef = useRef(null);

  const handleMouseDown = () => {
    if (tool === 'pen' || tool === 'erase') {
      const stage = stageRef.current;
      const point = stage.getPointerPosition();
      const notepadRect = notepadRef.current.getBoundingClientRect();

      // Check if the pointer is inside the notepad area
      if (
        point.x >= notepadRect.left &&
        point.x <= notepadRect.right &&
        point.y >= notepadRect.top &&
        point.y <= notepadRect.bottom
      ) {
        setDrawing(true);
        console.log('Mouse Down:', point);

        const newLines = lines.concat([
          {
            tool,
            points: [point.x, point.y],
            color,
            strokeWidth: lineWidth,
          },
        ]);

        setLines(newLines);
      }
    }
  };

  const handleMouseMove = () => {
    if ((tool === 'pen' || tool === 'erase') && drawing) {
      const stage = stageRef.current;
      const point = stage.getPointerPosition();
      const notepadRect = notepadRef.current.getBoundingClientRect();

      // Check if the pointer is inside the notepad area
      if (
        point.x >= notepadRect.left &&
        point.x <= notepadRect.right &&
        point.y >= notepadRect.top &&
        point.y <= notepadRect.bottom
      ) {
        const lastLine = lines[lines.length - 1];

        if (lastLine) {
          lastLine.points = lastLine.points.concat([point.x, point.y]);
          setLines([...lines.slice(0, -1), lastLine]);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleToolChange = (newTool) => {
    setTool(newTool);
    if (newTool === 'erase') {
      setColor('#ffffff');
    } else {
      setColor('#000000');
    }
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <div>
      <div className='button1'>
        <button  className='button' onClick={() => handleToolChange('pen')}><i class="fa-solid fa-pen-nib"></i></button>
        <button className='button' onClick={() => handleToolChange('erase')}><i class="fa-solid fa-eraser"></i></button>
        <button className='button' onClick={handleClear}><i class="fa-solid fa-trash-can"></i></button>
      </div>
      <div className='notepad' ref={notepadRef}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'erase' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DrawingApp;
