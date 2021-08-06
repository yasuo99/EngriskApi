import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import SubMenu from "../../../components/admin/SubMenu";
import Chart from 'react-apexcharts'
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import examApiv2 from "../../../api/2.0/examApi";
import parse from 'html-react-parser'
import { Link } from "react-browser-router";
import QuestionPreview from "../../../components/question/QuestionPreview";
import routeApi from "../../../api/2.0/routeApi";
const RouteAnalyze = () => {
    const { routeId } = useParams();
    const [isBusy, setIsBusy] = useState(true);
    const [routeAnalyze, setRouteAnalyze] = useState({
        sections: [{
            scripts: []
        }],
        participates: []
    })
    const [donePieChart, setDonePieChart] = useState({
        series: [3, 3],
        options: {
            chart: {
                width: 400,
                type: 'pie',
            },
            labels: ['Hoàn thành', 'Chưa hoàn thành'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: true,
                        text: 'Test',
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    const [gradePieChart, setGradePieChart] = useState({
        series: [10, 30],
        options: {
            chart: {
                width: 400,
                type: 'pie',
            },
            labels: ['Đạt', 'Chưa đạt'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: true,
                        text: 'Test',
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    const [scorePieChart, setScorePieChart] = useState({
        series: [3, 5, 1, 2, 3, 4, 3],
        options: {
            chart: {
                width: 400,
                type: 'pie',
            },
            labels: ['< 100', '100 ~ 200', '200 ~ 300', '300 ~ 400', '400 ~ 500', '500 ~ 600', '600 ~ 700', '700 ~ 800', '800 ~ 900', '> 900'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        show: true,
                        text: 'Test',
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    const [selectQuestion, setSelectQuestion] = useState({});
    const [modalInspect, setModalInspect] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const data = await routeApi.getRouteAnalyze(routeId);
            setRouteAnalyze(data);

            setDonePieChart({
                ...donePieChart,
                series: [data.totalDoneTime, data.totalParticipate]
            });
            setIsBusy(false);
        }
        fetchData();
    }, [routeId])
    const [modalInfo, setModalInfo] = useState(false);
    return (
        <div id="wrapper">
            <SubMenu></SubMenu>
            <div id="content-wrapper" className="d-flex flex-column">
                {/* <SubMenuClient></SubMenuClient> */}
                <div id="quiz">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <main id="home">

                            {!isBusy && <div className="container-fluid text-dark">
                                <Link to="/admin/quan-ly-lo-trinh"> <i className='fa fa-chevron-left'></i> Trở lại</Link>
                                <h2>Thông tin</h2>
                                <div className="container-fluid">
                                    <div className='d-flex justify-content-between'>
                                        <div className='card border-0 shadow-sm mt-1 w-50 p-3'>
                                            <div className='card-body'>
                                                <div className='text-center'>
                                                    <img src={routeAnalyze.routeImage} style={{ width: '100px' }}></img>
                                                    <h3>Tên lộ trình: {routeAnalyze.title}</h3>
                                                    <h5>Mô tả: {routeAnalyze.description}</h5>
                                                    <h6 className='text-info'>Tổng số bài học: {routeAnalyze.sections.length}</h6>
                                                    <h6 className='text-info'>Tổng số kịch bản học: {routeAnalyze.sections.length > 0 ? routeAnalyze.sections.map((val) => val.scripts.length).reduce((a, b) => a + b) : 0}</h6>
                                                    <h4 onClick={() => setModalInfo(!modalInfo)}>{routeAnalyze.totalParticipate} <i className='fa fa-users'></i></h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card shadow-sm border-0 p-3">
                                            <h3>Hoàn thành</h3>
                                            <div className='card-body'>
                                                <Chart options={donePieChart.options} series={donePieChart.series} type="pie" height={430} width={400} />
                                            </div>
                                            <div>Tổng: {donePieChart.series.length > 0 ? donePieChart.series.reduce((a, b) => a + b) : 0}</div>
                                        </div>
                                    </div>

                                </div>
                                <br></br>
                                <h2>Tổng quan bài học</h2>
                                <div className='container-fluid'>
                                    {routeAnalyze.sections.map((section, idx) =>
                                        <div className='card shadow border-0 mt-4'>
                                            <div className='card-header'>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='font-weight-bold'>
                                                        {idx + 1}. {section.sectionName} <span className='ml-4'>{section.access} <i className='fa fa-users'></i></span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='card-body'>
                                                Tỉ lệ tham gia học/ hoàn thành
                                                <div className='d-flex'>
                                                    <ProgressBar variant="success" now={section.done} max={section.access} key={1} className="w-75 mt-2 mr-2" /><b style={{ fontSize: '19px' }} className='pb-2'> {Math.round((section.done / section.access) * 100) || 0}% ({section.done})/({section.access})</b>
                                                </div>
                                                <b>Kịch bản học</b>
                                                {section.scripts.map((script, idx) =>
                                                    <div className='card mb-4'>
                                                        <div className='card-header'>
                                                            {script.type} <span className='ml-4'>{script.access} <i className='fa fa-users'></i></span>
                                                        </div>
                                                        <div className='card-body'>
                                                            Tỉ lệ tham gia học/ hoàn thành
                                                            <div className='d-flex'>
                                                                <ProgressBar variant="success" now={script.done} max={script.access} key={1} className="w-75 mt-2 mr-2" /> <b style={{ fontSize: '19px' }} className='pb-2'>{Math.round((script.done / script.access) * 100) || 0}% ({script.done})/({script.access})</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='card-footer'>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>}
                            <br></br>
                            {modalInfo && <Modal
                                animation
                                size="lg"
                                show={modalInfo}
                                onHide={() => setModalInfo(!modalInfo)}
                            >
                                <Modal.Body>
                                    <div className="row">
                                        <div className="offset-md-11 col-1">
                                            <button
                                                onClick={() => setModalInfo(!modalInfo)}
                                            >
                                                <i className="fa fa-remove"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='container'>
                                        <h5>Danh sách học viên</h5>
                                        {routeAnalyze.participates.map((account, idx) =>
                                            <div className='card border-0 shadow mb-2 text-dark'>
                                                <div className='card-body'>
                                                    <Link className='d-flex'>
                                                        <div className="mr-1">
                                                            Tài khoản: {account.username}
                                                        </div>
                                                        |
                                                        <div className='ml-1 mr-1'>
                                                            Email: {account.email}
                                                        </div>
                                                        |
                                                        <div className="ml-1">
                                                            Số bài học đã học: {JSON.parse(routeAnalyze.progresses[account.id]).length}
                                                        </div>
                                                    </Link>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Modal.Body>
                            </Modal>}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RouteAnalyze;