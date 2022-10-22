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
    const [blurbg, setBlurbg] = useState("container-login100");
    const [id,setId] = useState('')

    function something(){
        return (
            <div>
                <h1>hi</h1>
            </div>
        )
    }


    return (
        <div>
            <div className="limiter container-login100">
                <div className={blurbg}>
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <LoginForm id={id} setId={setId} setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>
                        <RegisterForm isSignUp={isSignUp} blurbg={blurbg} showModal={showModal} setShowModal={setShowModal} setIsSignUp={setIsSignUp} setBlurbg={setBlurbg}/>
                    </div>
                </div>

                <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp} setBlurbg={setBlurbg}/>
            </div>
        </div>

    )
}

export default Home