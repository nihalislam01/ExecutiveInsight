import { Link } from 'react-router-dom';
import '../../styles/PlanComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function PlanComponent() {
    return (
        <div>
            <h1>Manage your startup.</h1>
            <h5>Empower your enterprise with our comprehensive business management solutions</h5>
            <div className="d-flex justify-content-center text-start" style={{ marginTop: "100px", marginBottom: "100px" }}>
                <div className="plan">
                    <h6>Free</h6>
                    <div className='d-flex'>
                        <p className='plan-value'><FontAwesomeIcon icon={faDollarSign} /></p>
                        <h1>0</h1>
                        <p className='plan-value'>USD/month</p>
                    </div>
                    <div className='info'>For individuals working on an ogranization and collaboration.</div>
                    <Link to="/signup"><button className='button'>Get Started</button></Link>
                    <hr />
                    <div>
                        <h6>Included in Free:</h6>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Join multiple workspaces</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Collaborate on individual tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Collaborate with team</p>
                    </div>
                </div>
                <div className="plan" style={{ borderLeft: "0px", borderRight: "0px" }}>
                    <h6>Standard</h6>
                    <div className='d-flex'>
                        <p className='plan-value'><FontAwesomeIcon icon={faDollarSign} /></p>
                        <h1>11</h1>
                        <p className='plan-value'>.99 USD/month</p>
                    </div>
                    <div className='info'>Monthly subscription for individuals looking to organize and manage their business startup or entrepreneurship.</div>
                    <Link to="/signup"><button className='button'>Signup Now</button></Link>
                    <hr />
                    <div>
                        <h6>Everything in Free, Plus:</h6>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Join multiple workspaces</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Collaborate on individual tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Collaborate with team</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Create your own workspace</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your teams</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage members</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your proucts</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your sales</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Monitor Company revenue</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Monitor member progress</p>
                    </div>
                </div>
                <div className="plan">
                    <h6>Premium</h6>
                    <div className='d-flex'>
                        <p className='plan-value'><FontAwesomeIcon icon={faDollarSign} /></p>
                        <h1>9</h1>
                        <p className='plan-value'>.99 USD/month</p>
                    </div>
                    <div className='info'>Yearly subscription for individuals looking to organize and manage their business startup or entrepreneurship.</div>
                    <Link to="/signup"><button className='button'>Signup Now</button></Link>
                    <hr />
                    <div>
                        <h6>Everything in Standard, Plus:</h6>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Join multiple workspaces</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Collaborate on individual tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Collaborate with team</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Create your own workspace</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your teams</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage members</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your proucts</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your tasks</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Manage your sales</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Monitor Company revenue</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Monitor member progress</p>
                        <p><FontAwesomeIcon icon={faCheck} style={{color: "#548c2f", paddingRight: "5px"}} />Get exciting discount</p>
                    </div>
                </div>
            </div>
        </div>
    )
}