import axiosClientv2 from "../../config/axiosClientv2";

const accountApiV2 = {
    followUser: async (followerId, followingId) => {
        const url = `/accounts/${followerId}/following/${followingId}`;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        return await axiosClientv2.put(url,null, {headers});
    }
}
export default accountApiV2;