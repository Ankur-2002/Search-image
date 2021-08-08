import React, { useEffect } from 'react';
import {useSelector} from 'react-redux'
import Classes from './Datalist.module.css'
const Datalist = () => {

    const store = useSelector(state => state.localstorage);
    console.log(store)
    return (
        <>
            { 
                  store.map((value,index)=>{
                  return <option className={Classes.List} key={index}>{value}</option>
                  })
            }
        </>
    )
}

export default Datalist
