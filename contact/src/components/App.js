import './css/App.css';
import {BrowserRouter as Router,Route,Switch , Redirect} from 'react-router-dom';

import { nanoid } from 'nanoid';
import React, {useState , useEffect} from "react";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import axios from 'axios';

function App() {

  //const LOCAL_STORAGE_KEY = "cont";
  const [contacts , setContacts] = useState([]);  
  const [searchTerm , setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => 
  {
    const response = await axios.get("http://localhost:3006/contacts");
    setContacts(response.data);
  };

  const addContactHandler = async (contact) => {

    const databody ={
      id: nanoid(), ...contact,
    };

    const response = await axios.post("http://localhost:3006/contacts", databody);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {

     await axios.put(`http://localhost:3006/contacts/${contact.id}`, contact);
    retrieveContacts();
  };

  const removeContactHandler = async (id) => {
       await axios.delete(`http://localhost:3006/contacts/${id}`);
       retrieveContacts();

      // const remainContacts = contacts.filter((contact) => {
      //   return contact.id !== id;
      // });

      //     setContacts(remainContacts);
      
    };

    const serachHandler = (searchTerm) => 
    {
             setSearchTerm(searchTerm);
             if(searchTerm !== "")
              {
                const newContactList = contacts.filter((contact) =>
                  {
                    return  Object.values(contact)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  });
                  setSearchResults(newContactList);

              }
              else{
                setSearchResults(contacts);
              }
    };

    

    // useEffect is used to perform the side effect in the functional component
    // here side effect is localStorage

    useEffect( ( ) => {

      // const retrivedContact=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      // if(retrivedContact)
      //   {
      //     setContacts(retrivedContact);
      //   }

      const getAllcontact = () =>
        {
           retrieveContacts();
        };

        getAllcontact();
      }, []);

    // useEffect( ( ) => {
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    // }, [contacts]); // dependecy array. it tells React to run the effect only when the contacts state change

  
  
    return (
      <div>
          <Router>
            <Switch>

            <Route 
              exact
              path="/add" 
              render={() =>(
              <AddContact 
              addContactHandler = {addContactHandler} 
              />
              )}
              />

              <Route 
              exact
              path="/edit" 
              render={(props) =>(
              <EditContact 
               updateContactHandler = {updateContactHandler} 
              contact={props.location.state.contact}
              />
              )}
              />

            <Route 
              path="/list" 
              render={() => (
              <ContactList 
              contacts = {searchTerm.length < 1 ?  contacts : searchResults} 
              removeContactHandler = {removeContactHandler}
              searchTerm = { searchTerm }
              serachHandler = {serachHandler}

             

              />
              )}
              />

<Redirect to="/list" />

              {/* <AddContact addContactHandler = {addContactHandler} />
              <ContactList contacts = {contacts} removeContactHandler = {removeContactHandler} /> */}
            
            </Switch>
          </Router>
      </div>
  );
}

export default App;


