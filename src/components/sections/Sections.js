import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import routeApi from "../../api/2.0/routeApi";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import sectionApiV2 from "../../api/2.0/sectionApi";
const Sections = ({ }) => {
    const [sections, setSections] = useState([])
    const [route, setRoute] = useState({
        title: '',
        description: '',
        sections: []
    });
    const [image, setImage] = useState({})
    const [draggedItem, setDraggedItem] = useState({})
    const { routeId } = useParams()
    useEffect(async () => {
        const data = await routeApi.getRouteSections(routeId);
        setRoute(data);
    }, [routeId])
    useEffect(async () => {
        const data = await sectionApiV2.getFreeSections();
        setSections(data);
    }, [routeId])
    function addMoreSection(section) {
        setRoute({ ...route, sections: [...route.sections, section] })
        setSections(sections.filter(_section => _section !== section))
    }
    function removeSection(section) {
        setRoute({
            ...route,
            sections: route.sections.filter(_section => _section !== section)
        })
        setSections([...sections, section])
    }
    const onDragStart = (e, index) => {
        e.dataTransfer.effectAllowed = "move";
        setDraggedItem(route.sections[index]);
        e.dataTransfer.setData("text/html", e.target);
    };
    const onDragOver = index => {
        const draggedOverItem = route.sections[index]
        if (draggedItem === draggedOverItem) {
            return;
        }
        let items = route.sections.filter(item => item !== draggedItem);

        // add the dragged item after the dragged over item
        items.splice(index, 0, draggedItem);
        setRoute({
            ...route,
            sections: items
        })
    }
    function onDragEnd() {
        setDraggedItem({})
    }
    async function save() {
        const status = await routeApi.editSectionsRoute(routeId, route.sections.map((value) => value.id))
    }
    console.log(route.sections);
    return (
        <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: "auto", height: "100vh" }}>
                    <main id="scroll">
                        <div className="mt-2">
                            <div className="row">
                                <div className="offset-md-11 col-1">
                                    <Link className="btn btn-light rounded-circle" to="/admin/quan-ly-lo-trinh">
                                        <i className="fa fa-remove"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="col-md-10 offset-1">
                                <div className="boxLesson">
                                    <div id='management-menu'>
                                        <h4 className="head text-white">Thông tin lộ trình</h4>
                                        <form className='form-group'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <label className="head text-white">Tiêu đề</label>
                                                    <input className='form-control' value={route.title} onChange={(e) => setRoute({ ...route, title: e.target.value })}></input>
                                                    <label className="head text-white">Mô tả</label>
                                                    <textarea className='form-control mt-2' value={route.description} onChange={(e) => setRoute({ ...route, description: e.target.value })}></textarea>
                                                </div>
                                                <div className='col-6'>
                                                    <img src={route.routeImage} className='img-thumbnail'></img>
                                                </div>
                                            </div>

                                        </form>

                                    </div>



                                </div>

                            </div>
                        </div>
                        <div className='container'>
                            <div className='row mt-4'>
                                <div className='col border rounded p-2 mr-1' style={{ backgroundColor: '#ECEAE4' }}>
                                    <h5>Danh sách bài học sẵn có</h5>
                                    {sections.length > 0 ? sections.map((section, index) =>
                                        <div key={index} onClick={() => addMoreSection(section)}>
                                            <div className="card-hoc mt-2">
                                                <div className="headerLesson row p-2">
                                                    <div className="col-md-4">
                                                        <div className="iconLesson">
                                                            <img
                                                                className='rounded-circle'
                                                                src={section.photoUrl || "../../../image/welcome.jpg"}
                                                                alt="Lesson"
                                                                width="60"
                                                                height="60"
                                                            ></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="contentLesson">
                                                            <form className='form-group'>
                                                                <h6>{section.sectionName}</h6>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div className='d-flex justify-content-center align-middle'><Link className='btn btn-primary rounded-pill vertical-center' to='/admin/quan-ly-bai-hoc'>Thêm bài học</Link></div>}
                                </div>
                                <div className='col border rounded p-2 ml-1' style={{ backgroundColor: Object.keys(draggedItem).length > 0 ? '#D4F0F0' : '#ECEAE4' }}>
                                    <h5>Danh sách bài học <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Kéo thả để thay đổi trình tự lộ trình học</Tooltip>}
                                    >
                                        <i className='fa fa-info'></i>
                                    </OverlayTrigger> </h5> <span></span>
                                    {route.sections.map((section, index) =>
                                        <div className='drag-item' key={index} draggable onDragStart={(e) => onDragStart(e, index)} onDragOver={() => onDragOver(index)} onDragEnd={onDragEnd}>
                                            <div className="card-hoc mt-2">
                                                <div className="headerLesson row p-2">
                                                    <div className="col-md-4">
                                                        <div className="iconLesson">
                                                            <img
                                                                className='rounded-circle'
                                                                src={section.photoUrl || "../../../image/welcome.jpg"}
                                                                alt="Lesson"
                                                                width="60"
                                                                height="60"
                                                            ></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="contentLesson">
                                                            <form className='form-group'>
                                                                <h6 className={section === draggedItem ? '' : 'text-dark'}>{section.sectionName}</h6>
                                                                <p className={section === draggedItem ? 'text-primary' : ''}>{section.description}</p>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 d-flex justify-content-end align-items-center">
                                                        <button className='btn btn-primary rounded-circle' onClick={() => removeSection(section)}> <i className="fa fa-remove text-white"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='container d-flex justify-content-between mt-4'>
                            <Link className='btn btn-secondary' to='/admin/quan-ly-lo-trinh'>Hủy</Link>
                            <div className='justify-content-end'>
                                <button className='btn btn-success mr-2' >Preview <i className='fa fa-play-circle'></i></button>
                                <button className='btn btn-primary' onClick={() => save()}>Lưu lại</button>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div >
    )

}
export default Sections