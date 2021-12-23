import {Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import AdminLoginForm from "../components/AdminLoginForm";
import AdminAddProductForm from "../components/AdminAddProductForm";


export default function Admin() {
    const [authorized, setAuthorized] = useState(false)
    const [addFormVisible, setAddFormVisible] = useState(false)
    const [products, setProducts] = useState([{title: '1'}, {title: '2'}, {title: '3'}])

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

    const submitAddForm = (formData) => {
        console.log(formData)

        setProducts(prev => {
            return [...prev, {title: formData.title}]
        })
    }

    const deleteItem = (event) => {
        const title = event.target.getAttribute('data-id')

        setProducts(prev => {
            return [...prev].filter(item => item.title !== title)
        })
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

                        <AdminAddProductForm
                            addFormVisible={addFormVisible}
                            submitAddForm={submitAddForm}
                        />

                        <ul className="list-group shadow-sm rounded-2">
                            {
                                products.map(product => {
                                    return <li className="list-group-item d-flex align-items-center justify-content-between">
                                        {product.title}
                                        <button className="btn btn-danger" onClick={deleteItem} data-id={product.title}>Удалить</button>
                                    </li>
                                })
                            }
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