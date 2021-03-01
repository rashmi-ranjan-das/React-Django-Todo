import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Plan = (props) => {
    return(
        <>
            <li key={props.key} className="shadow p-2 my-2 col-sm-9">{props.value}</li>
            <button onClick={() => props.handleDelete(props.id)} className="btn btn-danger my-2 col-sm-2 offset-1">Delete</button>
            <br/>
        </>
    );
}

export default Plan;
