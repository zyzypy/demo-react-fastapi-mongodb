import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

import Layout from "../components/Layout";
import FormInput from "../components/FormInput";

const NewCar = () => {
  // car structure
  const emptyCar = {
    'brand': 'N/A',
    'make': 'N/A',
    'year': 0,
    'engine': 0,
    'price': 0
  }
  const inputs = [
    {
      id: 'brand',
      name: 'brand',
      type: 'text',
      placeholder: 'brand',
      label: 'Brand'
    },
    {
      id: 'make',
      name: 'make',
      type: 'text',
      placeholder: 'Make',
      label: 'Make'
    },
    {
      id: 'year',
      name: 'year',
      type: 'number',
      placeholder: 'Year',
      label: 'Year'
    },
    {
      id: 'price',
      name: 'price',
      type: 'number',
      placeholder: 'Price',
      label: 'Price'
    },
    {
      id: 'cm3',
      name: 'cm3',
      type: 'number',
      placeholder: 'Engine displacement cm³',
      label: 'Engine'
    },
    {
      id: 'km',
      name: 'km',
      type: 'number',
      placeholder: 'km',
      label: 'Range'
    },
  ]
  
  // state
  const [newCar, setNewCar] = useState(emptyCar)
  const [error, setError] = useState([])
  const navigate = useNavigate()  // redirect
  
  // events handler
  const onChange = (e) => {
    setNewCar({...newCar, [e.target.name]: e.target.value})
  }
  const handleReset = (e) => {
    setNewCar(emptyCar)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addCar(newCar)
  }
  
  // http request
  const addCar = async (newCar) => {
    const response =
      await fetch(`http://localhost:8000/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
      })
    const data = await response.json()
    
    if (!response.ok) {
      let errArray = data.detail.map(el=>{
        return `${el.loc[1]} -${el.msg}`
      })
      setError(errArray)
    } else {
      setError([])
      navigate('/cars')
    }
  }
  
  
  return (
    <Layout>
      <div>
        <h1 className="text-center text-lg my-2 font-bold">Insert A New Car</h1>
      </div>
      <div></div>
      {error && <ul>
        {error && error.map((el,i)=>(
          <li key={i} className="my-2 p-1 border-red-700 mx-auto">{el}</li>
        ))}
      </ul>}
      
      <div className="flex flex-row align-middle justify-center">
        <form onSubmit={handleSubmit} className="w-1/2 px-4">
          {inputs.map((input)=>(    // [].map(()=>{return (<div/>)})
            <FormInput key={input.id}
                       name={input.name}
                       {...input}
                       value={newCar[input.name]}
                       onChange={onChange}
                       required />
          ))}
          <button type="reset" className="bg-gray-500 p-2 my-2 w-full text-white rounded-md"
                  onClick={handleReset}>Reset</button>
          <button type="submit" className="bg-yellow-500 p-2 my-2 w-full text-white rounded-md"
                  onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default NewCar