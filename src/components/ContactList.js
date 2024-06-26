import React, {useRef} from 'react'
import { Link } from 'react-router-dom';    //{} bracket is used bcz Link is not a exported data 
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);


    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactid(id)
    }


  


// -------------------------------------------------------------------
    const renderContactList = props.contacts.map((contact) => {
        return(
            <ContactCard 
            contact={contact} 
            clickHandler = {deleteContactHandler} 
            key = { contact.id }></ContactCard>
        )
    })
// ---------------------------------------------------------------------

    const getSearchTerm = () => {
        props.searchkeyword(inputEl.current.value)
    }

    return (
        <div className="main">
            <h2>
            Contact List
            </h2>
            <Link to="/add">
                <button className="ui button blue left">Add Contact</button>
            </Link>
            <hr />
        <div className="ui search">
            <div className="ui icon input">
                <input 
                ref={inputEl}
                type="text" 
                placeholder="Search Contacts" 
                className="prompt" 
                value={props.term}
                onChange={getSearchTerm}
                />
                <i className="search icon"></i>
            </div>
        </div>
            
        <div className="ui celled list">
              {renderContactList.length > 0 ? renderContactList: "No Contacts Available"}
        </div>
        </div>
        
    )
}

export default ContactList
