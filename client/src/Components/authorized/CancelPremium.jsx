import { useEffect, useRef } from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { cancelPremiumApi } from "../../api/ExecutiveInsightApiService"
import { useAuth } from "../../security/AuthContext"

export default function CancelPremium(props) {

    const authContext = useAuth();
    const username = authContext.username();
    const [email, setEmail] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
              props.setShowCancelForm(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
    }, [props])

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const cancel = () => {
        if (email!==username) {
            toast.error("Email does not match")
        } else {
            toast.promise(
                cancelPremiumApi(username),
                {
                    loading: 'Cancelling...',
                    success: <b>Premium canceled</b>,
                    error: <b>Error cancelling premium</b>,
                  }
            )
            .then((response)=>{
                authContext.setUser();
                props.setShowCancelForm(false);
            })
            .catch((error)=>console.log(error))
        }
    }

    return (
        <div>
            <Toaster />
            <div className='d-flex justify-content-center position-fixed z-1' style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} ref={formRef}>
                <div style={{width: "600px"}}>
                    <div className="card shadow">
                        <div className="card-header">
                        <h5 className="card-title">Cancel Your Premium Subscription</h5>
                        </div>
                        <div className="card-body text-start">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label m-0">MAKE SURE YOU HAVE DECIDED TO CANCEL YOUR SUBSCRIPTION</label>
                                    <input type="text" className="form-control" placeholder="Enter Your Email" value={email} onChange={handleEmailChange} />
                                </div>
                            </form>
                            <hr />
                            <div className="text-end">
                                <button className="button-06 mx-2" onClick={() => props.setShowCancelForm(false)}>Close</button>
                                <button className="button" onClick={cancel}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}