const RegisterForm = ({isSignUp , blurbg , showModal, setShowModal , setIsSignUp , setBlurbg}) => {
    
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(true)
        // setBlurbg("container-login100-2")

    }
    
    return (
        <div className="register-btn">
            
            <div className="flex-col-c">
                <span className="txt1 p-b-17">
                    Or Sign Up Using
                </span>
            </div>

            <div className="container-login100-form-btn2">
                <div className="wrap-login100-form-btn2">
                    <div className="login100-form-bgbtn2"></div>
                    <button className="login100-form-btn2" onClick={handleClick}>
                        CREATE ACCOUNT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm