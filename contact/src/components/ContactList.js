import React , {useState} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import "./css/ContactList.css"; 


const ContactList = (props) => {
   
   

    const deleteContactHandler = (id) =>
        {
            props.removeContactHandler(id);
        }

    const renderContactList = props.contacts.map((contact) => {
    
        return <ContactCard contact = {contact} deleteContactHandler={deleteContactHandler}/>
     
    });
    


    return (
        <div className="render">
            <div className="boxc">

                <div className="contentc">
                    <div className="addc">
                        <h2>
                            ContactList
                        </h2>
                    </div>

                    <Link to="/add">
                    <div className="buttc">
                            <i 
                            className="fa-solid fa-plus" > 
                            </i>
                    </div>
                    </Link>

                </div>
                <div className="search">

                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input 
                    type="text" 
                    placeholder="Search Contacts" 
                    value={props.searchTerm} 
                    onChange={ (e) =>props.serachHandler(e.target.value)} /> 
                    

                </div>
       
            </div>
            {renderContactList.length > 0 ? renderContactList : " Searched Contact Not found !! "}
        </div>
    );

};

export default ContactList;
