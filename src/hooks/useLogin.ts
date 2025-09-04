import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../lib/api"

const useLogin = () => {

    const queryClient = useQueryClient();
    const {mutate: loginMutate, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["auth-user"]});
        }
    })

    return {loginMutate, isPending, error};
}

export default useLogin;