import { useForm } from "react-hook-form"
import FormControl from '@mui/material/FormControl';
import { Divider, FormHelperText, Input, InputLabel } from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RegisterSelect from "./RegisterSelect";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const [error, setError] = useState('');
    const roleObj = {
        role: [
            { name: 'Employee' },
            { name: 'HR' },
            { name: 'Admin' },
        ]
    }
    const [selected, setSelected] = useState(roleObj.role[0])
    console.log(selected)
    const navigate = useNavigate();

    const { createUser, update, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const onSubmit = async (data) => {
        const name = data.name;
        const imageFile = { image: data.photo[0] };
        const email = data.email;
        createUser(email, data.password)
            .then(async (res) => {
                console.log(res.user)
                const img = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                })
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.success)
                            const salary = Math.floor(Math.random() * 10) + 1 + '0000';

                            const userInfo = {
                                name,
                                email,
                                photo: res.data.data.display_url,
                                role: selected.name,
                                bank_account_no: '',
                                salary: salary,
                                verified: false,
                                designation: '',
                            }
                            console.log(name, res.data.data.display_url)
                            update(name, res.data.data.display_url)
                                .then(res => {
                                    console.log(res)

                                    console.log(userInfo)
                                    axiosPublic.post('/users', (userInfo))
                                        .then(res => {
                                            console.log(res.data)
                                            navigate('/');
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Your work has been saved",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                        })
                                })
                                .catch(err => {
                                    setError(err.message)
                                    console.log(err)
                                })
                        }
                    })
                    .catch(err => {
                        setError(err)
                    })
            })
            .catch(err => {
                setError(err.message)
            })
    }
    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(res => {
                console.log(res);
                navigate('/');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                setError(err.message || '')
            })
    }

    return (
        <div className="bg-[#f0f7f7] flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}
                className="my-[200px] mx-auto flex flex-col items-center justify-center w-[400px] md:w-[500px] bg-[white] rounded-lg pt-5 pb-12">

                <div className="my-[20px] w-[80%]">
                    <FormControl fullWidth>
                        <RegisterSelect
                            roleObj={roleObj}
                            setSelected={setSelected}
                            selected={selected}
                        ></RegisterSelect>
                    </FormControl>
                </div>
                <div className="my-[20px] w-[80%]">
                    <FormControl fullWidth>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input
                            {...register("name", { required: true })}
                            name="name" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>

                <div className="my-[20px] w-[80%]">
                    <FormControl fullWidth>
                        <InputLabel htmlFor="my-input">Email</InputLabel>
                        <Input
                            {...register("email", { required: true })}
                            name="email" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className="my-[20px] w-[80%]">
                    <FormControl fullWidth>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input
                            {...register("password", { required: true })}
                            name="password" aria-describedby="my-helper-text" type="password" />
                    </FormControl>
                </div>
                <div className="mt-[10px] w-[80%]">
                    <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                        Upload Photo
                        <VisuallyHiddenInput
                            {...register("photo", { required: true })}
                            name="photo" type="file" />
                    </Button>
                </div>
                <p className="text-[#e96969] font-semibold mt-2 text-[14px]">{error}</p>
                <div className="mt-[35px] w-[80%]">
                    <Button variant="contained" type="submit" className="w-full">Register</Button>
                </div>
                <div className="mt-[20px] w-[80%]">
                    <Button
                        onClick={handleGoogleLogIn}
                        variant="outlined" type="submit" className="w-full">
                        <div className="flex gap-4 items-center">
                            <p>
                                Continue with google
                            </p>
                            <FcGoogle />
                        </div>
                    </Button>
                </div>
                <p className="mt-3">Already have an account?<Link to={'/login'}> Login here</Link></p>
            </form>
        </div>
    );
};

export default Register;