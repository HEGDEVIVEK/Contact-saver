import React , { useState, useEffect} from "react";
import "./css/Addcontact.css";
import { Link , useHistory} from "react-router-dom";



const EditContact = (props) => {

    //This initializes the state of the component with two properties:
    //This state is used to store the values entered in the form fields.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    useEffect(() => {
        // Set initial state from props
        if (props.contact) {
          setName(props.contact.name);
          setEmail(props.contact.email);
        }
      }, [props.contact]);


    const update = (e) => {
       

        e.preventDefault();

        if(name === "" || email === "")
        {
            alert("All the fields are mandatory ! ");
            return ;

        }

        const updatedContact = {
            id: props.contact.id,
            name,
            email,
          };

        props.updateContactHandler(updatedContact)
        history.push("/ist");

       
       
    };


        

        return (

            <div className="main">

            <form className="form">

                    <div className=" nameheader">
                        <h2>Edit contact</h2>
                    </div>
            

                <div className="field">
                    <label>Name</label>
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter the name" 
                    //Binds the value of the input field to the name property in the component's state
                   value= {name} 
                    onChange={ (e) => setName(e.target.value)} />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input type="text" 
                    name="email" 
                    placeholder="Enter the email" 
                   value= {email}  
                    onChange={ (e) => setEmail(e.target.value)} />
                </div>


                <div className="button-container">
                        <button className="button"  onClick ={update}>Update</button>
                </div>

                <Link to = "/list">
                <div className="button-container">
                        <button className="button">Cancel</button>
                </div>
                </Link> 
               

             </form>

        </div>
        
        );
    }


export default EditContact;