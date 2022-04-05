import React, { useEffect, useState } from 'react'
import ItemList from '../../components/ItemList/ItemList.js'
import './ItemListConteiner.css'
import Spinner from 'react-bootstrap/Spinner'
import { useParams } from 'react-router-dom'
import GetPage from '../Help.js'
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore'

export default function ItemListConteiner(  ) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const {categoriaID} = useParams()
  useEffect( () => {
      const db = getFirestore()
      const queryDb = collection (db, 'productos')
      if(categoriaID !== undefined){
          const queryFilltrado = query ( queryDb , where('categoria', '==', categoriaID) )
          getDocs(queryFilltrado)
          .then   (respuesta => {setProductos( respuesta.docs.map(item =>( { id: item.id , ...item.data() }) ))})
          .catch  (error     => {console.log ( error )})
          .finally(()        => {setLoading  ( false )})
      }else{
        getDocs(queryDb)
        .then   (respuesta => {setProductos( respuesta.docs.map(item =>( { id: item.id , ...item.data() }) ) )})
        .catch  (error     => {console.log ( error )})
        .finally(()        => {setLoading  ( false )})
    }
  },[categoriaID])
  return (
    <div className='ItemsContainer'>
      { 
        loading ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
  //         <h1 className='Loading'>Cargando...</h1> : 
        :
          <ItemList  productos = {productos} />  
      }
    </div>

  )
}
