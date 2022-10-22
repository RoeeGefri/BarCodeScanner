// This page would be: signup form / login form
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'


const AuthModal = ({ setShowModal, isSignUp, setIsSignUp , login , setBlurbg }) => {
    const [username, setUserName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookie, setCookie , removeCookie] = useCookies(['user'])


    const handleClick = () => {
        setShowModal(false)
        setIsSignUp(false)
        // setBlurbg("container-login100")
    }


    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        // alert("fdsa")
        e.preventDefault() //prevent from refreshing
        
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                setPassword("")
                setConfirmPassword("")
                return
            }
            const response = await axios.post('http://localhost:5000/user/create', { username , email , password})
            setCookie('userId', response.data.data)
            // console.log("UserId: " + response.data)


            const success = (response.status === 200)
            if (success && isSignUp){
                navigate('/plano')
            } 

            if(!success){
                setError('This userName already exits!')
                setUserName("")
                
                return
            }

            // window.location.reload()
        } catch (error) {
            console.log(error)
            setError('This userName already exits!')
            setUserName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            return
        }
    }

    return (
        <div>
            <div className="auth-modal">
                <div class="auth-modal-text">
                    <div style={{height: "7vh"}}>
                        <div className="close-icon" onClick={handleClick}>
                            X
                        </div>

                        <h2>CREATE ACCOUNT</h2>
                    </div>
                    
                    <p className="m-b-30" style={{height: "18vh"}}>By clickling SIGN IN, You agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy, by clicking <a href="">here</a></p>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={username}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            required={true}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            value={confirmPassword}
                            type="password"
                            id="password-check"
                            name="password-check"
                            placeholder="confirm password"
                            required={true}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <input className="secondary-button" type="submit" value="Sign-Up" />
                        <p>{error}</p> {/* print the error */}
                    </form>
                </div>
            </div>
        </div>


    )
}

export default AuthModal