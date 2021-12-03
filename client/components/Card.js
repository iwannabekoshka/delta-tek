import styled from "styled-components"
import Link from "next/link"


const CardWrapper = styled.div`
    padding: 20px;
`
export default function Card() {
  return (
    <CardWrapper>
      <div class="card">
        <img
          class="card-img-top"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg"
          alt="Card image cap"
          width="100"
        />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link href="/product/1">
            <a class="btn btn-primary">
                Go somewhere
            </a>
          </Link>
        </div>
      </div>
    </CardWrapper>
  )
}
