import { axiosInstance } from "./axios";

export const getAuthUser = async() => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data.user;
    } catch (error) {
        return null;
    }
}

export const signup = async (signUpdata: any) => {
    const res = await axiosInstance.post("/auth/signup", signUpdata)
    return res.data;
}


export const login = async (logindata:any) => {
    try {
        const res = await axiosInstance.post("/auth/login", logindata);
                return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  console.log(response)
  return response.data;
};

export const updateOnboarding = async (onboardingData: any) => {
  const res = await axiosInstance.post("/auth/onboarding", onboardingData);
  console.log(res);
  return res.data;
}

export const getUserFriends = async () => {
    const res = await axiosInstance.get("/user/friends");
    return res.data;
}

export const getRecommededUsers = async () => {
    const res = await axiosInstance.get("/user");
    return res.data;
}

export const getPendingFriendRequests = async () => {
    const res = await axiosInstance.get("/user/friend-requests/pending");
    return res.data;
}

export const getAcceptedFriendRequests = async () => {
    const res = await axiosInstance.get("/user/friend-requests/accepted");
    return res.data;
}

export const getSentFriendRequests = async () => {
    const res = await axiosInstance.get("/user/friend-requests/sent");
    return res.data.data;
}

export const sendFriendRequest = async (id: string) => {
    const res = await axiosInstance.post(`/user/friend-request/${id}`);
    return res.data;
}

export const acceptFriendRequest = async (id: string) => {
    const res = await axiosInstance.put(`/user/friend-request/${id}/accept`);
    console.log(res.data)
    return res.data;
}

export const rejectFriendRequest = async (id: string) => {
    const res = await axiosInstance.put(`/user/friend-request/${id}/reject`);
    return res.data;
}

export const getStreamToken = async () => {
    const res = await axiosInstance.get("/chat/token");
    return res.data;
}



