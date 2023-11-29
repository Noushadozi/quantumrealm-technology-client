import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGetUser = () => {
    const { user: loggedInUser, loading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        enabled: !loading,
        queryFn: () => axiosPublic(`/usersInfo/${loggedInUser.email}`)
    })

    return { user, isLoading }
};


export default useGetUser;