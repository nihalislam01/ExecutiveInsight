import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi, retrieveUserApi } from './api/ExecutiveInsightApiService';

export default function ForgotPasswordComponent() {

    const [username, setUsername] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    function sendEmail(values) {
        const email = {
            email: values.username
        }
        forgotPasswordApi(email)
            .then((response) => handleResponse(response, values.username))
            .catch((error) => handleResponse(error, values.username))
    }

    function handleResponse(response, email) {
        if (response.status===200) {
            var newMessage = response.data;
            navigate('/message', { state: { newMessage } });
        } else {
            setShowError(true);
        }
    }

    return (
        <div className="FormComponent">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    {showError && <div className='alert alert-danger'>Email Does not Exists</div>}
                    <div className="card">
                        <div className="card-header">Forgot Password</div>
                        <Formik initialValues = { {username} } enableReinitialize = {true} onSubmit = {sendEmail}>
                            {
                                (props) => (
                                    <Form className="card-body">
                                        <fieldset className='form-group mb-3'>
                                            <label className='form-label'>Enter your email</label>
                                            <Field type="email" className="form-control" name="username" required />
                                        </fieldset>
                                        <button className='btn btn-success form-control' type="submit">Send verification email</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}