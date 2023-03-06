import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

import Layout from "../components/Layout";
import FormInput from "../components/FormInput";


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
  
  
  // http get single car; update price field; delete
  const getCar = async() => {
    const res = await fetch(`http://localhost:8000/cars/${id}`)
    if (!res.ok) {
      setError('Error fetching car')
    } else {
      const data = await res.json()
      setCar(data)
      setPrice(data.price)
    }
    setIsPending(false)
  }
  
  const deleteCar = async () => {
    const res = await fetch(`http://localhost:8000/cars/${id}`, {
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
    }
  }
  
  const updatePrice = async ()=> {
    const res = await fetch(`http://localhost:8000/cars/${id}`, {
      method: 'PATCH',  // partial update
      headers: {},
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
    } navigate('/cars')
  }
  
  
  // onload
  useEffect(() => {
    getCar().then().then()
  }, [])
  
  
  
  return (
    <Layout>
      {isPending &&
      <div className="bg-red-500 w-full text-white h-10 text-lg" >
        <h2>Loading a car info...</h2>
      </div>}
      {error &&
      <ul className="flex flex-col mx-auto text-center">
        {error.map((el,i) =>
          (<li key={i} className="my-2 p-1 border-2 border-red-700 max-w-md mx-auto">{el}</li>)
        )}
      </ul> }
  
      {car &&
        <div className="flex flex-col justify-between min-h-full items-center">
          <div className="font-bold text-xl text-gray-600 my-3">{car.brand}{car.make}</div>
          <div className="max-w-xl"><img alt="A car" src="https://via.placeholder.com/900x
          550.png?text=IMAGE+PLACEHOLDER"/></div>
          <div className="flex flex-col items-center font-normal text-lg">
            <div>Price: <span className="font-semibold text-orange-600 text-xl">{car.price}</span></div>
            <div>Year: {car.year}</div>
            <div>Range: {car.km}</div>
          </div>
          <div className="flex flex-row">
            <FormInput label="change price"
                       placeholder={price}
                       type="number"
                       value={price}
                       onChange={onChange}
                       required />
            <button onClick={updatePrice}
                  className="bg-yellow-500 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80">
            Edit price</button>
            <button onClick={deleteCar}
                  className="bg-red-500 text-white p-2 rounded-md m-3 transition-opacity hover:opacity-80">
            Delete Car</button>
          </div>
          <p>Warning: deleting is permanent!</p>
        </div>
      }
    </Layout>
  )
}

export default Car