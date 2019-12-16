import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Components.css';
import {useParams} from 'react-router';

// const style = {
//     background: 'darkseagreen',
//     margin: '60px',
// }


const About = () => {
    const {msg} = useParams();
    return (
        <div className="level1 email">
            {
                msg === "contact" ?
                    <h2><a href="mailto:aimeedu11@gmail.com?subject=Contact Developer"target="_blank">Contact Us</a></h2>
                    : <h2>Developers: <br/>{ "{ Fengzhang Du,  Yaniv Bronshtein }" }<br/>{ "{ Mohanad Osman,  Adam Binder }" }<br/>{ "{ Pizon Shetu }" }</h2>
            }
        </div>
    )
}
export default About;