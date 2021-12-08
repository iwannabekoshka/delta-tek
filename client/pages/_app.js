import '../styles/custom.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>{`
        $primary: red !important;
      `}</style>
    </>
  )
}

export default MyApp
