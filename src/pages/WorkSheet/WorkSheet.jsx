import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import "react-datepicker/dist/react-datepicker.css";
import TaskSheetTab from "./TaskSheetTab";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PulseLoader from "react-spinners/PulseLoader";

const WorkSheet = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const email = user?.email;
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#e9bafb");

    const { refetch, data, isLoading } = useQuery({
        queryKey: ['tasks', email],
        queryFn: () => axiosPublic.get(`/tasks?email=${email}`)
    })

    if (isLoading) {
        return <div className="text-center mt-[150px]">
            <PulseLoader
                color={color}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }

    const TODO = data?.data.filter(task => task.status === "TODO");
    const ONGOING = data?.data.filter(task => task.status === "ONGOING");
    const COMPLETED = data?.data.filter(task => task.status === "COMPLETED");

    return (
        <div className="xl:mx-[150px] pt-[100px] pb-[150px]">
            <DndProvider backend={HTML5Backend}>
                <TaskSheetTab
                    refetch={refetch}
                    TODO={TODO}
                    ONGOING={ONGOING}
                    COMPLETED={COMPLETED}
                ></TaskSheetTab>
            </DndProvider>
        </div>
    );
};

export default WorkSheet;