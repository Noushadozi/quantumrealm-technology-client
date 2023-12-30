import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

function selectBackgroundColor(isActive) {
    if (isActive) {
        return '#e9bafb'
    }
}

export const Dustbin = ({ allowedDropEffect, children, name }) => {
    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop: () => ({
                name: `${name}`,
                allowedDropEffect,
            }),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [allowedDropEffect],
    )
    const isActive = canDrop && isOver
    const backgroundColor = selectBackgroundColor(isActive, canDrop)

    return (
        <div ref={drop} style={{ backgroundColor }} className='w-full'>
            {
                children
            }
        </div>
    )
}
