import { useState } from "react";
import { Link } from "react-router-dom";
import { Tab } from '@headlessui/react'
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TaskSheetTab = ({ TODO, ONGOING, COMPLETED, refetch }) => {
    const axiosSecure = useAxiosSecure();

    let [categories] = useState({
        TODO: [
            ...TODO
        ],
        ONGOING: [
            ...ONGOING
        ],
        COMPLETED: [
            ...COMPLETED
        ],
    })

    const deleteTask = (id) => {
        console.log(id);
        axiosSecure.delete(`/task/${id}`)
            .then(res => {
                console.log(res);
                refetch();
            })
    }

    return (
        <div className="w-full max-w px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(categories).map((category) => (
                        <Dustbin key={category} allowedDropEffect="any" name={category}>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white text-blue-700 shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        </Dustbin>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'rounded-lg bg-white p-3',
                                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}
                        >
                            <ul>
                                {posts.map((post) => (
                                    <Box
                                        key={post._id} post={post} refetch={refetch} >
                                        <li
                                            className="relative rounded-md p-3 hover:bg-gray-100 flex cursor-move"
                                        >
                                            <div className="shrink-0 w-[70%]">
                                                <h3 className="text-sm font-medium leading-5">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">{post.description}</p>
                                                <p className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">DURATION: {post.duration} hour</p>
                                                <p className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">PRIORITY: {post.priority}</p>
                                                <p className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">DEADLINE: {post.date}</p>
                                            </div>
                                            <div className="flex flex-col justify-center w-[30%] gap-3">
                                                <Link
                                                    to={`/updateTask/${post._id}`}
                                                > <button className="btn bg-[#e9bafb] btn-primary h-[25px] w-[100%] rounded-lg text-[#001f4b] font-semibold">
                                                        UPDATE
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => deleteTask(post._id)}
                                                    className="btn bg-[#e9bafb] btn-primary h-[25px] w-[100%] rounded-lg text-[#001f4b] font-semibold">DELETE</button>
                                            </div>
                                        </li>
                                    </Box>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default TaskSheetTab;