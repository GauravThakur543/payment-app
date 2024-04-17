import { useState, useEffect } from "react"
import User from "../components/User"
import axios from 'axios'
import { firstName, lastName } from "../atoms"

const Dashboard = ({}) => {
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const id = setTimeout(() => {
            axios.get(`http://localhost:3001/api/v1/user/bulk?filter=${filter}`).then(res => {
                setUsers(res.data.users)})
        }, 2000)

        return () => clearInterval(id)
    },[filter])

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get("http://localhost:3001/api/v1/account/balance", {headers: {'Authorization': `Bearer ${token}`}}).then((res) => {
            setBalance(res.data.msg)})
    }, [balance])

    const handleChange = (e) => {
        setFilter(e.target.value)
    }

    return(
        <div className="px-3 mt-4">
            <div className="flex justify-between border-b-2 pb-3">
                <h1 className="font-bold text-2xl">Payments App</h1>
                <div className="font-bold flex items-center">
                    <p>Hello</p> 
                    <p className="ml-2 bg-slate-200 rounded-full w-9 h-9 flex justify-center items-center">U</p>
                </div>
            </div>
            <div className="font-bold mt-2 text-xl pb-3">
                Your Balance Rs.{balance}
            </div>
            <div>
                <h2 className="font-bold text-xl pb-2">Users</h2>
                <input placeholder="Search users..." className="border-2 w-full p-1" onChange={handleChange} value={filter}/>
            </div>
            <div >
               {
                users.map(user => {
                   return <User key={user.id} firstName={user.firstName} lastName={user.lastName} id={user.id}/>
                })
               }
            </div>
        </div>
    )
}

export default Dashboard