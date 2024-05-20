import React from "react";
import { Link } from "react-router-dom";
import "./css/Contactcard.css"; 

const ContactCard = (props) => 
    {
    const {id, name, email } = props.contact;

    return (

    <div className="contact-item">

            <div className="box">

            <div className="icon-left">
                <i className="far fa-user fa-2x"></i>
            </div>

            <div className="content">

                <div className="right-content">
                    <p className="name">{name}</p>
                    <p className="email">  <a href={`mailto:${email}`}>{email}</a></p>
                </div> 
                
                <Link to={{ pathname: "/edit", state:{ contact: props.contact } }}>
                    <div className="icon-right">
                        <i className="fa-solid fa-pen-to-square"></i>
                     </div>
                </Link>

                <div className="icon-right">
                    <i 
                        className="fa-solid fa-trash" 
                        onClick = {()=>props.deleteContactHandler(id)}>
                    </i>
                </div>

            </div>   
           
       </div>

    </div>
    );
};

export default ContactCard;
