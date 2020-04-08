import React, { Fragment, useState } from "react";
import "./InputTodo.css";

const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (event) => {
        event.preventDefault();

        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        }
        catch (e) {
            console.error(e.message);
        } 
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-insert" data-toggle="modal" data-target="#id-insert">
                <i className="fa fa-plus"></i> New
           </button>


            <div className="modal" id="id-insert" onClick={() => setDescription("")}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title"> New </h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription("")}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="d-block mb-2"> I should ... </div> 
                            <input className="form-control" type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => onSubmitForm(e)}>New</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setDescription("")}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default InputTodo;