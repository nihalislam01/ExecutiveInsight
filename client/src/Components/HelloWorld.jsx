// import { useState, useEffect } from 'react';
// import { retrieveHelloWorld } from "./api/HelloWorldApiService";

// export default function HelloWorldComponent() {

//     const [message, setMessage] = useState(null)

//     useEffect (() => refresh(), [])

//     function refresh() {
//         retrieveHelloWorld()
//             .then((response) => setMessage(response.data))
//             .catch((error) => console.log(error))
//     }

//     return (
//         <div className="HelloWorldComponent">
//             <div>{message}</div>
//         </div>
//     )
// }