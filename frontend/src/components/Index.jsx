import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useLoading } from "../context/Loading";
import {Link} from "react-router-dom"
function Index() {
  const [places,setPlaces] = useState([])
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    showLoading()
   axios.get("/locations/places").then((res)=>{
    console.log(res.data);
    setPlaces([...res.data,...res.data,...res.data,...res.data])
   }).catch(err=>{
    console.log(err);
   }).finally(()=>{
    hideLoading()
   })
  }, [])
  
  return (
    <div className='mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places?.length > 0 && places.map((place)=>(
        <Link to={`/places/${place._id}`}  key={place._id}>
         <div className='  hover:bg-gray-100 hover:delay-100'>
         <div className='bg-gray-500 rounded-2xl flex'>
            {place.photos && (
              <img className='rounded-2xl object-cover aspect-square' src={`http://localhost:4000/uploads/${place.photos[0]}`} />
            )}
          </div>
           <h3 className='font-bold'>{place.address}</h3>
          <h3 className='text-sm text-gray-500'>{place.title}</h3>
          <div className='mt-2'>
           <span className='font-bold'>${place.price}</span>
          </div>
         </div>
         
        </Link>
      ))}
    </div>
  )
}

export default Index