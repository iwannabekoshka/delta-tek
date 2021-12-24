import {Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import AdminLoginForm from "../components/AdminLoginForm";
import AdminAddProductForm from "../components/AdminAddProductForm";


export default function Admin(props) {
    const [authorized, setAuthorized] = useState(false)
    const [addFormVisible, setAddFormVisible] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        let wasAuthorized = sessionStorage.getItem('adminAuthorized')
        if (wasAuthorized === 'true') {
            setAuthorized(true)
        }

        setProducts(props.products)
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
        setProducts(prev => {
            return [{
                title: formData.title,
                price: formData.price,
                currency: '$',
                image: '/img/flashhider.png',
                id: Date.now(),
            }, ...prev]
        })

        postData('http://localhost:3200/goods', {
            title: formData.title,
            price: formData.price,
            currency: '$',
            image: '/img/flashhider.png',
            id: Date.now(),
        })
            .then(data => console.log(data))
    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    async function deleteData(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    const deleteItem = (event) => {
        const id = event.target.getAttribute('data-id')

        setProducts(prev => {
            return [...prev].filter(item => item.id != id)
        })

        deleteData(`http://localhost:3200/goods/${id}`)
            .then(data => console.log(data))
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

                        <ul className="list-group shadow-sm rounded-2 mb-4">
                            {
                                products.map(product => {
                                    return  <li className="list-group-item d-flex align-items-center justify-content-between" key={product.id}>
                                                <img src={product.image} alt=""/>
                                                {product.title}
                                                <span>{product.price}{product.currency}</span>
                                                <button className="btn btn-danger" onClick={deleteItem} data-id={product.id}>Удалить</button>
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

        <style jsx>{`
          .list-group-item img {
            width: 100px;
          }
        `}</style>
    </>)
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3200/goods`)
    const products = await res.json()

    return {
        props: {
            products: products
        }
    }
}