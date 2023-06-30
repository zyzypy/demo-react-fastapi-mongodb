import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import {API_BASE_URL} from "../config";


const Car = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  
  const [car, setCar] = useState(null)
  const [price, setPrice] = useState(null)
  const [error, setError] = useState([])
  const [isPending, setIsPending] = useState(true)
  
  
  const onChange = (e) => {
    setPrice(e.target.value)
  }
  
  
  // Get single car info
  // http get single car; update price field; delete
  const getCar = async () => {
    const res = await fetch(`${API_BASE_URL}/cars/${id}`)
    if (!res.ok) {
      setError('Error fetching car')
    } else {
      const data = await res.json()
      console.log(data)
      setCar(data)
      setPrice(data.price)
    }
    setIsPending(false)
  }
  
  
  // Update price of a car
  const updatePrice = async ()=> {
    const res = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PATCH',  // partial update
      headers:{
        // default text/plain will encode body to bytes, can't pass backend pydantic model validation
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({price})
    })
    const data = await res.json()
    if (!res.ok) {
      let errArray = data.detail.map(el=>{
        return `${el.loc[1]} -${el.msg}`
      })
      setError(errArray)
    } else {
      setError([])
      navigate('/cars')
      alert('updated')
    }
  }
  
  const deleteCar = async () => {
    const res = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    if (!res.ok) {
      const data = await res.json()
      let errArray = data.detail.map(el=>{
        return `${el.loc[1]} -${el.msg}`
      })
      setError(errArray)
    } else {
      setError([])
      navigate('/cars')
      alert('deleted')
    }
  }
  
  // execute once when component loads, [] can't delete
  useEffect(() => {
    getCar().then().then()
  }, [])
  
  
  
  return (
    <Layout>
      {isPending &&
      <div className="bg-red-500 w-full text-white h-10 text-lg" >
        <h2>Loading a car info...</h2>
      </div>}
      {error && <ul className="flex flex-col mx-auto text-center">
        {error.map((el,i)=>
          (<li key={i} className="my-2 p-1 border-2 border-red-700 max-w-md mx-auto">{el}</li>)
        )}
      </ul> }
  
      {car &&
        <div className="flex flex-col justify-between min-h-full items-center">
          <div className="font-bold text-xl text-gray-600 my-3">{car.brand}{car.make}</div>
          <div className="max-w-xl"><img alt="A car" className="rounded-md"
               src="https://via.placeholder.com/900x550.png?text=IMAGE+PLACEHOLDER"/></div>
          <div className="flex flex-col items-left justify-between font-normal text-lg m-4">
            <div><label>Price:</label> <span className=" text-orange-600 text-xl">{car.price}</span></div>
            <div><label>Year:</label> {car.year}</div>
            <div><label>Range:</label> {car.km}</div>
          </div>
          <div className="flex flex-row">
            <div className="flex border-2 rounded-md px-2">
            <FormInput label="change price"
                       placeholder={price}
                       type="number"
                       defaultValue={price}
                       value={price}
                       onChange={onChange}
                       required />
            
            <button onClick={updatePrice}
                  className="bg-yellow-500 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80">
            Edit price</button>
            </div>
            <button onClick={deleteCar}
                  className="bg-red-500 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80"
                  title="Warning: deleting is permanent!">
            Delete Car</button>
          </div>
        </div>
      }
    </Layout>
  )
}

export default Car