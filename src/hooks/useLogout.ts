import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api"

const useLogout = () => {
    const queryClient = useQueryClient();
    const {mutate: logoutMutate, isPending, error} = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["auth-user"]});
        }
    })

    return {logoutMutate, isPending, error};
}

export default useLogout;