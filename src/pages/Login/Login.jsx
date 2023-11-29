import { useForm } from "react-hook-form"
import FormControl from '@mui/material/FormControl';
import { Input, InputLabel } from "@mui/material";
import Button from '@mui/material/Button';
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { logIn, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        logIn(data.email, data.password)
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                className="my-[200px] mx-auto flex flex-col items-center justify-center w-[400px] md:w-[500px] rounded-lg pt-5 pb-12  bg-gradient-to-r from-[#14abe3] to-[#00fce7] mb-[50px] text-[#001f4b]">

                <div className="my-[20px] w-[80%] text-[#001f4b]">
                    <FormControl
                        sx={{ color: '#001f4b' }}
                        fullWidth>
                        <InputLabel htmlFor="my-input">Email</InputLabel>
                        <Input
                            {...register("email", { required: true })}
                            name="email" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>
                <div className="my-[20px] w-[80%]">
                    <FormControl
                        sx={{ color: '#001f4b' }}
                        fullWidth>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input
                            {...register("password", { required: true })}
                            name="password" aria-describedby="my-helper-text" type="password" />
                    </FormControl>
                </div>
                <p className="text-[#e96969] font-semibold mt-2 text-[14px]">{error}</p>
                <div className="mt-[40px] w-[80%]">
                    <Button
                        sx={{ color: '#001f4b', bgcolor: '#e9bafb', fontWeight: 600 }} variant="contained" type="submit" className="w-full">Log In</Button>
                </div>
                <div className="mt-[20px] w-[80%]">
                    <Button
                        sx={{ color: '#e9bafb', border: '2px solid #e9bafb',fontWeight: 600 }}
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
                <p className="mt-3">Do not have an account?<Link className="text-[#e9bafb] font-semibold" to={'/register'}> Register here</Link></p>
            </form>
        </div>
    );
};

export default Login;