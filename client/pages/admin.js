import { env } from 'process'
import { Tab, Tabs } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import AdminLoginForm from '../components/AdminLoginForm'
import AdminAddProductForm from '../components/AdminAddProductForm'

// const BACK_HOST = process.env.BACK_HOST
// const BACK_PORT = process.env.BACK_PORT

export default function Admin(props) {
    const BACK_HOST = props.BACK_HOST
    const BACK_PORT = props.BACK_PORT

    const [authorized, setAuthorized] = useState(false)
    const [products, setProducts] = useState(props.products)

    useEffect(() => {
        let wasAuthorized = sessionStorage.getItem('adminAuthorized')
        if (wasAuthorized === 'true') {
            setAuthorized(true)
        }
    }, [])

    const submitFormLogin = async (formData) => {
        // const response = await fetch(`http://${BACK_HOST}:${BACK_PORT}/api/auth/login`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ formData }),
        // })
        //
        // // sessionStorage.setItem('accessToken', response.accessToken)
        // console.log(response)

        setAuthorized(true)
        sessionStorage.setItem('adminAuthorized', 'true')
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

        // setProducts(prev => {
        //     return [...prev, formData]
        // })
    }


    return (<>
        <div className='container pb-3'>
            {!authorized ?
                <AdminLoginForm
                    submitFormLogin={submitFormLogin}
                />
                :
                <Tabs defaultActiveKey='goods' className='mb-3'>
                    <Tab eventKey='goods' title='Товары'>
                        <AdminAddProductForm
                            submitAddForm={submitAddForm}
                        />

                        <ul className='list-group shadow-sm rounded-2'>
                            {products.map(product => {
                                return  <li className='list-group-item' key={product._id}>
                                            {product.name}
                                        </li>
                                }
                            )}
                        </ul>
                    </Tab>
                    <Tab eventKey='orders' title='Заказы'>
                        <ul className='list-group shadow-sm rounded-2'>

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
            products: data,
            BACK_HOST: process.env.BACK_HOST,
            BACK_PORT: process.env.BACK_PORT,
        }, // will be passed to the page component as props
    }
}