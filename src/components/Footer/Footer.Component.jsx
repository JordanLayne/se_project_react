import './footer.styles.css'

const Footer = () =>{
    const year = new Date().getFullYear()
    return(
     
    <footer className="footer">
        <p>Developed by Practicum student Jordan Layne</p>
        <p>{year}</p>
    </footer>
    )
}

export default Footer