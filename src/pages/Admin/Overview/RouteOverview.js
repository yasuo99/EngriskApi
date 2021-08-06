import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import SubMenu from "../../../components/admin/SubMenu";
import Chart from 'react-apexcharts'
import { useEffect, useState } from "react";
import { Link } from "react-browser-router";
import { ProgressBar } from "react-bootstrap";
import routeApi from "../../../api/2.0/routeApi";
const RouteOverview = () => {
    const [overview, setOverview] = useState({
        totalRoute: 0,
        totalSection: 0,
        totalParticipate: 0,
        totalDone: 0,
        donePie: {},
        progress: {},
        routes: []
    });
    const [pieChart, setPieChart] = useState({
        series: [100, 45, 55],
        options: {
            chart: {
                width: 400,
                type: 'pie',
            },
            labels: ['Tham gia', 'Chưa hoàn thành', 'Hoàn thành'],
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
    const [donutChart, setDonutChart] = useState({
        series: [100, 44, 55, 13, 43, 22, 33, 22, 33, 44],
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            labels: ['0 - 10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
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
    const [progressChart, setProgressChart] = useState({
        series: [{
            name: "Lượt học",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 300,
                type: 'line',
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Biểu đồ lưu lượng học',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
    })
    useEffect(() => {
        async function fetchData() {
            const result = await routeApi.getOverview();
            setOverview(result);
            var newSeries = []
            var newLabels = []
            Object.keys(result.progress).forEach((key) => {
                newSeries.push(result.progress[key]);
                newLabels.push(key)
            });
            console.log(newLabels);
            console.log(newSeries);
            setProgressChart({
                ...progressChart,
                series: [{ ...progressChart.series, data: newSeries }],
                options: {
                    ...progressChart.options,
                    xaxis: {
                        ...progressChart.options.xaxis,
                        categories: newLabels.map((value) => value.slice(0, 10))
                    }
                }
            })
        }
        fetchData();
    }, [setOverview])

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
                                <Link to="/admin/quan-ly-lo-trinh"> <i className='fa fa-chevron-left'></i>Trở lại</Link>
                                <h2 className='mb-3'>Thống kê</h2>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số lượng lộ trình học</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{overview.totalRoute}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fa fa-user fa-2x text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số lượng học viên</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{overview.totalParticipate}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fa fa-book fa-2x text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số lượng bài học</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{overview.totalSection}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fa fa-book fa-2x text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số lộ trình hoàn thành</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{overview.totalDone}</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fa fa-book fa-2x text-gray-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2>Phân tích</h2>
                                <div className="d-flex justify-content-center">
                                    <div className="card mr-4 p-3">
                                        <h3>Lưu lượng học</h3>
                                        <div className='card-body'>
                                            <Chart options={progressChart.options} series={progressChart.series} type="bar" height={400} width={1500} />
                                        </div>
                                    </div>
                                </div>
                                <h2>Chi tiết</h2>
                                <div>
                                    {overview.routes.map((val, idx) =>
                                        <div className='card shadow-sm mt-2' key={idx}>
                                            <div className='card-header'>
                                                Lộ trình: {val.title}
                                            </div>
                                            <div className='card-body'>
                                                <div className="d-flex justify-content-between">
                                                    <b>Số bài học {val.sections.length}</b>
                                                    <Link className='btn btn-primary rounded-pill' to={`/admin/quan-ly-lo-trinh/${val.id}/analyze`}>Chi tiết</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RouteOverview;