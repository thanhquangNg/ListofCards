import React, { useEffect } from "react";
import Card from "./Card";
import SaveItem from "./SaveItem";
import { connect } from 'react-redux';
import { getList } from '../models/redux';

const CardList = props => {
    const { data, fetching, behavior, dispatch,savedItem,showSave } = props;
    const getParamsFromLs = () => {
        const ids = (localStorage.savedId || '').split(',');
        return (ids.map(item => `_id=${item}`)).join('&');
    }
    useEffect(() => {
        if (behavior === 'updateDone') {
        dispatch(getList());
        dispatch(getList('savedItem', getParamsFromLs()));}
    }, [behavior]);

    if(showSave){
        if(localStorage.savedId ===''){
            return(
                <p>No Saved Item Available!</p>
            )
        }
        return(
        <div className="cardlist-container">
            {savedItem.map((item, index) => (               
                <SaveItem
                    key={index}
                    item={item}
                />
            ))}
        </div>
        )
    }
    

    if (fetching) {
        return <p>fetching...</p>
    }
    return(
        <div className="cardlist-container">
            {data.map((item, index) => (               
                <Card
                    key={index}
                    item={item}
                />
            ))}
        </div>
    )
}
const mapStateToProps = state => state.listReducer;

export default connect(mapStateToProps)(CardList);