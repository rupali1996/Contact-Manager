import React from 'react';
import { Link } from 'react-router-dom'; 

// class component

class AddContact extends React.Component {

    // we are not using react hook as state, create directly in class component 

    state = {
        name: "",
        email: "",
    };

    add = (e) => {
        e.preventDefault();  //won't refresh the page
        if(this.state.name === "" || this.state.email === ""){
            alert("All the fields are mandatory!");
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name:"", email:""});
        this.props.history.push("/");  // It will redirect you at contactlist page when u click add button
        
    }


    render(){
        return(
            <div className="ui main">
                <h1>Add Contact</h1>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={this.state.name}
                        onChange={ (e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" 
                        name="email" 
                        placeholder="Email"
                        value={this.state.email}
                        onChange={ (e) => this.setState({email: e.target.value})}
                        />
                    </div>
                    
                    <div className="center-div">
                        <button className="ui button blue">Add</button>
                        <Link to="/">
                        <button className="ui button blue right">Back to Contact List</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddContact;

