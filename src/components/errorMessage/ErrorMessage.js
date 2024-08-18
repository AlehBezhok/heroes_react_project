import img from './404.png'

const ErrorMessage = () => {
    return (
        <img style={{display:'block', width: "400px", height:"250px", objectFit:'contain', margin: "0 auto"}} src={img} alt="Error"/>
    )
}

export default ErrorMessage;