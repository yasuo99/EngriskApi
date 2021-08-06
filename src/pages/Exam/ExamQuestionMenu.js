
import { Tab, Tabs } from 'react-bootstrap';
const ExamQuestionMenu = () => {
    return (
        <div className='text-dark' id="questionTab" a>
            <h3>Câu hỏi</h3>
            <Tabs defaultActiveKey="overview"  className="mb-3">
                <Tab eventKey="overview" title="Tổng quan" tabClassName="pl-0 border-0 bg-none font-weight-bold">
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-'></button>
                    </div>
                </Tab>
                <Tab eventKey="questionbank" title="Ngân hàng câu hỏi" tabClassName="pl-0 border-0 bg-none font-weight-bold">
                    123213
                </Tab>
            </Tabs>
        </div>
    )
}
export default ExamQuestionMenu