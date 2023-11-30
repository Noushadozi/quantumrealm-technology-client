import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGetUser = () => {
    const { user: loggedInUser, loading: loggedInUserLoading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: user, isLoading } = useQuery({
        queryKey: ['user', loggedInUser?.email],
        enabled: !loggedInUserLoading,
        queryFn: () => axiosPublic.get(`/usersInfo/${loggedInUser.email}`)
    })

    return { user, isLoading }
};


export default useGetUser;