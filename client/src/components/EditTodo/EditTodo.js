import React, {Fragment, useState} from 'react';

const EditTodo = ({item}) => {
    const { todo_id } = item;
    const [description, setDescription] = useState(item.description);

    // Edit description function
    const updateDescription = async (event) => {
        event.preventDefault();

        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
            window.location = "/";
        }
        catch(e) {
            console.error(e.message);
        }
    }

    return(
        <Fragment>
            <i className="fa fa-pencil-alt selectable" data-toggle="modal" data-target={`#id-${todo_id}`}></i>

            <div className="modal" id={`id-${todo_id}`} onClick={() => setDescription(item.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(item.description)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" type="text" value={description} onChange={e => setDescription(e.target.value)}></input>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => setDescription(item.description)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default EditTodo;