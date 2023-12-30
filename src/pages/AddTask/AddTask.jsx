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
        form.preventDefault();
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
        axios.post(`http://localhost:5000/tasks`, task)
            .then(res => {
                console.log(res.data);
                navigate('/');
                toast.success('Task added successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    return (
        <div className="my-[50px] md:w-[60%] lg:w-[70%] mx-auto">
            <div className="flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold mb-8 text-center text-[#e9bafb]">Add Task!!</h1>
                </div>
                <div className="card rounded-[2px] flex-shrink-0 shadow-2xl">
                    <form
                        onSubmit={onSubmit}
                    >
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
                            <Select defaultValue="Low"
                                {...register("priority", { required: true })}
                                className="bg-gradient-to-r from-[#a9b6e2] to-[#c9f3c1] text-[#001f4b] rounded-lg shadow-lg w-[100%]">
                                <Option value="Priority" disabled>Task Priority</Option>
                                <Option value="Low">Low</Option>
                                <Option value="Moderate">Moderate</Option>
                                <Option value="High">High</Option>
                            </Select>
                            <Input
                                {...register("description", { required: true })}
                                className="text-[#001f4b] rounded-lg shadow-lg"
                                placeholder="Describe your task" required
                            />
                            <Input
                                {...register("duration", { required: true })}
                                className="text-[#001f4b] rounded-lg shadow-lg"
                                placeholder="Task duration" type='number' required
                            />
                            <button className="text-[#001f4b] rounded-lg shadow-lg bg-[#e9bafb] w-[100%] btn btn-primary h-10" type="submit">
                                Add Task
                            </button>
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;