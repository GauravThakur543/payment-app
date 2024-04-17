import Buttonsmall from "./Buttonsmall"
import { useNavigate } from 'react-router-dom'

const User = ({firstName, lastName, id}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/send?id=${id}&name=${firstName + ' ' + lastName}`)
    }
    return(
        <div className="mt-3 flex justify-between">
            <div className="flex items-center w-40 justify-between">
                <p className="ml-2 bg-slate-200 rounded-full w-8 h-8 flex justify-center items-center">{firstName[0]}</p>
                <p>{firstName} {lastName}</p>
            </div>
            <Buttonsmall title="Send Money" onClick={handleClick}/>
        </div>
    )
}


export default User