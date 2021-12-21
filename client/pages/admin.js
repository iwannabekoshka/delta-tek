import {Tab, Tabs} from "react-bootstrap";
import {useState} from "react";


export default function Admin() {
    const [authorized, setAuthorized] = useState(false)

    const submitForm = (event) => {
        event.preventDefault()

        setAuthorized(true)
    }

    return (<>
        <div className="container">
            {!authorized ?
                <form onSubmit={submitForm} className="w-50 mx-auto">
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