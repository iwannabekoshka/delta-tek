import {Tab, Tabs} from "react-bootstrap";
import {useState} from "react";


export default function Admin() {
    const [authorized, setAuthorized] = useState(false)
    const [addFormVisible, setAddFormVisible] = useState(false)

    const submitFormLogin = (event) => {
        event.preventDefault()

        setAuthorized(true)
    }

    const toggleAddForm = () => {
        setAddFormVisible(prev => !prev)
    }

    return (<>
        <div className="container">
            {!authorized ?
                <form onSubmit={submitFormLogin} className="w-50 mx-auto">
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Логин</label>
                        <input type="text" className="form-control" id="login"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Войти</button>
                </form>
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