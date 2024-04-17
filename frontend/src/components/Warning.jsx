import { Link } from "react-router-dom"

const Warning = ({title, btnText, to}) => {
    return(
        <div className="flex justify-center font-bold mt-4">
            <p>{title} <Link to={to} className="underline">{btnText}</Link></p>
        </div>
    )
}

export default Warning