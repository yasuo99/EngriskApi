import { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { ScriptTypes } from "../../constants/ScriptTypes";
import parse from "html-react-parser";
const StartPhaseScreen = ({ type, start }) => {
  const [text, setText] = useState("");
  const [icon, setIcon] = useState("");
  console.log(type);
  useEffect(() => {
    switch (type) {
      case ScriptTypes.CONVERSATION:
        setText(
          '<h2 class="d-flex justify-content-center">Hội thoại</h2><p>Học cách sử dụng từ vựng vào các cuộc hội thoại</p>'
        );
        setIcon(
          "<span class='icon'> <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 30 30'> <path fill-rule='evenodd' d='M15.302 3.236c7.303 0 13.246 4.88 13.246 10.877 0 5.998-5.942 10.878-13.246 10.878-1.513 0-2.993-.207-4.404-.615l-7.105 3.297c-.462.22-.963-.273-.726-.745l2.66-5.296c-2.37-2.032-3.67-4.687-3.67-7.519 0-5.997 5.942-10.877 13.245-10.877zm-1.1 12.657a2.761 2.761 0 0 1-2.763 2.752.551.551 0 1 1 0-1.101 1.66 1.66 0 0 0 1.66-1.65v-1.102H9.231a.546.546 0 0 1-.549-.55V9.84a.546.546 0 0 1 .549-.55h4.415c.304 0 .552.246.555.55v6.053zm7.723 0a2.759 2.759 0 0 1-2.76 2.752.551.551 0 1 1 0-1.101c.913 0 1.656-.74 1.656-1.65v-1.102h-3.863a.546.546 0 0 1-.549-.55V9.84a.546.546 0 0 1 .549-.55h4.415c.305 0 .552.246.555.55l-.003 6.053zM9.787 10.39v3.302h3.311V10.39H9.787zm7.726 0v3.302h3.311V10.39h-3.31z'></path></svg> </span>"
        );
        break;
      case ScriptTypes.LISTENING:
        setText(
          "<h2 class='d-flex justify-content-center'>Kĩ năng nghe</h2><p class='d-flex justify-content-center'>Luyện nghe thông qua các câu hỏi</p>"
        );
        setIcon(
          "<span class='icon'> <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 30 30'> <path fill-rule='evenodd' d='M15.5 3C22.943 3 29 7.982 29 14.104c0 6.122-6.056 11.103-13.5 11.103-1.542 0-3.051-.211-4.489-.627L3.77 27.945c-.475.225-.98-.284-.74-.76l2.71-5.406C3.325 19.705 2 16.995 2 14.104 2 7.982 8.056 3 15.5 3zm-5.903 7.974a.843.843 0 0 0-.844.841v5.059a.843.843 0 0 0 1.688 0v-5.059a.843.843 0 0 0-.844-.841zm11.813 0a.843.843 0 0 0-.844.841v5.059a.843.843 0 0 0 1.687 0v-5.059a.843.843 0 0 0-.843-.841zm-5.625-.562a.843.843 0 0 0-.844.842v6.181a.843.843 0 0 0 1.687 0v-6.181a.843.843 0 0 0-.843-.842zm-3.375 1.685a.843.843 0 0 0-.844.842v2.811a.843.843 0 0 0 1.687 0V12.94a.843.843 0 0 0-.843-.842zm6.187 0a.843.843 0 0 0-.844.842v2.811a.843.843 0 0 0 1.688 0V12.94a.843.843 0 0 0-.844-.842z'></path></svg> </span>"
        );
        break;
      case ScriptTypes.READING:
        setText(
          "<h2 class='d-flex justify-content-center'>Kĩ năng đọc</h2><p class='d-flex justify-content-center'>Luyện kĩ năng đọc thông qua các câu hỏi</p>"
        );
        setIcon(
          "<span class='icon'> <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 120 137'> <path fill-rule='evenodd' d='M7.514 0h74.85c.955.63 1.866 1.323 2.727 2.077C96 13.007 106.909 23.91 117.818 34.787a6.059 6.059 0 0 1 1.896 4.618v87.91c0 5.78-3.505 9.332-9.26 9.332H9.546c-5.768 0-9.245-3.511-9.259-9.318V55.692 9.004A8.468 8.468 0 0 1 7.05.232c.162-.061.317-.139.464-.232zm78.109 34.158h19.09L85.624 15.03v19.128zm-25.5 51.265l-.014-.013H30.286a4.23 4.23 0 0 0-4.398 3.765 4.234 4.234 0 0 0 3.471 4.638c.482.08.97.111 1.46.095h58.186a8.166 8.166 0 0 0 1.595-.082 4.234 4.234 0 0 0 3.467-4.63 4.23 4.23 0 0 0-4.38-3.773H60.122zm-.26 25.592V111h29.455c2.85 0 4.773-1.735 4.773-4.25 0-2.513-1.964-4.276-4.773-4.276H30.682c-2.85 0-4.76 1.776-4.76 4.29 0 2.515 1.95 4.25 4.773 4.25h29.169zM60 68.317v-.041H30.545a4.322 4.322 0 0 0-4.336 2.733c-1.09 2.937.996 5.793 4.364 5.793h59.25a4.23 4.23 0 0 0 4.217-3.852 4.234 4.234 0 0 0-3.454-4.551 9.39 9.39 0 0 0-1.718-.082H60zM42.94 51.265c-4.13 0-8.25-.014-12.38 0a4.252 4.252 0 0 0-3.968 2.02 4.27 4.27 0 0 0 0 4.459 4.252 4.252 0 0 0 3.967 2.02h24.655c2.85 0 4.759-1.736 4.772-4.25.014-2.514-1.922-4.249-4.772-4.249H42.94z'></path></svg> </span>"
        );
        break;
      case ScriptTypes.GRAMMAR:
        setText(
          "<h2 class='d-flex justify-content-center'>Ngữ pháp</h2><p class='d-flex justify-content-center'>Học cách sử dụng ngữ pháp</p>"
        );
        setIcon(
          "<span class='icon'> <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 30 30'> <path fill-rule='evenodd' d='M23.646 27.076L25.59 29H5.84C4.275 29 3 27.737 3 26.187V4.812C3 3.262 4.274 2 5.84 2H25.16c.313 0 .568.252.568.562 0 .311-.255.563-.568.563H5.84c-.94 0-1.705.757-1.705 1.687S4.901 6.5 5.841 6.5h19.318c.313 0 .568.252.568.562V18.14a6.264 6.264 0 0 0-5.112-2.64c-3.447 0-6.251 2.775-6.251 6.187 0 3.412 2.804 6.188 6.25 6.188a6.135 6.135 0 0 0 3.032-.799zM5.841 4.25h18.181c.314 0 .569.252.569.562 0 .311-.255.563-.569.563H5.841a.566.566 0 0 1-.568-.563c0-.31.254-.562.568-.562zm21.993 23.789a.56.56 0 0 1 0 .796.573.573 0 0 1-.804 0l-3.243-3.21a5.1 5.1 0 0 1-3.172 1.125c-2.82 0-5.115-2.273-5.115-5.063 0-2.79 2.294-5.062 5.115-5.062 2.819 0 5.112 2.271 5.112 5.062 0 1.193-.436 2.276-1.136 3.142l3.243 3.21zm-7.22-2.414c2.193 0 3.977-1.766 3.977-3.938 0-2.17-1.784-3.937-3.976-3.937-2.195 0-3.979 1.766-3.979 3.937 0 2.172 1.784 3.938 3.979 3.938z'></path></svg> </span>"
        );
        break;
      case ScriptTypes.WRITING:
        setText(
          "<h2 class='d-flex justify-content-center'>Kĩ năng viết</h2><p class='d-flex justify-content-center'>Luyện kĩ năng viết thông qua các câu hỏi</p>"
        );
        setIcon(
          "<span class='icon'> <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 30 30'>  <path d='M2.343 74.847a1.492 1.492 0 0 1-.762-1.827L12.915 39H1.5c-.504 0-.972-.246-1.242-.669a1.47 1.47 0 0 1-.14-1.404l14.998-36A1.491 1.491 0 0 1 16.5 0h14.25c.504 0 .984.258 1.254.681.282.432.327.972.117 1.428L20.318 28.5h11.18a1.52 1.52 0 0 1 1.324.786c.258.48.237 1.077-.07 1.533l-28.498 43.5a1.497 1.497 0 0 1-1.911.528z' fill-rule='evenodd'></path></svg> </span>"
        );
        break;
      case ScriptTypes.VOCABULARY:
        setText(
          "<h2 class='d-flex justify-content-center'>Từ vựng</h2><p class='d-flex justify-content-center'>Học và ôn tập từ vựng</p>"
        );
        setIcon(
          "<span class='icon'> <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 30 30'> <path id='a' d='M6.18 2h17.64A2.17 2.17 0 0 1 26 4.16v17.28a2.17 2.17 0 0 1-2.18 2.16H6.18A2.17 2.17 0 0 1 4 21.44V4.16A2.17 2.17 0 0 1 6.18 2zm15.477 27H8.343c-.48 0-.87-.363-.87-.81 0-.447.39-.81.87-.81h13.314c.48 0 .87.363.87.81 0 .447-.39.81-.87.81zm-15.05-4.32h16.787c.48 0 .87.363.87.81 0 .447-.39.81-.87.81H6.606c-.48 0-.87-.363-.87-.81 0-.447.39-.81.87-.81zm8.33-8.477a.744.744 0 0 1 .676 0l1.765.902a.744.744 0 0 0 .46.07.706.706 0 0 0 .592-.811l-.338-1.913a.69.69 0 0 1 .208-.622l1.432-1.355a.696.696 0 0 0 .21-.402.707.707 0 0 0-.612-.797l-1.976-.28a.723.723 0 0 1-.546-.384l-.883-1.739a.735.735 0 0 0-1.3 0l-.883 1.739a.723.723 0 0 1-.546.385l-1.976.279a.733.733 0 0 0-.414.204.688.688 0 0 0 .012.995l1.432 1.355a.69.69 0 0 1 .208.622l-.338 1.913a.685.685 0 0 0 .073.446.736.736 0 0 0 .979.295l1.765-.902z'></path></svg> </span>"
        );
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className="mt-4 align-self-center">
      <div className="d-flex justify-content-center">
        <div className="bg-primary rounded-circle activity-circle-logo d-flex justify-content-center">
          {parse(icon)}
        </div>
      </div>

      <div>{parse(text)}</div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-lg feedback-bar-btn-success rounded-pill"
          onClick={() => start()}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};
export default StartPhaseScreen;
