import Button from "../components/Button"
import Inputbox from "../components/Inputbox"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Send = () => {
    const [name, setName] = useState("")
    const [receiver, setReceiver] = useState("")
    const [amount, setAmount] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const getAccount = async () => {
            let queryString = window.location.search
            let queryParams = new URLSearchParams(queryString)
            let id = queryParams.get('id')
            let name = queryParams.get('name')
            setName(name)
            const res = await axios.get(`http://localhost:3001/api/v1/account/fetchAcc?id=${id}`)
            setReceiver(res.data.account)
        }
        getAccount()
    } ,[])

    const handleClick = async() => {
        const token = localStorage.getItem("token")
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        await axios.post("http://localhost:3001/api/v1/account/transfer",{to: receiver._id, amount: Number(amount)}, options)
        navigate("/dashboard")
        
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="shadow-lg border p-5 rounded-lg">
                <h2 className="font-bold text-center text-2xl mb-10 w-72">Send Money</h2>
                <div>
                    <div className="flex">
                        <p className="w-10 h-10 rounded-full bg-green-500 text-white justify-center items-center flex mr-3">{name[0]}</p>
                        <p className="font-bold text-xl">{name}</p>
                    </div>
                   <Inputbox name="Amount(in Rs.)" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    <button className="text-white bg-green-500 w-full py-2 mt-4 rounded-md" onClick={handleClick}>Initiate Transfer</button>
                </div>
            </div>
        </div>
    )
}


export default Send