import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import routeApi from "../../api/2.0/routeApi";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import sectionApiV2 from "../../api/2.0/sectionApi";
const Sections = ({ sourceRoute, closeEdit, save }) => {
    const [sections, setSections] = useState([])
    const [route, setRoute] = useState({
        title: '',
        description: '',
        sections: []
    });
    const [image, setImage] = useState({})
    const [draggedItem, setDraggedItem] = useState({})
    useEffect(async () => {
        if (Object.keys(sourceRoute).length > 0) {
            const data = await routeApi.getRouteSections(sourceRoute.id);
            setRoute(data);
        }
    }, [sourceRoute])
    useEffect(async () => {
        if (Object.keys(sourceRoute).length > 0) {
            const data = await sectionApiV2.getFreeSections();
            setSections(data);
        }
    }, [sourceRoute])
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
        console.log('??');
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
    async function submit() {
        await save(sourceRoute.id, route.sections.map((value) => value.id));
    }
    console.log(route.sections);
    return (
        <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <main id="scroll">
                        <div className="mt-2">
                            <div className="row">
                                <div className="offset-md-11 col-1">
                                    <button className="btn btn-light rounded-circle" onClick={() => closeEdit({})}>
                                        <i className="fa fa-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between container'>
                            <h5>Danh sách bài học sẵn có</h5>
                            <h5>Danh sách bài học <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="button-tooltip-2">Kéo thả để thay đổi trình tự lộ trình học</Tooltip>}
                            >
                                <i className='fa fa-info'></i>
                            </OverlayTrigger> </h5>
                        </div>
                        <div className=''>
                            <div className='row p-4'>
                                <div className='col border rounded p-2 mr-1 script-panel' style={{ backgroundColor: '#ECEAE4' }}>

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
                                                                <p>{section.description}</p>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div className='d-flex justify-content-center align-middle'><Link className='btn btn-primary rounded-pill vertical-center' to='/admin/quan-ly-bai-hoc'><i className="fa fa-plus"/> Thêm bài học</Link></div>}
                                </div>
                                <div className='col border rounded p-2 ml-1 script-panel' style={{ backgroundColor: Object.keys(draggedItem).length > 0 ? '#D4F0F0' : '#ECEAE4' }}>
                                    <span></span>
                                    {route.sections.map((section, index) =>
                                        <div draggable className='drag-item shadow-sm' key={index} onDragStart={(e) => onDragStart(e, index)} onDragOver={() => onDragOver(index)} onDragEnd={onDragEnd}>
                                            <div className="card mt-2">
                                                <div className="headerLesson row p-2">
                                                    <div className="col-md-3">
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
                                                    <div className="col-md-4 d-flex justify-content-end align-items-center">
                                                        <button className='btn btn-primary rounded-circle' onClick={() => removeSection(section)}> <i className="fa fa-remove text-white"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-center mb-3"
                            style={{ marginTop: "-1rem" }}
                        >
                            <div className="btn-save-inner">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-save mr-1"
                                    onClick={() => closeEdit({})}
                                >
                                    Hủy
                                </button>     
                                <button
                                    className="btn btn-success btn-save ml-1"
                                    type="button"
                                    onClick={() => submit()}
                                >
                                    Lưu lại
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div >
    )

}
export default Sections