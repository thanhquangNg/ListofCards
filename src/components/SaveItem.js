import React, { useState } from "react";
import { connect } from 'react-redux';
import { updateItem, removeSavedItem } from '../models/redux';

// import editForm from "./editForm";

const SaveItem = props => {
    const { item, dispatch } = props;
    const [ edited, setEdited ] = useState(false);

    const [editValue, setEditValue] = useState(item);
    
    const editInput = (e) => {
        const { value, name } = e.target;
        setEditValue({...editValue, [name]: value})
    }
    const cancelInput = () => {
        setEdited(false);
        setEditValue(item);
    }
    const doneInput = () => {
        dispatch(updateItem(editValue));
        setEdited(false);
    }
    const removeItem = () => {
        dispatch(removeSavedItem(item._id));
    }

    if (!edited) {
        return (
            <section className="card-item">
                <div className="item">
                    <div className="content">
                        <p>Name: {item.name}</p>
                        <p>Location: {item.location}</p>
                        <p>IP-address: {item.ip}</p>
                        <p>MAC-address: {item.mac}</p>
                    </div>
                    <div className="actions">
                        <button onClick={() => setEdited(true)}>Edit</button>
                        <button onClick={removeItem}>Remove</button>
                    </div>  
                </div>
            
            </section>
        )
    }
    return (
         <section className="card-item">
            <div className="item">
                <div className="content">
                    {/*<p>Name: <input value={editValue.name} onInput={e => editInput(e, 'name')} /></p>
                    <p>Location: <input value={editValue.location} onInput={e => editInput(e, 'location')} /></p>
                    <p>IP-address: <input value={editValue.ip} onInput={e => editInput(e, 'ip')} /></p>
                    <p>MAC-address: <input value={editValue.mac} onInput={e => editInput(e, 'mac')} /></p>*/}
                    <p>Name: <input name='name' value={editValue.name} onInput={editInput} /></p>
                    <p>Location: <input name='location' value={editValue.location} onInput={editInput} /></p>
                    <p>IP-address: <input name='ip' value={editValue.ip} onInput={editInput} /></p>
                    <p>MAC-address: <input name='mac' value={editValue.mac} onInput={editInput} /></p>
                </div>
                <div className="actions">
                    <button onClick={doneInput}>Done</button>
                    <button onClick={cancelInput}>Cancel</button>
                </div>  
            </div>
        </section>
    )
   
}

const mapStateToProps = state => state.listReducer;

export default connect(mapStateToProps)(SaveItem);