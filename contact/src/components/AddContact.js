import React , {useState} from "react";
import "./css/Addcontact.css";
import { Link , useHistory} from "react-router-dom";



const AddContact = (props) =>{

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

   const add = (e) => {
        

        e.preventDefault();

        if(name === "" || email === "")
        {
            alert("All the fields are mandatory ! ");
            return ;

        }

        const Contact = {
            name,
            email,
          };

        props.addContactHandler(Contact)
        // this.setState({name : "", email : "" );
       history.push("/list");
    };

    
        return (

            <div className="main">

            <form className="form">

                    <div className=" nameheader">
                        <h2>Add contact</h2>
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
                    onChange={ (e) =>setEmail(e.target.value)} />
                </div>


                <div className="button-container">
                        <button className="button"  onClick ={add}>Save</button>
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


export default AddContact;