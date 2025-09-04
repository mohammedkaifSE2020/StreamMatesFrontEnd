import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup } from "../lib/api"

const useSignup = () => {
    const queryClient = useQueryClient();
    const {mutate: signupMutate, isPending, error} = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["auth-user"]});
        }
    })

    return {signupMutate, isPending, error};
}

export default useSignup;