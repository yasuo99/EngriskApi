import { useState } from "react";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import SubMenu from "../../components/admin/SubMenu";
import HeaderClient from "../../components/client/HeaderClient";
import { ExamCreatePosition } from "../../constants/ExamCreaatePosition";
import ExamSubMenu from "./ExamSubMenu";
import { useForm } from "react-hook-form";
import ExamQuestionMenu from "./ExamQuestionMenu";
const NewExamCreate = () => {
    const [position, setPosition] = useState(ExamCreatePosition.START);
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset, unregister } = useForm();
    return (
        <div id="wrapper">
            <SubMenu></SubMenu>
            <ExamSubMenu change={setPosition}></ExamSubMenu>
            <div id="content-wrapper" className="d-flex flex-column">
                {/* <SubMenuClient></SubMenuClient> */}
                <div id="quiz">
                    <div id="content">
                        <HeaderAdmin></HeaderAdmin>
                        <main id="home">
                            <div className='container-fluid'>
                                {position == ExamCreatePosition.START && <div className='text-dark'>
                                    <h3 className='mb-2'>Thông tin</h3>
                                    <div>Tên bài exam *</div>
                                    <div className="wrap-input100 mb-3">
                                        <input className="input100" name="title" placeholder='Nhập tiêu đề exam...' {...register('title',
                                            {
                                                required: 'Tên exam không được để trống',
                                            })}
                                            type="text"
                                            id="title"
                                            autoComplete="off"
                                        ></input>
                                        {errors.title && <div className='invalid'>{errors.title.message}</div>}
                                    </div>
                                    <div>Mô tả exam *</div>
                                    <div className="wrap-input100 mb-3">
                                        <textarea className="rounded border p-2" style={{ width: '100%' }} name="title" placeholder='Nhập mô tả exam...' {...register('description',
                                            {
                                                required: 'Mô tả exam không được để trống',
                                            })}
                                            type="text"
                                            id="description"
                                            autoComplete="off"
                                        ></textarea>
                                        {errors.description && <div className='invalid'>{errors.description.message}</div>}
                                    </div>
                                    <div>Thời gian làm bài *</div>
                                    <div className="wrap-input100 mb-3">
                                        <div class="input-group mb-2">
                                            <input type="number" min="10" max="120" defaultValue="10" class="form-control" placeholder="Thời gian làm bài..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2">Phút</span>
                                            </div>
                                        </div>          
                                    </div>
                                    <button className="btn btn-success rounded-pill save-btn">Lưu</button>
                                </div>}
                                {position == ExamCreatePosition.QUESTION && <ExamQuestionMenu></ExamQuestionMenu>}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewExamCreate;