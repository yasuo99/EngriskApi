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
const ExamOverview = () => {
    const { examId } = useParams();
    const [examAnalyze, setExamAnalyze] = useState({
        questions: []
    })
    const [donePieChart, setDonePieChart] = useState({
        series: [0, 0],
        options: {
            chart: {
                width: 400,
                type: 'pie',
            },
            labels: ['Hoàn thành', 'Chưa'],
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
        series: [0, 0],
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
        series: [0, 0, 0, 0, 0, 0, 0],
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
            const data = await examApiv2.getAnalyze(examId);
            setExamAnalyze(data);
            var newDoneData = [];
            var newLabels = [];
            if (Object.keys(data.donePie).length > 0) {
                Object.keys(data.donePie).forEach(key => {
                    newDoneData.push(data.donePie[key])
                    newLabels.push(key);
                })
                setDonePieChart({
                    ...donePieChart,
                    series: newDoneData,
                    options: {
                        ...donePieChart.options,
                        labels: newLabels
                    }
                })
            }

            var newGradeData = [];
            var newGradeLabels = [];
            if (Object.keys(data.gradePie).length > 0) {
                Object.keys(data.gradePie).forEach(key => {
                    newGradeData.push(data.gradePie[key])
                    newGradeLabels.push(key);
                })
                setGradePieChart({
                    ...gradePieChart,
                    series: newGradeData,
                    options: {
                        ...gradePieChart.options,
                        labels: newGradeLabels
                    }
                })
            }
            var newScoreData = [];
            var newScoreLabels = [];
            if (Object.keys(data.scorePie).length > 0) {
                Object.keys(data.scorePie).forEach(key => {
                    newScoreData.push(data.scorePie[key])
                    newScoreLabels.push(key);
                })
                setScorePieChart({
                    ...scorePieChart,
                    series: newScoreData,
                    options: {
                        ...scorePieChart.options,
                        labels: newScoreLabels
                    }
                })
            }
        }
        fetchData();
    }, [examId])
    function toggleModalInspect(question){
        console.log(question);
        setSelectQuestion({...question, answers: question.answers.map((ans) => ({...ans, answer: ans.content}))});
        setModalInspect(!modalInspect);
    }
    return (
        <div id="wrapper">
            <SubMenu></SubMenu>
            <div id="content-wrapper" className="d-flex flex-column">
                {/* <SubMenuClient></SubMenuClient> */}
                <div id="quiz">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <main id="home">

                            <div className="container-fluid text-dark">
                                <Link to="/admin/quan-ly-exam"> <i className='fa fa-chevron-left'></i> Trở lại</Link>
                                <h2>Phân tích</h2>
                                <div className="d-flex justify-content-between p-4">
                                    <div className="card shadow-sm border-0 mr-4 p-3">
                                        <h3>Hoàn thành</h3>
                                        <div className='card-body'>
                                            <Chart options={donePieChart.options} series={donePieChart.series} type="pie" height={430} width={400} />
                                        </div>
                                        <div className='card-footer'>Tổng: {donePieChart.series.length > 0 ? donePieChart.series.reduce((a, b) => a + b) : 0}</div>
                                    </div>
                                    <div className="card shadow-sm border-0 mr-4 p-3">
                                        <h3>Đạt</h3>
                                        <div className='card-body'>
                                            <Chart options={gradePieChart.options} series={gradePieChart.series} type="pie" height={430} width={400} />
                                        </div>
                                        <div className='card-footer'>Tổng: {gradePieChart.series.length > 0 ? gradePieChart.series.reduce((a, b) => a + b) : 0}</div>
                                    </div>
                                    <div className="card shadow-sm border-0 p-3">
                                        <h3>Điểm</h3>
                                        <div className='card-body'>
                                            <Chart options={scorePieChart.options} series={scorePieChart.series} type="pie" height={430} width={400} />
                                        </div>
                                        <div className='card-footer'>Tổng: {scorePieChart.series.length > 0 ? scorePieChart.series.reduce((a, b) => a + b) : 0}</div>
                                    </div>
                                </div>
                                <br></br>
                                <h2>Tổng quan câu hỏi</h2>
                                {examAnalyze.questions.map((question, idx) =>
                                    <div className='card shadow border-0 mt-4' key={idx}>
                                        <div className='card-header'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='font-weight-bold'>
                                                    {idx + 1}. <span>{parse(question.content || "")}</span>
                                                </div>
                                                <div>
                                                    <button className='btn btn-success rounded-pill' onClick={() => toggleModalInspect(question)}><i className='fa fa-play-circle'></i></button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='card-body'>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '60px' }}></th>
                                                        <th>Đáp án</th>
                                                        <th>Thống kê</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {question.answers.map((answer, idx2) =>
                                                        <tr className='border-top' key={idx2}>
                                                            <td>
                                                                {answer.isQuestionAnswer ? <i className='fa fa-2x fa-check-circle text-success'></i> : <i className='fa fa-2x fa-times-circle text-danger'></i>}
                                                            </td>
                                                            <td>
                                                                {answer.content}
                                                            </td>
                                                            <td>
                                                                <div className='d-flex'>
                                                                    <ProgressBar className="mt-2 mr-2 w-75" variant={answer.isQuestionAnswer ? 'success' : 'danger'} now={answer.selectCount} max={question.answers.map(val => val.selectCount).reduce((a, b) => a + b)} ></ProgressBar>
                                                                    <b style={{fontSize: '19px'}} className='pb-2'>{`${Math.round((answer.selectCount / question.answers.map(val => val.selectCount).reduce((a, b) => a + b)) * 100) || 0}%`} ({answer.selectCount}) </b>
                                                                </div>

                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>

                                        </div>
                                        <div className='card-footer'>
                                            <p>Đúng: {question.answers.find((ans) => ans.isQuestionAnswer).selectCount} <span className='ml-4'>Sai: {question.answers.filter((ans) => !ans.isQuestionAnswer).map(val => val.selectCount).reduce((a,b) => a + b)}</span></p>
                                        </div>
                                    </div>
                                )}

                            </div>
                            <br></br>
                            {Object.keys(selectQuestion).length > 0 && (
                                <Modal
                                    animation
                                    size="lg"
                                    show={modalInspect}
                                    onHide={() => setModalInspect(!modalInspect)}
                                >
                                    <Modal.Body>
                                        <div
                                            id="content"
                                            style={{ overflowY: "auto", overflowX: "hidden" }}
                                            className="modal-background"
                                        >
                                            <main id="scroll">
                                                <div className="row">
                                                    <div className="offset-md-11 col-1">
                                                        <button
                                                            className="btn btn-light rounded-circle"
                                                            onClick={() => setModalInspect(!modalInspect)}
                                                        >
                                                            <i className="fa fa-remove"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <QuestionPreview question={selectQuestion}></QuestionPreview>
                                                </div>
                                            </main>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ExamOverview;