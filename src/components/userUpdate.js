import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap/Modal' 

class UserUpdate extends Component {
    constructor(props){
        super(props)

        this.state = {
            id:props.match.params.id,
            firstName:'',
            lastName:'',
            age:'',
            email:'',
            blankField:false,
            invalidEmail:false,
            existingEmail:false,
            modalShown:false,
        }
    } m

    showUsers(){
        const URL_CUSTOMER = `/api/customers/${this.state.id}`
        fetch(URL_CUSTOMER,
                {
                    method:'GET', 
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                        }
                })
        .then(response => response.json())
        .then(json => {
            this.setState({firstName:json.data.firstname, lastName:json.data.lastname, age:json.data.age, email:json.data.email})
        })
        .catch(console.log)
    }

    componentDidMount(){
        this.showUsers();
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

    backToDefault = (timeout) => {
        setTimeout(function(){
        this.setState({
                blankField:false,
                invalidEmail:false,
                existingEmail:false,
            })
        }.bind(this), timeout);
    }

    update = () => {
        fetch('/api/customers', {
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                                    id:this.state.id,
                                    firstname: this.state.firstName, 
                                    lastname: this.state.lastName, 
                                    age: this.state.age, 
                                    email: this.state.email
                                })
            })
        .then(response => response.json)
        .then((data) => { console.log(data) })
    }

    userSave = (event) => {
        event.preventDefault()

        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let age = this.state.age
        let email = this.state.email

        let regex = /\S+@\S+\.\S+/;

        if(firstName === '' || lastName === '' || age === '' || email === ''){
            this.setState({
                blankField:true
            })
        }
        else{
            if(regex.test(email)){
                this.update()
                this.props.history.push('/')
            }
            else{
                this.setState({
                    invalidEmail:true
                })
            }
        }
        this.backToDefault(3000)
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

    // openModal() {
	// 	this.setState({modalShown: true});
    // }
    
	// closeModal() {
	// 	this.setState({modalShown : false});
	// }

    // myModal = () => {
    //     return (
    //         <div>
    //             <Button variant="primary" onClick={()=>{this.openModal()}}>
    //                 Click
    //             </Button>

    //             <Modal show={this.state.show} onHide={()=>{this.closeModal()}}>
    //                 <Modal.Header closeButton>
    //                     <Modal.Title>
    //                         Modal heading
    //                     </Modal.Title>
    //                 </Modal.Header>
    //                 <Modal.Body>
    //                     Woohoo, you're reading this text in a modal!
    //                 </Modal.Body>
    //                 <Modal.Footer>
    //                     <Button variant="secondary" onClick={()=>{this.closeModal()}}>
    //                         Close
    //                     </Button>
    //                     <Button variant="primary" onClick={()=>{this.closeModal()}}>
    //                         Save Changes
    //                     </Button>
    //                 </Modal.Footer>
    //             </Modal>
    //        </div>
    //     )
    // }

    render() {
        return (
            <div className="row mt-5 pt-4">
                {/* {this.myModal()} */}
                <div className="col-lg-6 col-12 mx-auto">
                    <form onSubmit={this.userSave}>
                        <input name="fname" type="text" placeholder="First name" value={this.state.firstName} onChange={this.onChangeInput} className="form-control"/>
                        <input name="lname" type="text" placeholder="Last name" value={this.state.lastName} onChange={this.onChangeInput} className="form-control"/>
                        <input name="age" type="text" placeholder="Age" value={this.state.age} onChange={this.onChangeInput} className="form-control"/>
                        <input name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.onChangeInput} className="form-control"/>
                        <div className="float-right">
                            <Link className="btn btn-dark mx-3" to="/">Back</Link>
                            <button className="btn btn-success">Save</button>
                        </div>
                    </form>
                    <div className="messages">
                        <div className={this.state.blankField ? "error show" : "error hide"}>All fields are required!</div>
                        <div className={this.state.invalidEmail ? "error show" : "error hide"}>Invalid email!</div>
                        {/* <div className={this.state.success ? "success show" : "success hide"}>Successfully Saved!</div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserUpdate;