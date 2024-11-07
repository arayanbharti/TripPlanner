import axios from "axios"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'//textSearch


const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask':['places.photos','places.displayName','places.id']
    }
}
export const GetPlacedetails=(data)=>axios.post(BASE_URL,data,config)
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxWidthPx=1000&maxHeightPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;