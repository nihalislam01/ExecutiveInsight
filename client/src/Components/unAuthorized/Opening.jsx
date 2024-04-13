import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dashboard from '../../assets/executive-insight-background-16.jpg';

export default function Opening() {

    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=> {
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add('show')
                } else {
                    entry.target.classList.remove('show')
                }
            })
        })
    
        const hiddenElement = document.querySelectorAll('.hidden')
        hiddenElement.forEach((element) => observer.observe(element))
    },[])

    const workflow = [
        {color: "#3a5a40", name: "Workspace Management", description: "You can create your own workspace and manage your business with our comprehensive management solutions."},
        {color: "#b5838d", name: "Member Management", description: "You can manage members in your workspace and monitor their working progress."},
        {color: "#30638e", name: "Post Assignment", description: "You can create and assign post to members so that you can keep track of your members."},
        {color: "#7f5539", name: "Team Management", description: "You can create and manage teams in your workspace. You can assign members to a team so that they can work collaboratively."},
        {color: "#3c6e71", name: "Product Management", description: "You can add your company products so that you can keep track of your sales and quantity."},
        {color: "#ad2831", name: "Task Management", description: "You can create and assign task to members of teams so that they can work on your task and give feedbacks."},
        {color: "#495057", name: "Delivery Management", description: "Once your workspace memebers are done with your task you can check and deliver the task to your clients."},
        {color: "#588157", name: "Dashboard", description: "Every workspace will have a dashboard page so that owners can check their company revenue and keep track of their products."}
    ]

    return (
        <div className="background-15">
            <div className="d-flex align-items-center justify-content-between p-4" style={{marginTop: "100px"}}>
                <div className="text-start" style={{color: "white"}}>
                    <h1>Executive Insight</h1>
                    <h5 className="mb-4" style={{width: "70%"}}>Empower your enterprise with our comprehensive business management solutions</h5>
                    <Link to="/signup"><button className="button-03" style={{width: "25%"}}>Sign up - it's free!</button></Link>
                    <Link to="/plan"><button className="button-08 mx-4" style={{width: "25%", color: "white"}}>See our plans</button></Link>
                </div>
                <Image src={Dashboard} style={{height: "300px", width: "50%", borderRadius: "10px"}} className="hidden"/>
            </div>
            <h1 className="text-start" style={{marginTop: "200px", marginLeft: "100px"}}>What We Offer</h1>
            <div className="d-flex hidden" style={{padding: "50px 100px", overflow: "auto"}}>
                {workflow.map((work, index) => (
                    <div className="shadow mx-2 workflow">
                        <div className="workflow-header" style={{backgroundColor: `${work.color}`}}></div>
                        <div className="workflow-body text-start">
                            <h5>{work.name}</h5>
                            <p>{work.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}