import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskSheetTab from "./TaskSheetTab";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const WorkSheet = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useContext(AuthContext);
    const email = user?.email;

    const { refetch, data, isLoading } = useQuery({
        queryKey: ['tasks', email],
        queryFn: () => axiosPublic.get(`/tasks?email=${email}`)
    })

    if (isLoading) {
        return 
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