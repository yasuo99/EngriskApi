import { useEffect, useState } from "react"
import { Link } from "react-browser-router"
import { useSelector } from "react-redux"
import 'react-tabs/style/react-tabs.css';
import Switch from 'react-switch';
import routeApi from "../../api/2.0/routeApi";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";
const RouteSideNav = ({ typeRoute, selectRoute, display }) => {
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
        <div className={`sidebar-dark accordion ${display ? 'route-side-nav' : 'route-side-nav-hidden'}`} id="accordionSidebar">
            <Tabs defaultActiveKey="engrisk" id="controlled-tab-example" className='d-flex justify-content-center tabs border-0'>
                {display && <Tab eventKey="engrisk" tabClassName='font-weight-bold tab border-0'>
                    <div className='mt-1'>
                        {engriskRoutes.map((value, index) =>
                            <div key={index} className={`bg-white ${route.id == value.id ? 'text-primary' : 'text-dark'}  py-2 collapse-inner rounded mt-2 pointer-card shadow-sm`}>
                                <div className='row p-2' onClick={() => selectRoute(value)}>
                                    <div className='col-7'>
                                        <h6 className="collapse-header">{value.title}</h6>
                                        {value.description}
                                        <br></br>
                                        <b>Hoàn thành: {value.done} / {value.sections.length}</b>
                                    </div>
                                    <div className='col-5'>
                                        <img className='route-img' src={value.routeImage}></img>
                                    </div>
                                </div>


                            </div>
                        )}
                    </div>

                </Tab>}
            </Tabs>

        </div>
    )
}
export default RouteSideNav