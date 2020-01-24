import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// import Form from './form'
import Users from './users'

// const URL_SAMPLE_API = 'api/calendar/events'

class Home extends Component {
    // monthlyEvent(){
    //     fetch(URL_SAMPLE_API,
    //             {
    //                 method:'GET', 
    //                 headers: {
    //                     'Content-Type':'application/json',
    //                     'Accept':'application/json'
    //                 }
    //             })
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log(json)
    //     })
    //     .catch(console.log)
    // }

    // getUserEvents() {
    //     const URL_SAMPLE_API_2 = '/api/notification/get'
    //     fetch(URL_SAMPLE_API_2, {
    //         method:'POST',
    //         headers:{
    //             'Accept':'application/json',
    //             'Content-type':'application/json'
    //         },
    //         body:JSON.stringify({id:361})
    //     })
    //     .then(res => res.json)
    //     .then(data => { console.log(data) })
    // }

    render() {
        return (
            <div className="row">
                <div className="col-10 mx-auto mt-5 p-0 table-responsive-sm">
                    <div className="float-right m-2 p-0">
                        <Link to="/add-user" className="btn btn-success">Add</Link>
                    </div>
                    <Users/>
                </div>
                {/* <div onClick={()=>this.monthlyEvent()}>
                    Click to show Event
                </div>
                <div onClick={()=>this.getUserEvents()}>Click to show Marks Event</div> */}
            </div>
        )
    }
}

export default Home;