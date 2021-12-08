import { Card, Button } from 'react-bootstrap'


export default function ProductCard() {


    return (
        <>
        <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/300" />
            <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        </>
    )
}