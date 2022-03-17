import React, { useEffect, useState } from 'react'
import ItemList from '../../components/ItemList/ItemList.js'
import './ItemListConteiner.css'
import Spinner from 'react-bootstrap/Spinner'
import { Link, useParams } from 'react-router-dom'

import GetPage from '../Help.js'

export default function ItemListConteiner(  ) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  //const {categoriaID} = useParams()
  //console.log(categoriaID)
  useEffect( () => {
  //  if(categoriaID){
  //    GetPage
  //    .then   (respuesta => {setProductos(respuesta.filter(prod => prod.categoria === categoriaID))})
  //    .catch  (error     => {console.log (error)})
  //    .finally(()        => {setLoading  (false)})
  //  }else{
      GetPage
      .then   (respuesta => {setProductos(respuesta)})
      .catch  (error     => {console.log (error)})
      .finally(()        => {setLoading  (false)})
  //  }
  },[])
  return (
    <div className='ItemsContainer'>
      { 
        loading ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
  //         <h1 className='Loading'>Cargando...</h1> : 
        :
          <ItemList  productos = {productos} />  
      }
    </div>

  )
}
