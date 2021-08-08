import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../Layout/Container'
import ImageView from './ImageView'
import Classes from './ResultView.module.css'
const ResultView = () => {
    const store = useSelector(state => state); 
  
    return (
        <Container>
            <div className={Classes.Result}>
            {store.isLoading ? <p className={Classes.Loading}>Loading ....</p> :
                store.item.map((value)=>{ 
                    return <ImageView key={value.secret} img={value}/>
                })
            }
            {
               
                store.isError && <p className={Classes.Error}>Something Went Wrong</p>
            } 
            {
                !store.isError && !store.isLoading && store.item.length === 0 && <p className={Classes.Empty}>No Search Found</p>
            }
            </div>
           
        </Container>
    )
}

export default ResultView
