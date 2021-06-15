import axiosClient from "../../utils/axiosClient";

export const HomeActionsTypes = {
    GET_DATA: 'GET_DATA'
};
Object.keys(HomeActionsTypes).forEach((key) => {
    HomeActionsTypes[
        key
    ] = `HOME_${HomeActionsTypes[key]}`;
});
//Biến id ở đây tạm thời là set cứng, tuy nhiên sau đó sẽ được lấy ra từ redux auth
const getHomeData = async (id) => {
    try {
        const data = await axiosClient.get(`/app/${id}`)
        return {
            type: HomeActionsTypes.GET_DATA,
            data
        }
    } catch (error) {
        console.log(error);
    }

}
const HomeActions = {
    getData: getHomeData
}
export default HomeActions