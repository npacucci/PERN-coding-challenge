import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "../EditTodo/EditTodo";
import InputTodo from "../InputTodo/InputTodo";
import "./ListTodos.css";

const ListTodos = () => {
    const [list, setList] = useState([]);

    const loadTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const data = await response.json();

            setList(data);
        }
        catch(e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const onDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this?");
        
        if (id != null && result) {
            try {
                const response = await fetch(`http://localhost:5000/todos/${id}`, {
                    method: "DELETE",
                });
                
                window.location = "/";
            }
            catch(e) {
                console.error(e.message);
            }
        }
    };

    // Check if a number is even
    const isEven = (number) => { return (number%2 == 0) };

    // Check if a number is odd
    const isOdd = (number) => { return (number%2 != 0) };

    return (
        <Fragment>
            <div className="row">
                <div className="header col-12">
                    <div className="header__title">
                        <i className="fa fa-cloud mr-2"></i>                                 
                        I should ... 
                    </div>
                    <div className="header__insert">
                        <InputTodo />
                    </div>
                </div>
                <div className="content col-12">
                    {
                        list.map((item, index) => (
                            <div className={`item ${isOdd(index) ? "item-odd" : ""} ${isEven(index) ? "item-even" : ""}`} 
                                key={item.todo_id}>
                                <div className="item__content">
                                    <i className="fa fa-times selectable mr-3" onClick={() => onDelete(item.todo_id)}></i>
                                    {item.description}
                                </div>
                                <div className="item__controls">
                                    <EditTodo item={item} />
                                </div>
                            </div>
                        ))    
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default ListTodos;