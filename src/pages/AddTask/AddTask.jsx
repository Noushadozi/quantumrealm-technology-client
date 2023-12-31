import { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import AddTaskSelect from './AddTaskSelect';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Swal from 'sweetalert2'
import { Button } from '@mui/base/Button';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();
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
    const [date, setDate] = useState(new Date());
    const day = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'short' });
    const year = date.getFullYear();
    const [selectedTask, setSelectedTask] = useState(tasks[0]);


    const onSubmit = async (form) => {
        // form.preventDefault();
        const description = form.description;
        const duration = form.duration;
        const priority = form.priority;
        const task = {
            email: user.email,
            status: "TODO",
            title: selectedTask.name,
            description,
            duration,
            date: day + " " + month + " " + year,
            priority
        }
        try {
            const res = await axios.post(`https://quantumrealm-technology-server.vercel.app/tasks`, task);
            console.log(res.data);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    return (
        <div className="my-[50px] md:w-[60%] lg:w-[70%] mx-auto">
            <div className="flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold mb-8 text-center text-[#e9bafb]">Add Task!!</h1>
                </div>
                <div className="card rounded-[2px] flex-shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <AddTaskSelect
                                tasks={tasks}
                                selected={selectedTask}
                                setSelected={setSelectedTask}
                            ></AddTaskSelect>

                            <DatePicker
                                className="bg-gradient-to-r from-[#a9b6e2] to-[#c9f3c1] text-[#001f4b] rounded-lg shadow-lg w-[100%]"
                                showIcon
                                selected={date}
                                onChange={(date) => setDate(date)}
                            />
                            <Select
                                {...register("priority", { required: true })}
                                className="bg-gradient-to-r from-[#a9b6e2] to-[#c9f3c1] text-[#001f4b] rounded-lg shadow-lg w-[100%]" placeholder="Task Priority">
                                <Option value="Low">Low</Option>
                                <Option value="Moderate">Moderate</Option>
                                <Option value="High">High</Option>
                            </Select>
                            {errors.priority && <span className='text-2xl text-[#e18787]'>Task priority is required</span>}

                            <Input
                                {...register("description", { required: true })}
                                className="text-[#001f4b] rounded-lg shadow-lg"
                                placeholder="Describe your task" required
                            />
                            <Input
                                {...register("duration", { required: true })}
                                className="text-[#001f4b] rounded-lg shadow-lg"
                                placeholder="Task duration (Hour)" type='number' required
                            />
                            <Button className="text-[#001f4b] rounded-lg shadow-lg bg-[#e9bafb] w-[100%] btn btn-primary h-10" type="submit">Add Task</Button>
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;