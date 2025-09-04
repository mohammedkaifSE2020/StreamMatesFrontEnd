import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api"


const useAuthUser = () => {
    const { data: authdata, isLoading, isError } = useQuery({
        queryKey: ["auth-user"],
        queryFn: getAuthUser,
        retry: false,
    })

    return {authdata, isLoading, isError};
}

export default useAuthUser;

