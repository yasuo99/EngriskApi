import { Link } from "react-browser-router"
import { RiQuestionnaireLine } from 'react-icons/ri'
import { GiEntryDoor } from 'react-icons/gi'
import { ImEnter } from 'react-icons/im'
import { ExamCreatePosition } from "../../constants/ExamCreaatePosition"
const ExamSubMenu = ({change}) => {
    return (
        <ul
            className={`navbar-nav bg-info sidebar sidebar-dark accordion exam-sub-menu align-items-center`}
            id="accordionSidebar" style={{ width: '7.5rem !important' }}
        >
            <li className="nav-item">
                <Link
                    className="nav-link"
                    to="#"
                    onClick={() => change(ExamCreatePosition.START)}
                >
                    <ImEnter></ImEnter>
                    <span>Trang bắt đầu</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link "
                    to="#"
                    onClick={() => change(ExamCreatePosition.QUESTION)}
                >
                    <RiQuestionnaireLine></RiQuestionnaireLine>
                    <span>Câu hỏi</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    to="#"
                >
                    <GiEntryDoor></GiEntryDoor>
                    <span>Trang kết thúc</span>
                </Link>
            </li>
        </ul>
    )
}
export default ExamSubMenu