import React, { useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Signup = () => {
    const nameRef = useRef('')
    const mailRef = useRef('')
    const passRef = useRef('')
    const checkboxRef = useRef(null)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        const name = nameRef.current.value
        const mail = mailRef.current.value
        const pass = passRef.current.value
        const isChecked = checkboxRef.current.checked
        e.preventDefault()
        if(!name || !mail || !pass){
            alert("All fields are required")
            return
        }

        if(!isChecked){
            alert("You must agree to the terms and privacy policy")
            return
        }

        const userDetails = {
            username: name,
            email: mail,
            password: pass
        }

        try {
            const url = "/api/v1/user/signup"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })
            const result = await response.json()
            const { success, message } = result
            if(success){
                alert(message)
                setTimeout(()=>{
                    navigate('/login')
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
            <input ref={nameRef} className='form-input' type="text" placeholder="Your Name"/>
            <input ref={mailRef} className='form-input' type="email" placeholder="Your Email Address"/>
            <input ref={passRef} className='form-input' type="password" placeholder="Password"/>
            <div className='form-checkbox'>
                <input ref={checkboxRef} type="checkbox"/>
                <label>I agree to <span className='form-span'>Terms of Use</span> & <span>Privacy policy</span></label>
            </div>
            <button type='submit' onClick={handleSignUp}>SignUp</button>:
            <span>Already have an account ?
                <Link className='form-span' to="/login">Login</Link>
            </span>
        </form>
    </div>
  )
}

export default Signup