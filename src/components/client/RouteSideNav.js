import { useEffect, useState } from "react"
import { Link } from "react-browser-router"
import { useSelector } from "react-redux"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Switch from 'react-switch';
import routeApi from "../../api/2.0/routeApi";
import { toast } from "react-toastify";
const RouteSideNav = ({ typeRoute, selectRoute }) => {
    const { route } = useSelector(state => state.route);
    const { isLoggedIn } = useSelector(state => state.auth)
    const [engriskRoutes, setEngriskRoutes] = useState([])
    const [publicRoutes, setPubicRoutes] = useState([])
    const [privateRoutes, setPrivateRoutes] = useState([])
    useEffect(() => {
        var newEngriskRoutes = typeRoute.engrisk.filter(value => value.id != route.id);
        setEngriskRoutes([route, ...newEngriskRoutes]);
        setPubicRoutes([...typeRoute.public]);
        if (isLoggedIn) {
            setPrivateRoutes([...typeRoute.private]);
        }
    }, [typeRoute])
    async function publicRoute(route) {
        console.log(route);
        const result = await routeApi.changeRouteStatus(route.id);
        if (result.status == 200) {
            toast('Thành công', { type: 'info' });
            changeRouteStatus(route)
        }
        else {
            toast('Thất bại', { type: 'error' });
        }
    }
    function changeRouteStatus(value) {
        value.isPrivate = !value.isPrivate;
        var index = privateRoutes.findIndex(v => v.id != value.id);
        privateRoutes[index] = value;
        setPrivateRoutes([...privateRoutes]);
    }
    return (
        <div className='sidebar-dark accordion route-side-nav' id="accordionSidebar">
            <Tabs>
                <TabList className='d-flex justify-content-center'>
                    <Tab><h5>Engrisk</h5></Tab>
                    <Tab><h5>Mọi người</h5></Tab>
                    {isLoggedIn && <Tab><h5>Của bạn</h5></Tab>}
                </TabList>

                <TabPanel>
                    <h4 className='text-dark'>Bạn đang học</h4>

                    {engriskRoutes.map((value, index) =>
                        <div key={index} className={route.id == value.id ? "bg-white text-primary py-2 collapse-inner rounded mt-2 pointer-card" : "bg-white text-dark py-2 collapse-inner rounded mt-2 pointer-card"}>
                            <div className='row p-2' onClick={() => selectRoute(value)}>
                                <div className='col-7'>
                                    <h6 className="collapse-header">{value.title}</h6>
                                    {value.description}
                                    <br></br>
                                    Hoàn thành: {value.done} / {value.sections.length}
                                </div>
                                <div className='col-5'>
                                    <img className='route-img' src={value.routeImage}></img>
                                </div>
                            </div>


                        </div>
                    )}
                </TabPanel>
                <TabPanel>
                    <h4 className='text-dark'>Bạn đang học</h4>

                    {publicRoutes.map((value, index) =>
                        <div key={index} className={route.id == value.id ? "bg-white text-primary py-2 collapse-inner rounded mt-2 pointer-card" : "bg-white text-dark py-2 collapse-inner rounded mt-2 pointer-card"}>
                            <div className='row p-2' onClick={() => selectRoute(value)}>
                                <div className='col-7'>
                                    <h6 className="collapse-header">{value.title}</h6>
                                    {value.description}
                                    <br></br>
                                    Hoàn thành: {value.done} / {value.sections.length}
                                </div>
                                <div className='col-5'>
                                    <img className='route-img' src={value.routeImage}></img>
                                </div>
                            </div>


                        </div>
                    )}
                </TabPanel>
                {isLoggedIn && <TabPanel>
                    <h4 className='text-dark'>Bạn đang học</h4>

                    {privateRoutes.map((value, index) =>
                        <div key={index} className={route.id == value.id ? "bg-white text-primary py-2 collapse-inner rounded mt-2 pointer-card" : "bg-white text-dark py-2 collapse-inner rounded mt-2 pointer-card"}>
                            <Switch onChange={() => publicRoute(value)} checked={value.isPrivate} className="ml-2"></Switch>
                            <div className='row p-2' onClick={() => selectRoute(value)}>
                                <div className='col-7'>
                                    <h6 className="collapse-header">{value.title}</h6>
                                    {value.description}
                                    <br></br>
                                    Hoàn thành: {value.done} / {value.sections.length}
                                </div>
                                <div className='col-5'>
                                    <img className='route-img' src={value.routeImage}></img>
                                </div>
                            </div>


                        </div>
                    )}
                </TabPanel>}

            </Tabs>

        </div>
    )
}
export default RouteSideNav