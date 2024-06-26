import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { uuid } from 'uuidv4';
import api from '../api/contacts'
import './App.css';
import Header from './Header';
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

function App() {

const LOCAL_STORAGE_KEY = "contacts";
const [ contacts, setContacts ] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

// Search activity


// RetriveContacts 
const retrieveContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
}

const addContactHandler = async (contact) => {
  console.log(contact);
  const request = {
    id: uuid(),
    ...contact
  }

  const response = await api.post("/contacts", request)
  setContacts([...contacts, response.data]);
};

const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact);
  // console.log(response.data)
  const {id, name, email} = response.data
  setContacts(contacts.map(contact => {
    return contact.id === id ? {...response.data} : contact;
  }));
};


const removeContactHandler = async (id) => {
  await api.delete(`/contacts/${id}`);
  const newContactList = contacts.filter((contact) => {
    return contact.id !== id;
  });

  setContacts(newContactList);
}

const searchHandler= (searchTerm) => {
  setSearchTerm(searchTerm);
  if (searchTerm !== ""){
    const newContactList = contacts.filter((contact) => {
      return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(newContactList)
  }
  else {
    setSearchResults(contacts);
  }
};

// when you refresh the page then data still be there
useEffect(() => {
//  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ;
//  if(retriveContacts) setContacts(retriveContacts);
const getallContacts = async () => {
  const allContacts = await retrieveContacts();
  if(allContacts)setContacts(allContacts);
}
getallContacts();

}, []);

// local storage that is data will store at local when u created
useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
}, [contacts]);

// const contacts =[
//   {
//     id: "1",
//     name: "Rupali",
//     email: "rupali123@gmail.com"
//   }, 
//   {
//     id: "2",
//     name: "Deepali",
//     email: "Deepali123@gmail.com"
//   }, 
//   {
//     id: "3",
//     name: "Sayali",
//     email: "sayali123@gmail.com"
//   }
// ] 

  return (
   <div className="ui container">
     <Router>
      <Header />
      <Switch>
        {/* <Route path="/" exact component={() => <ContactList contacts = {contacts} getContactid = {removeContactHandler}/>} /> */}
        {/* important  - another way to route */}

        <Route 
        path="/"
        exact
        render={(props) =>(
          <ContactList
          {...props}
          contacts={searchTerm.length < 1 ? contacts : searchResults}
          getContactid={removeContactHandler}
          term={searchTerm}
          searchkeyword={searchHandler}
          />
        )}
        />

        <Route 
          path="/add"
          render={(props) =>(
            <AddContact
            {...props}
            addContactHandler={addContactHandler}
            />
          )}
        />

        <Route 
          path="/edit"
          render={(props) =>(
            <EditContact
            {...props}
            updateContactHandler={updateContactHandler}
            />
          )}
        />    

        <Route 
        path="/contact/:id"
        component={ContactDetail}
        />
      </Switch>
     </Router>   
   </div>
  );
}

export default App;
