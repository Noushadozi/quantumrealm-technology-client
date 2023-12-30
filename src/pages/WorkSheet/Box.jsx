import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import useAxiosPublic from '../../hooks/useAxiosPublic';

export const Box = ({ children, post, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const name = post?.title;

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { name },
            end(item, monitor) {
                const dropResult = monitor.getDropResult()
                if (item && dropResult) {
                    const isDropAllowed =
                        dropResult.allowedDropEffect === 'any' ||
                        dropResult.allowedDropEffect === dropResult.dropEffect
                    if (isDropAllowed) {
                        const updatedTask = {
                            status: dropResult.name,
                        }
                        axiosPublic.patch(`/taskStatus/${post._id}`, updatedTask)
                            .then(res => {
                                refetch()
                                console.log(res.data);
                            })
                    }
                }
            },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [children],
    )
    return (
        <div ref={drag}>
            {children}
        </div>
    )
}
