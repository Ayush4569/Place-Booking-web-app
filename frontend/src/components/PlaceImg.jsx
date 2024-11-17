import React from 'react'

function PlaceImg({place,index=0,className=null}) {
    if(!place.photos?.length) return ''
    if(! className) {
        className = "object-cover"
    }
  return (
   <img src={place.photos[index]} className={className} />
  )
}

export default PlaceImg