import React, { useEffect } from "react";
import { connect } from 'react-redux';

import { getList } from '../models/redux';

const Form = props => {
    const { setShowSave,dispatch } = props;
    useEffect(() => {
        dispatch(getList());
    }, [])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(getList());
        setShowSave(false);
    }

    const getParamsFromLs = () => {
        const ids = (localStorage.savedId || '').split(',');
        return (ids.map(item => `_id=${item}`)).join('&');
    }

    const getSavedItems = e => {
        e.preventDefault();
        dispatch(getList('savedItem', getParamsFromLs()));
        setShowSave(true);
    }

    // end functions
    return(
        <div className="form-container">
            <button onClick={submitHandler} type="submit">GET</button>
            <button onClick={getSavedItems} type="submit">SHOW SAVED ITEMS</button>
        </div>
    )
}

export default connect()(Form);
