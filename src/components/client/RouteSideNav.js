import { useEffect, useState } from "react"
import { Link } from "react-browser-router"
import { useSelector } from "react-redux"
import 'react-tabs/style/react-tabs.css';
import Switch from 'react-switch';
import routeApi from "../../api/2.0/routeApi";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";
const RouteSideNav = ({ typeRoute, selectRoute }) => {
    const { route } = useSelector(state => state.route);
    const { isLoggedIn, account } = useSelector(state => state.auth)
    const [engriskRoutes, setEngriskRoutes] = useState([])
    const [privateRoutes, setPrivateRoutes] = useState([])
    useEffect(() => {
        var newEngriskRoutes = typeRoute.engrisk.filter(value => value.id != route.id);
        setEngriskRoutes([route, ...newEngriskRoutes]);
        if (isLoggedIn) {
            setPrivateRoutes([...typeRoute.private]);
        }
    }, [typeRoute])
    async function publicRoute(route) {
        console.log(route);
        const result = await routeApi.changeRouteStatus(route.id, account.id);
        if (result.status == 200) {
            toast('Thành công', { type: 'info' });
            changeRouteStatus(route)
        }
        else {
            if (route.sections.length == 0) {
                toast('Lộ trình không có bài học', { type: 'warning' });
            } else {
                toast('Thất bại', { type: 'error' });
            }

        }
    }
    function changeRouteStatus(value) {
        value.isPrivate = !value.isPrivate;
        var index = privateRoutes.findIndex(v => v.id == value.id);
        privateRoutes[index] = value;
        setPrivateRoutes([...privateRoutes]);
    }
    return (
        <div className='sidebar-dark accordion route-side-nav' id="accordionSidebar">
            <Tabs defaultActiveKey="engrisk" id="controlled-tab-example" className='d-flex justify-content-center'>
                <Tab eventKey="engrisk" title="Engrisk" tabClassName='font-weight-bold'>
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
                </Tab>
                {isLoggedIn && <Tab eventKey="self" title="Của bạn" tabClassName='font-weight-bold'>
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
                </Tab>}
            </Tabs>

        </div>
    )
}
export default RouteSideNav