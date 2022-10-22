// import NavBar from "../components/NavBar"
import AuthModal from "./components/auth/AuthModal"
import LoginForm from "./components/auth/LoginForm"
import RegisterForm from "./components/auth/RegisterForm"
import '../Login_v4/css/main.css'
import '../Login_v4/css/util.css'
import { useState } from 'react'


const Home = () => {

    const [showModal, setShowModal] = useState(false); {/* home page: show the login / registery form */ }
    const [isSignUp, setIsSignUp] = useState(false); {/* we assume that the user is not registered */ }
    const [blurbg, setBlurbg] = useState("container-login100-22");
    const [id,setId] = useState('')

    return (
        <div className={blurbg}>
            {!isSignUp && (
            <div className="wrap-login100-2 p-l-55 p-r-55 p-t-65">
                    <div>
                        <LoginForm id={id} setId={setId} setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>
                        <RegisterForm isSignUp={isSignUp} blurbg={blurbg} showModal={showModal} setShowModal={setShowModal} setIsSignUp={setIsSignUp} setBlurbg={setBlurbg}/>
                    </div>
            </div>
            )}


            {isSignUp && 
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp} setBlurbg={setBlurbg}/>
            }
        </div>
    )
}

export default Home