import React, { useEffect, useState } from 'react'
import GetPage from '../Help.js'
import ItemDetail from '../ItemDetail/ItemDetail'
import { Spinner } from 'react-bootstrap'
import './ItemDetailContainer.css'
import {Link, useParams } from 'react-router-dom'
import {doc, getDoc, getFirestore} from "firebase/firestore"

export default function ItemDetailContainer({}) {
  
  const {detalleID} = useParams()

  const [item, setItem] = useState({})
  
  const [loading , setLoading] = useState(true)   

    useEffect(() =>{
      
      const db = getFirestore()
      const queryDb = doc (db, 'productos', detalleID)
      getDoc(queryDb)
        .then   (respuesta => setItem( { id: respuesta.id , ...respuesta.data() } ))
        .catch  (error     => {console.log ( error )})
        .finally(()        => {setLoading  ( false )})
    },[])
    return (
    <div className='ItemDetailContainer'>
      {
        loading ?
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner> :
        <ItemDetail producto={item} />    
      }
        </div>
  )
}