


export default function Video() {

    return (
        <>
            <div className="video__wrapper">
                <iframe src="https://www.youtube.com/embed/1guKRaLzlok" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
            

            <style jsx>{`
                .video__wrapper {
                    position: relative;
                    height: 80vh;
                }
                iframe {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    )
}