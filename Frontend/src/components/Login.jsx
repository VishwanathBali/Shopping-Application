import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from "react-router-dom"
import { userAction } from '../store/userSlice'

const Login = () => {
    const mailRef = useRef('')
    const passRef = useRef('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        const mail = mailRef.current.value
        const pass = passRef.current.value
        e.preventDefault()
        if(!mail || !pass){
            return alert("All fields are required")
        }
        
        const userDetails = {
            email: mail,
            password: pass
        }

        try {
            const url = '/api/v1/user/login'
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })
            const result = await response.json()
            const { success, data, message } = result
            if(success){
                dispatch(userAction.setUser(userDetails.email))
                setTimeout(()=>{
                    navigate('/')
                },1000)
            }
            if(!success){
                alert(message)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='login'>
        <form className='login-form'>
            <input ref={mailRef} className='form-input' type="email" placeholder="Your Email Address"/>
            <input ref={passRef} className='form-input' type="password" placeholder="Password"/>
            <button type='submit' onClick={handleLogin}>Login</button>
            <span className='button-span'>Does't have an account ?
                <Link className='form-span' to="/signup">Signup</Link>
            </span>
        </form>
    </div>
  )
}

export default Login