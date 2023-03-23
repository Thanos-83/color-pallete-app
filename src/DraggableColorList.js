
import React from 'react'
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({colors,removeColor})=>{
    // const {colors, removeColor} = props;
    return (
        <div style={{height:'100%'}}>
            {colors.map((color,index)=>(
                <DraggableColorBox 
                  index={index}
                  color={color.color} 
                  name={color.name}
                  handleClick={removeColor}
                  id={color.name}
                />
            ))}
        </div>
    )
})
export default DraggableColorList