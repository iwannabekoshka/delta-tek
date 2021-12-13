import Link from 'next/link'
import { Card, Button } from 'react-bootstrap'


export default function ProductCard({ 
    imageUrl='img/flashhider.png', 
    title='Flashhider', 
    text='Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
    id='1' }) {

    if (id == 2) {
        imageUrl='img/flashhider2.png'
        text='lorem ipsum 25'
    }
    if (id == 3) {
        imageUrl='img/flashhider3.png'
    }


    return (
        <div className="p-2">
            <Card className="rounded-0">
                <div className="card-img-wrapper">
                    <img src={imageUrl} />
                </div>
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="h-100">{text}</Card.Text>
                    <div className="buttons d-flex justify-content-between">
                        <Link href={`/products/${id}`}>
                            <Button variant="primary">Read more...</Button>
                        </Link>

                        <Link href={`/`}>
                            <Button variant="primary">Add to Cart</Button>
                        </Link>
                    </div>
                    
                </Card.Body>
            </Card>

            <style jsx>{`
                .card-img-wrapper {
                    height: 300px;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card-img-wrapper img {
                    max-width: 100%;
                    max-height: 100%;
                }
            `}</style>
        </div>
    )
}