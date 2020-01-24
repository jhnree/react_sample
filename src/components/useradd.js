import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';    

class UserAdd extends Component {

    constructor(props){
        super(props)

        this.state = {
            firstName:'',
            lastName:'',
            age:'',
            email:'',
            blankField:false,
            invalidEmail:false,
            existingEmail:false,
            success:false,
        }
    } 

    clear = () => {
        this.setState({
            firstName:'',
            lastName:'',
            age:'',
            email:'',
            blankField:false,
            invalidEmail:false,
            existingEmail:false,
        })
    }

    onChangeInput = (event) => {
        let eventName = event.target.name
        switch(eventName){
            case 'fname':
                    this.setState({
                        firstName:event.target.value
                    })
                break;
            case 'lname':
                    this.setState({
                        lastName:event.target.value
                    })
                break;
            case 'age':
                    this.setState({
                        age:event.target.value
                    })
                break;
            case 'email':
                    this.setState({
                        email:event.target.value
                    })
                break;
        }
    }

    addData = () => {
        // console.log(`${this.state.firstName} ${this.state.lastName}, ${this.state.age}, ${this.state.email}`)
        const URL_SAMPLE_API_2 = '/api/customer'
        fetch(URL_SAMPLE_API_2, {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                body:JSON.stringify({
                                    firstname: this.state.firstName, 
                                    lastname: this.state.lastName, 
                                    age: this.state.age, 
                                    email: this.state.email
                                })
            })
            .then(response => response.json)
            .then((data) => { console.log(data) })
        }
    
    backToDefault = (timeout) => {
        setTimeout(function(){
        this.setState({
                blankField:false,
                invalidEmail:false,
                existingEmail:false,
                success:false
            })
        }.bind(this), timeout);
    }

    formSubmit = (event) => {
        event.preventDefault()
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let age = this.state.age
        let email = this.state.email
        
        let regex = /\S+@\S+\.\S+/;

        if(firstName === '' || lastName === '' || age === '' || email === ''){
            // toast.error('asd');
            this.setState({
                blankField:true
            })
            // console.log("Blank fields detected");
        }
        else{
            if(regex.test(email)){
                // console.log("email is valid")
                this.addData()
                this.clear()
                this.setState({
                    success:true
                })
            }
            else{
                this.setState({
                    invalidEmail:true
                })
                // console.log("invalid email")
            }
        }
        this.backToDefault(3000)
    }

    render() {
        return (
            <div className="row mt-5 pt-4">
                <div className="col-lg-6 col-12 mx-auto">
                    <form onSubmit={this.formSubmit}>
                        <input name="fname" type="text" placeholder="First name" value={this.state.firstName} onChange={this.onChangeInput} className="form-control"/>
                        <input name="lname" type="text" placeholder="Last name" value={this.state.lastName} onChange={this.onChangeInput} className="form-control"/>
                        <input name="age" type="text" placeholder="Age" value={this.state.age} onChange={this.onChangeInput} className="form-control"/>
                        <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.onChangeInput} className="form-control"/>
                        <div className="float-right">
                            <Link className="btn btn-dark" to="/">Back</Link>
                            <button className="btn btn-info mx-3" type="button" onClick={this.clear}>Clear</button>
                            <button className="btn btn-success">Save</button>
                        </div>
                    </form>
                    <div className="messages">
                        <div className={this.state.blankField ? "error show" : "error hide"}>All fields are required!</div>
                        <div className={this.state.invalidEmail ? "error show" : "error hide"}>Invalid email!</div>
                        <div className={this.state.success ? "success show" : "success hide"}>Successfully Saved!</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAdd;