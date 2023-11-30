import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form"
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel } from "@mui/material";
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import WorkSheetSelect from "./WorkSheetSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorkSheetTable from "./WorkSheetTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WorkSheet = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
    const [date, setDate] = useState(new Date());
    const tasks = [
        { name: 'Software Development' },
        { name: 'Ai Services' },
        { name: 'AIOT Services' },
        { name: 'ML Services' },
        { name: 'Mobile App Development' },
        { name: 'Web Development' },
        { name: 'Database Management' },
        { name: 'Sales' },
        { name: 'Support' },
        { name: 'Content' },
        { name: 'Paper-work' }
    ]
    const [selectedTask, setSelectedTask] = useState(tasks[0])
    

    const { refetch, data: userData = [], isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosSecure(`/privateInfo/${user.email}`)
    })

    if (isLoading) {
        return <progress></progress>
    }

    const onSubmit = async (data) => {
        const taskInfo = {
            task: selectedTask.name,
            duration: data.hours,
            date: date.toString().slice(4, 15)
        }
        
        const tasks = userData?.data[0]?.tasks || [];

        tasks.unshift(taskInfo);

        axiosSecure.patch(`/userTask/${user.email}`, tasks)
            .then(res => {
                console.log(res);
                if (res.data.acknowledged) {
                    refetch()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="bg-[url('https://i.ibb.co/Jj7jRhF/Blue-Purple-Futuristic-Modern-3-D-Tech-Company-Business-Presentation-1-page-0012-Photo-Room-png-Phot.png')] bg-no-repeat bg-right xl:mx-[150px]">
            <div className="flex flex-col mb-[100px]">
                <form onSubmit={handleSubmit(onSubmit)}
                    className="mt-[150px] mx-auto flex flex-col items-center justify-center w-[400px] md:w-[500px] bg-[white] rounded-lg pt-5 pb-12 bg-gradient-to-r from-[#14abe3] to-[#00fce7] text-[#001f4b]">
                    <div className="my-[20px] w-[60%]">
                        <FormControl fullWidth>
                            <WorkSheetSelect
                                tasks={tasks}
                                selected={selectedTask}
                                setSelected={setSelectedTask}
                            ></WorkSheetSelect>
                        </FormControl>
                    </div>
                    <div className="my-[20px] w-[60%]">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="my-input">Hours Worked</InputLabel>
                            <Input
                                {...register("hours", { required: true })}
                                name="hours" type="number" aria-describedby="my-helper-text" />
                        </FormControl>
                    </div>
                    <div className="my-[20px] w-[60%]">
                        <FormControl fullWidth>
                            <DatePicker
                                className="bg-gradient-to-r from-[#a9b6e2] to-[#c9f3c1] text-[#001f4b] rounded-lg shadow-lg"
                                showIcon
                                selected={date}
                                onChange={(date) => setDate(date)}
                            />
                        </FormControl>
                    </div>
                    <div className="mt-[15px] w-[60%]">
                        <Button
                            sx={{ color: '#001f4b', bgcolor: '#b774f5', fontWeight: 600 }}
                            variant="contained" type="submit" className="w-full">Add</Button>
                    </div>
                </form>
            </div>
            <WorkSheetTable
                data={userData}
                isLoading={isLoading}
            ></WorkSheetTable>
        </div>
    );
};

export default WorkSheet;