import React from 'react'
import  ReactDOM  from 'react-dom'
import Classes from './Model.module.css'
const Model = (props) => {
    
    return (
        <React.Fragment>
        {
            ReactDOM.createPortal(<Backdrop onClick={props.onClick} img={props.img}/>, document.getElementById('model'))
        }
        </React.Fragment>
    )
}
const Backdrop = (props) =>{
    
    console.log(props)
    return (
        <div className={Classes.Backdrop} onClick={props.onClick}>
            <div className={Classes.img}>
                <img src={`http://farm${props.img.farm}.staticflickr.com/${props.img.server}/${props.img.id}_${props.img.secret}.jpg`}></img>
            </div>
        </div>
    )
}
export default Model
