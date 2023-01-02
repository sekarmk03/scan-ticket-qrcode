import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const {id} = useParams();

    const handleSubmit = async  (e) => {
        e.preventDefault();
        const response = await axios.post('https://flytick-dev.up.railway.app/api/auth/login', {
            email, password
        })

        localStorage.setItem('token', response.data.data.token);
        navigate(`/admin/verification/${id}`)
    }

  return (
    <div className='h-[50vh]  flex justify-center items-center'>
        
        <form onSubmit={handleSubmit} className='border border-solid w-1/2 border-green-200 p-3'>
        <h1 className='text-green-600 text-center mb-5 font-bold text-lg'>Login Form</h1>
            <div className='flex flex-col gap-3'>
                <label htmlFor="Email">Email</label>
                <div className='p-3 w-full rounded-full border border-solid border-green-400 '>
                    <input type="email" className='w-full focus:outline-none' id='Email' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} required />
                </div>
            </div>
            <div className='flex flex-col gap-3 mt-2'>
                <label htmlFor="Password">Password</label>
                <div className='p-3 w-full rounded-full border border-solid border-green-400 '>
                    <input type="password" className='w-full focus:outline-none' id='Password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}  required/>
                </div>
            </div>
                <button type="submit" className='w-full rounded-full bg-green-200 text-green-600 text-center py-2 mt-3'>Submit</button>
        </form>
    </div>
  )
}

export default Login