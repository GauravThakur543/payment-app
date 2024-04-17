import Button from "../components/Button"
import Heading from "../components/Heading"
import Inputbox from "../components/Inputbox"
import Subheading from "../components/Subheading"
import Warning from "../components/Warning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleClick = async() => {
        const body = {username:email, password, firstName, lastName}
        const res = await axios.post("http://localhost:3001/api/v1/user/signup", body)
        localStorage.setItem("token" , res.data.token)
        navigate("/dashboard")
    }

    return(
            <div className="flex h-screen justify-center items-center">
            <div className="shadow-lg p-6 w-[328px] border-2 rounded-lg">
                    <Heading label="Sign Up"/>
                    <Subheading label="Enter your information to create an account"/>
                    <Inputbox name="First Name" placeholder="john" onChange={(e) => {setFirstName(e.target.value)}} value={firstName}/>
                    <Inputbox name="Last Name" placeholder="Doe" onChange={(e) => {setLastName(e.target.value)}} value={lastName}/>
                    <Inputbox name="Email" placeholder="johndoe@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                    <Inputbox name="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <Button title="Sign Up" onClick={handleClick}/>
                    <Warning title="Already have an account?" btnText="Login"  to="/signin"/>
            </div>
            </div>
    )
}

export default Signup