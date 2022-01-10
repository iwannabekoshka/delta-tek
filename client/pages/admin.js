import { env } from 'process'
import { Tab, Tabs } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import AdminLoginForm from '../components/AdminLoginForm'
import AdminAddProductForm from '../components/AdminAddProductForm'

const BACK_HOST = process.env.BACK_HOST
const BACK_PORT = process.env.BACK_PORT

export default function Admin(props) {
    console.log(props.products)
    const [authorized, setAuthorized] = useState(false)
    const [addFormVisible, setAddFormVisible] = useState(false)

    useEffect(() => {
        let wasAuthorized = sessionStorage.getItem('adminAuthorized')
        if (wasAuthorized === 'true') {
            setAuthorized(true)
        }
    }, [])

    const submitFormLogin = (formData) => {
        setAuthorized(true)
        sessionStorage.setItem('adminAuthorized', 'true')
    }

    const toggleAddForm = () => {
        setAddFormVisible(prev => !prev)
    }

    const submitAddForm = async (formData) => {
        const response = await fetch(`http://${BACK_HOST}:${BACK_PORT}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData, image: 'image', specifications: [{
                    name: 'test',
                    value: 'test1',
                }],
            }),
        })
    }


    return (<>
        <div className='container'>
            {!authorized ?
                <AdminLoginForm
                    submitFormLogin={submitFormLogin}
                />
                :
                <Tabs defaultActiveKey='goods' className='mb-3'>
                    <Tab eventKey='goods' title='Товары'>
                        <button className='btn btn-primary mb-2' onClick={toggleAddForm}>
                            {!addFormVisible ? 'Добавить' : 'Скрыть форму добавления'}
                        </button>

                        <AdminAddProductForm
                            addFormVisible={addFormVisible}
                            submitAddForm={submitAddForm}
                        />

                        <ul className='list-group shadow-sm rounded-2'>
                            {props.products.map(product => {
                                return  <li className='list-group-item' key={product._id}>
                                            {product.name}
                                        </li>
                                }
                            )}
                        </ul>
                    </Tab>
                    <Tab eventKey='orders' title='Заказы'>
                        <ul className='list-group shadow-sm rounded-2'>
                            <li className='list-group-item'>1 заказ</li>
                            <li className='list-group-item'>2</li>
                            <li className='list-group-item'>3</li>
                            <li className='list-group-item'>4</li>
                            <li className='list-group-item'>5</li>
                        </ul>
                    </Tab>
                </Tabs>
            }
        </div>
    </>)
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3300/api/products`)
    const data = await res.json()

    // if (!data) {
    //     return {
    //         notFound: true,
    //     }
    // }

    return {
        props: {
            products: data
        }, // will be passed to the page component as props
    }
}