import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatBox } from 'react-chatbox-component';
import HeaderClient from '../../components/client/HeaderClient';
import SubMenuClient from '../../components/client/SubMenuClient';
import Footer from '../Footer/Footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import accountApiV2 from '../../api/2.0/accountApi';
import { connection } from "../../signalR/createSignalRConnection";
import notificationApiV2 from "../../api/2.0/notificationApi";
import Sharing from "../../components/managementquizs/Sharing";
import { toast } from "react-toastify";
import { Button, Modal, Container, Badge } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { seenMessages, unseenMessage } from "../../actions/authActions";
import { BsPencilSquare } from 'react-icons/bs'
import Search from './../../components/search/Search';
import { useForm } from "react-hook-form";
import { Input, VStack } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
export const Chatbox = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const account = useSelector(state => state.auth.account)
    const [boxchats, setBoxchats] = useState([])
    const [messages, setMessages] = useState([])
    const [boxchat, setBoxchat] = useState({
        messages: [],
        members: []
    })
    const [currentBoxchatMembers, setCurrentBoxchatMembers] = useState([])
    const [options, setOptions] = useState([])
    const latestChat = useRef(null);
    const latestBoxchat = useRef(null);
    const latestBoxchats = useRef(null);
    const [modalInfo, setModalInfo] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [multipleSelections, setMultipleSelections] = useState([])
    const dispatch = useDispatch();
    const [isBusy, setIsBusy] = useState(true);
    const { unseenMessages } = useSelector(state => state.auth);
    latestBoxchat.current = boxchat;
    latestChat.current = messages;
    latestBoxchats.current = boxchats;
    const createButton = useRef(null);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBoxchat, setSelectedBoxchat] = useState({})
    const chatRef = useRef(null);
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    async function fetchBoxchats() {
        const result = await accountApiV2.getUserBoxchats(account.id);
        setBoxchats(result)
    }
    useEffect(() => {
        fetchBoxchats()
        setIsBusy(false);
        setIsLoading(false);
    }, [setBoxchats])
    useEffect(() => {
        if (isRefresh) {
            fetchBoxchats();
            setIsRefresh(false);
            setSelectedBoxchat("");
        }
    }, [isRefresh])
    const sendMessage = (message) => {
        const msg = {
            boxchatId: boxchat.id,
            fromId: account.id,
            fromUsername: account.username,
            content: message,
        }
        connection.send('SendMessage', msg);
    }
    useEffect(async () => {
        var result = await notificationApiV2.getUsers();
        console.log(result);
        setOptions(result);
    }, [setOptions])
    console.log(latestBoxchat);
    useEffect(() => {
        if (connection) {
            connection.on('NewMessage', (data) => {
                const dataParsed = JSON.parse(data);
                console.log(dataParsed);
                const newMessages = [...latestChat.current]
                newMessages.push(dataParsed)
                console.log(latestBoxchat.current.id);
                if (dataParsed.boxchatId == latestBoxchat.current.id) {
                    setMessages(newMessages);
                } else {
                    if (dataParsed.sender.uid !== account.username) {
                        dispatch(unseenMessage(dataParsed));
                    }
                }
            });
            connection.on('ResponseInvite', (data) => {
           
                const dataParsed = JSON.parse(data);
                console.log(dataParsed);
                const index = latestBoxchats.current.findIndex(bc => bc.id == dataParsed.boxchatId);

                console.log(index);
                if(latestBoxchat.current.id == dataParsed.boxchatId){
                    latestBoxchat.current.members.find(mem => mem.id == dataParsed.accountId).status = dataParsed.status;
                    setBoxchat({...latestBoxchat.current});
                }
            });
            connection.on('DeleteBoxChat',() => {
                window.location.reload();
            })
        }
        return () => {
            connection.off('NewMessage');
        }
    }, [connection])
    useEffect(async () => {
        if(selectedBoxchat == ""){
            setMessages([]);
        }
        if (!isBusy && selectedBoxchat != "") {
            setIsLoading(true);
            var result = await accountApiV2.getBoxchatDetail(account.id, selectedBoxchat);
            setBoxchat(result);
            setMessages(result.messages)
            setIsLoading(false);
        }
    }, [selectedBoxchat])
    const selectBoxchat = async (id) => {
        reset();
        setSelectedBoxchat(id);
        dispatch(seenMessages(id))
    }
    const addUsersToChat = async (users) => {
        const inviteResult = await accountApiV2.inviteUsersToBoxchat(account.id, boxchat.id, users.map((user) => user.accountId));
        if (inviteResult.status === 200) {
            toast('Thành công', { type: 'success' })
        } else {
            toast('Thất bại', { type: 'error' })
        }
        console.log(users);
    }
    const user = {
        "uid": account.username
    }
    function toggleModal() {
        setModalInfo(modalInfo ? false : true)
    }
    function searchMember(query) {

    }
    async function addMember(e) {
        e.preventDefault();
        var invites = multipleSelections.map((selection) =>
            ({ id: selection.id, username: selection.username, status: 'Pending' })
        )
        const inviteResult = await accountApiV2.inviteUsersToBoxchat(account.id, boxchat.id, multipleSelections.map((selection) => selection.id));
        if (inviteResult.status == 200) {
            setBoxchat({
                ...boxchat,
                members: [...boxchat.members, ...invites]
            })
            setMultipleSelections([])
            toast('Thành công', { type: 'success' })
        } else {
            if (inviteResult.status == 204) {
                toast('Không có gì thay đổi', { type: 'info', autoClose: 2000 })
            } else {
                toast('Thất bại', { type: 'error', autoClose: 2000 });
            }
        }

    }
    function removeMember(id) {
        var remainMember = boxchat.members.filter(mem => mem.id != id);
        setBoxchat({
            ...boxchat,
            members: remainMember
        })
    }
    async function submit(data) {
        console.log(boxchat);
        const body = {
            id: boxchat.id,
            title: data.title,
            description: data.description,
        }
        const result = await accountApiV2.updateBoxchat(account.id, boxchat.id, body);
        if (result.status === 200) {
            toast('Thành công', { type: 'success' })
            setIsRefresh(true);
            toggleModal();
        } else {
            if (result.status == 204) {
                toast('Không có gì thay đổi', { type: 'info', autoClose: 2000 })
            } else {
                toast('Thất bại', { type: 'error', autoClose: 2000 });
            }
        }
    }
    function renderStatus(status) {
        switch (status) {
            case "Pending":
                return "Chờ xác nhận"
            case "Approved":
                return "Đã xác nhận"
            case "Declined":
                return "Từ chối"
            default:
                return ""
        }
    }
    const onSubmit = async data => {
        console.log(data);
        const result = await accountApiV2.createBoxChat(account.id, data);
        if (result.status == 200) {
            toast('Thành công', { type: 'success', autoClose: 2000 });
            setModalCreate(!modalCreate);
            setIsRefresh(true);
            reset();
        } else {
            if (result.status == 204) {
                toast('Không có gì thay đổi', { type: 'info', autoClose: 2000 })
            } else {
                toast('Thất bại', { type: 'error', autoClose: 2000 });
            }

        }

    };
    async function submitDelete() {
        const result = await accountApiV2.deleteBoxchat(account.id, boxchat.id);
        if (result.status == 200) {
            toast('Thành công', { type: 'success', autoClose: 2000 });
            toggleModal();
            setIsRefresh(true);
            setBoxchat({})
        }else{
            if (result.status == 204) {
                toast('Không có gì thay đổi', { type: 'info', autoClose: 2000 })
            } else {
                toast('Thất bại', { type: 'error', autoClose: 2000 });
            }
        }
    }
    return (
        <div id="wrapper">
            <SubMenuClient></SubMenuClient>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" style={{ overflow: 'auto', height: '100vh' }}>
                    <HeaderClient></HeaderClient>
                    <main id="scroll">
                        <div className='container mt-4'>
                            <div id='chat-menu'>
                                <div className="head">Giúp bạn trao đổi tốt hơn với những người dùng khác</div>
                            </div>



                            <div className='row'>
                                <div className='col p-0 pl-3 script-panel'>
                                    <div>
                                        <button onClick={() => setModalCreate(!modalCreate)} className='btn btn-light rounded-circle mt-1'><i className='fa fa-plus'></i></button>
                                    </div>
                                    {boxchats.map((bc, index) =>
                                        <div key={index} className={`card cursor-pointer mt-1 rounded shadow-sm ${selectedBoxchat == bc.id ? 'bg-primary text-white' : ''}`} onClick={(e) => selectBoxchat(bc.id)}>
                                            <div className='d-flex p-2'>
                                                <img src={bc.photoUrl || "/image/default-user-image.png"} alt="" className='chat-avatar cursor-pointer mr-2' /> <span className='badge-number'><Badge variant='info'>{unseenMessages.filter(mes => mes.boxchatId == bc.id).length}</Badge></span>

                                                <div>
                                                    <span><h6>{bc.title}</h6></span>
                                                    <small>{bc.description}</small>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                                <div className='col-8 p-0 pr-3'>
                                    <div className='chat-header d-flex justify-content-between'>
                                        <div>
                                            <h5 className='d-flex'>{boxchat.title}</h5>
                                        </div>

                                        {boxchat.id != undefined && <div onClick={() => toggleModal()}>

                                            <i className='fa fa-info-circle fa-2x cursor'></i>
                                        </div>}
                                    </div>
                                    <ChatBox ref={chatRef} user={user} onSubmit={(message) => sendMessage(message)} messages={messages} />
                                </div>
                            </div>

                            <br></br>
                        </div>
                    </main>
                    {Object.keys(boxchat).length > 0 && <Modal show={modalInfo} onHide={() => toggleModal()} size='lg' centered animation dialogClassName='sweet-alert-modal' contentClassName='modal-background rounded'>
                        <Modal.Body>
                            {boxchat.accountId == account.id ? <div className="form-group">
                                <div className="container">
                                    <form className="form-row" id="update-form" onSubmit={handleSubmit(submit)}>
                                        <div className="col-6">
                                            <p className="titleInfo">Thông tin nhóm chat</p>
                                            <div className='md-form card-input mb-3'>
                                                <Input type="text" defaultValue={boxchat.title} placeholder='Tên nhóm chat' {...register("title", { required: "Tên nhóm chat không được để trống" })} />
                                                {errors.title && <div className='invalid'>{errors.title.message}</div>}
                                            </div>
                                            <div className='md-form card-input'>
                                                <textarea type="textarea" defaultValue={boxchat.description} placeholder='Mô tả' {...register("description", { required: "Mô tả không được để trống" })} />
                                                {errors.description && <div className='invalid'>{errors.description.message}</div>}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="search">
                                                <Typeahead
                                                    id="basic-example"
                                                    multiple
                                                    labelKey='username'
                                                    onChange={
                                                        setMultipleSelections
                                                    }
                                                    options={options.filter(op => !boxchat.members.some(bc => bc.username == op.username)).map((opt) => ({ id: opt.accountId, username: opt.username }))}
                                                    placeholder="...Tìm kiếm"
                                                    selected={multipleSelections}
                                                />
                                                <button type="submit" className="searchButton" onClick={(e) => addMember(e)}>
                                                    <i className="fa fa-plus" />
                                                </button>
                                            </div>
                                            <p className="titleAccount">Danh sách tài khoản</p>
                                            <div className="boxAccount">
                                                {boxchat.members.map((mem, index) =>
                                                    <div key={index} className="card-input mt-3">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-5">
                                                                    <p>{mem.username}</p>
                                                                </div>
                                                                <div className="col-5">
                                                                    <p>{renderStatus(mem.status)}</p>
                                                                </div>
                                                                <div className="col-2" onClick={() => removeMember(mem.id)}>
                                                                    <i className='fa fa-remove'></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> :
                                <div className='form-group'>
                                    <div className='container'>
                                        <p className="titleAccount">Danh sách tài khoản</p>
                                        <div className="boxAccount">
                                            {boxchat.members.map((mem, index) =>
                                                <div key={index} className="card-input mt-3">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <p>{mem.username}</p>
                                                            </div>
                                                            <div className="col-5">
                                                                <p>{renderStatus(mem.status)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" title="Hủy" onClick={() => toggleModal()}>Trở lại</Button>
                            {boxchat.accountId == account.id && <> <Button variant="danger" title="Xóa nhóm chat" onClick={() => submitDelete()}>Xóa</Button>
                            <Button variant="primary" title="Cập nhật" form="update-form" type="submit">Lưu lại</Button> </>}
                        </Modal.Footer>
                    </Modal>}
                    {modalCreate && <Modal show={modalCreate} onHide={() => setModalCreate(!modalCreate)} size='lg' centered animation dialogClassName='sweet-alert-modal' contentClassName='rounded modal-background'>
                        <Modal.Body>
                            {/* <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label>Tên nhóm chat</label>
                                    <input type='text'></input>
                                </div>
                                <div className='form-group'>
                                    <label>Mô tả</label>
                                    <textarea type='text'></textarea>
                                </div>
                            </form> */}
                            <h5 className='text-info text-center'>Thêm nhóm chat</h5>
                            <br></br>
                            <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className='md-form card-input mb-3'>
                                    <Input type="text" placeholder='Tên nhóm chat' {...register("title", { required: "Tên nhóm chat không được để trống" })} />
                                    {errors.title && <div className='invalid'>{errors.title.message}</div>}
                                </div>
                                <div className='md-form card-input'>
                                    <textarea type="textarea" placeholder='Mô tả' {...register("description", { required: "Mô tả không được để trống" })}/>
                                    {errors.description && <div className='invalid'>{errors.description.message}</div>}
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModalCreate(!modalCreate)}>Đóng</Button>
                            <Button variant="primary" form="create-form" type='submit'>Lưu lại</Button>
                        </Modal.Footer>
                    </Modal>}
                </div>
            </div>

        </div >
    )
}