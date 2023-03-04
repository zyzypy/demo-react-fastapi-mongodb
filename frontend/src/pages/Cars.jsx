import {useState, useEffect} from "react";

import Layout from "../components/Layout";
import Card from "../components/Card"


let BASE_URL = 'http://127.0.0.1:8000'

const Cars = () => {
  const [cars, setCars] = useState([])
  const [brand, setBrand] = useState('')
  const [isPending, setIsPending] = useState(true)
  
  
  const handleChangeBrand = (event) => {
    setCars([])
    setBrand(event.target.value)
    setIsPending(true)
  }
  
  
  useEffect(()=>{
    fetch(`${BASE_URL}/cars/`)
      .then(response=>response.json())
      .then(json=>{
        console.log(json);setCars(json)
        setIsPending(false)})
  }, [brand])
  
  
  return (
    <Layout>
      <h2 className="font-bold font-mono text-lg text-center my-4">
        Cars - {brand ? brand: "all brands"}</h2>
      <div className="mx-8 mb-8">{/* margin x axis */}
        <label htmlFor="cars">Choose a brand: </label>
        <select id="cars" name="cars" onChange={handleChangeBrand}>
          <option value="">All cars</option>
          <option value="Fiat">Fiat</option>
          <option value="Citroen">Citroen</option>
          <option value="Renault">Renault</option>
          <option value="Opel">Opel</option>
        </select>
      </div>
      
      <div className="mx-8">
        {isPending && <div><h2>Loading {brand} cars...</h2></div> }
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{/* gap grid margin in flex layout */}
          {cars && cars.map(
            (el) => {
              return (
                <Card key={el._id} car={el}></Card>
              )
            }
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Cars
