import React from 'react';

// class component

class EditContact extends React.Component {

    // we are not using react hook as state, create directly in class component 

    constructor(props){
        super(props)
        const {id, name, email} = props.location.state.contact;
        this.state = {
            id,
            name,
            email,
        }
    }

    update = (e) => {
        e.preventDefault();  //won't refresh the page
        if(this.state.name === "" || this.state.email === ""){
            alert("All the fields are mandatory!");
            return
        }
        this.props.updateContactHandler(this.state);
        this.setState({name:"", email:""});
        this.props.history.push("/");  // It will redirect you at contactlist page when u click add button
        
    }


    render(){
        return(
            <div className="ui main">
                <h1>Edit Contact</h1>
                <form className="ui form" onSubmit={this.update}>
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
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        )
    }
}

export default EditContact;

