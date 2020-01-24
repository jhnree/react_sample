import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

const URL_CUSTOMERS = 'api/customers';

class Users extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            datas:[],
            id:[],
            delete:false,
        }
    }

    showUsers(){
        fetch(URL_CUSTOMERS,
                {
                    method:'GET', 
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                        }
                })
        .then(response => response.json())
        .then(json => {
           this.setState({
               datas:json.data
           })
        })
        .catch(console.log)
    }

    componentDidMount(){
        {this.showUsers()}
    }

    delete = (id) => {
        fetch(`/api/customers/${id}`, {
			method: 'DELETE'
        });
        {this.showUsers()}
    }
    
    usersList(){
        let data = this.state.datas
        console.log(data)
        if(data){
            return data.map((data, index)=>{
                return(
                    <tr key={index}>
                        <td>{data.firstname}</td>
                        <td>{data.lastname}</td>
                        <td>{data.age}</td>
                        <td>{data.email}</td>
                        <td>
                            <div className="row px-2">
                                <div className="col-lg-6 p-1">
                                    <NavLink to={`/update-user/${data.id}`} className="btn btn-info form-control">Edit</NavLink>
                                </div>
                                <div className="col-lg-6 p-1">
                                    <button className="btn btn-danger form-control" onClick={()=>{this.delete(data.id)}} type="button">Delete</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                )   
            })
        }
    }

    render() {
        return (
            <table className="table rounded-lg table-bordered my-5">
                <thead>
                    <tr>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Age</th>
                        <th className="text-center">Email Address</th>
                        <th style={{width:"20%"}} className="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.usersList()}
                </tbody>
            </table>
        );
    }
}

export default Users;