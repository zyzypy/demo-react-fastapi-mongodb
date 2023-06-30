import {useState, useEffect} from "react";

import Layout from "../components/Layout";
import Card from "../components/Card"
import {API_BASE_URL} from "../config";


console.log('process.env:', process.env)
console.log('API_BASE_URL:', API_BASE_URL)


const Cars = () => {
  const [cars, setCars] = useState([])
  const [brand, setBrand] = useState('')
  const [min_price, setMinPrice] = useState(0)
  const [max_price, setMaxPrice] = useState(100000)
  const [page, setPage] = useState(1)
  
  const [isPending, setIsPending] = useState(true)
  
  
  const handleChangeBrand = (event) => {
    setCars([])
    setBrand(event.target.value)
    setIsPending(true)
  }
  const handleChangeMinPrice = (e) => {
    setCars([])
    if (e.target.value) {
      setMinPrice(e.target.value)
    } else {
      setMinPrice(0)
    }
  }
  const handleChangeMaxPrice = (e) => {
    setCars([])
    setMaxPrice(e.target.value)
  }
  const handleChangePage = (e) => {
    setCars([])
    setPage(e.target.value)
  }
  
  // Get cars info
  // another writing approach async/await
  useEffect(()=>{
    fetch(`${API_BASE_URL}/cars/`+
      `?brand=${brand}&min_price=${min_price}&max_price=${max_price}&page=${page}`, {
      method: 'GET'
    }).then(response=>response.json())
      .then(json=>{
        console.log(json)
        setCars(json)
        setIsPending(false)})
  }, [brand, min_price, max_price, page])
  
  
  return (
    <Layout>
      <h2 className="font-bold font-mono text-lg text-center my-4">
        Cars - {brand ? brand: "all brands"}</h2>
      <div className="mx-8 mb-8 ml-auto">{/* margin x axis */}
        <label htmlFor="cars">Choose a brand: </label>
        <select id="cars" name="cars" onChange={handleChangeBrand} className="text-yellow-500">
          <option value="">All cars</option>
          <option value="Fiat">Fiat</option>
          <option value="Citroen">Citroen</option>
          <option value="Renault">Renault</option>
          <option value="Opel">Opel</option>
        </select>
        <div className="">
           {/*size/width attribute doesn't work. style has to be pass to props as obj */}
          <label>Price: </label>
          <input name="min_price" type="number" min="0" defaultValue="0" className="border-yellow-500 border-2" style={{width:'4rem'}}
            onChange={handleChangeMinPrice}/>
          <input name="max_price" type="number" max="100000" defaultValue="100000" className="border-yellow-500 border-2" style={{width:'4rem'}}
            onChange={handleChangeMaxPrice}/>
        </div>
        <div className="">
          <label>Page: </label>
          <input name="page" type="number" max="1000" defaultValue="1" className="border-yellow-500 border-2" style={{width:'8rem'}}
            onChange={handleChangePage}/>
        </div>
      </div>
      <hr className="md-2"/>
      
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
