import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const EmployeeDetails = () => {
    const axiosPublic = useAxiosPublic();
    const id = useParams();
    console.log(id.id);

    const { data: user = [], isLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => axiosPublic.get(`/users/${id.id}`)
    })

    if (isLoading) {
        return <progress></progress>
    }

    const { name, photo, designation } = user.data[0];
    console.log(user.data[0]);


    return (
        <div className="flex flex-col items-center gap-12 my-16">
            <div className="flex gap-12 items-center justify-center">
                <img className="rounded-lg h-[350px]" src={photo} />
                <h2 className="text-4xl font-semibold uppercase text-[#00fde8]">{name}</h2>
                <h2 className="text-2xl font-semibold text-[#00fde8]">{designation}</h2>
            </div>
            <BarChart
                width={500}
                height={300}
                data={user.data[0].payments}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis dataKey={`payment`}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="payment" fill="#00fde8" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart> 
        </div>
    );
};

export default EmployeeDetails;