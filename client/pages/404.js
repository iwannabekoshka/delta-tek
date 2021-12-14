import Layout from '../layouts/Layout'
import Section from '../components/Section'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

export default function page404() {


    return (
        <Layout>
            <Section title='Page not found' border={false}>
                <Link href="/">
                    <a>Go to main page</a>
                </Link>
            </Section>
        </Layout>
    )
}