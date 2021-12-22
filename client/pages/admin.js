import {Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import AdminLoginForm from "../components/AdminLoginForm";


export default function Admin() {
    const [authorized, setAuthorized] = useState(false)
    const [addFormVisible, setAddFormVisible] = useState(false)

    useEffect(() => {
        let wasAuthorized = sessionStorage.getItem('adminAuthorized')
        if (wasAuthorized === 'true') {
            setAuthorized(true)
        }
    }, [])

    const submitFormLogin = (formData) => {
        console.log(formData)

        setAuthorized(true)
        sessionStorage.setItem('adminAuthorized', 'true')
    }

    const toggleAddForm = () => {
        setAddFormVisible(prev => !prev)
    }

    return (<>
        <div className="container">
            {!authorized ?
                <AdminLoginForm
                    submitFormLogin={submitFormLogin}
                />
            :
                <Tabs defaultActiveKey="goods" className="mb-3">
                    <Tab eventKey="goods" title="Товары">
                        <button className="btn btn-primary mb-2" onClick={toggleAddForm}>
                            {!addFormVisible ? 'Добавить' : 'Скрыть форму добавления'}
                        </button>

                        <form className={`border shadow-sm rounded-2 p-2 bg-white mb-2 ${!addFormVisible && 'collapse'}`}>
                            <div className="mb-3">
                                <label htmlFor="text" className="form-label">Наименование</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Описание</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Изображение</label>
                                <input className="form-control" type="file" id="image" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Добавить</button>
                            </div>
                        </form>

                        <ul className="list-group shadow-sm rounded-2">
                            <li className="list-group-item">1 Товар</li>
                            <li className="list-group-item">2</li>
                            <li className="list-group-item">3</li>
                            <li className="list-group-item">4</li>
                            <li className="list-group-item">5</li>
                        </ul>
                    </Tab>
                    <Tab eventKey="orders" title="Заказы">
                        <ul className="list-group shadow-sm rounded-2">
                            <li className="list-group-item">1 заказ</li>
                            <li className="list-group-item">2</li>
                            <li className="list-group-item">3</li>
                            <li className="list-group-item">4</li>
                            <li className="list-group-item">5</li>
                        </ul>
                    </Tab>
                </Tabs>
            }
        </div>
    </>)
}