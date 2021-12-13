

export default function Contacts() {
    return (
        <>
            <div className="contacts row g-4">
                <div className="col-12 col-md-6">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col">Address: </div>
                                <div className="col">Россия, Тула, Сызранская улица, 5А</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col">Whatsapp: </div>
                                <div className="col">+7-487-279-28-18</div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col">E-mail: </div>
                                <div className="col">delta-tek@gmail.com</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-12 col-md-6">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A01e72b9c5a60031b358bf373c4df10aadf3a24b71d16c0849cd89a5929039d27&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
                </div>
            </div>
        </>
    )
}