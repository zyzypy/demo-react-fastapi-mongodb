import {useEffect, useState} from 'react'

import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Card from "./components/Card"

function App() {
  let data = [{brand:"Fiat", color:"green", model:"500L", price:7000, "year":2020,"id":1},
    {brand:"Peugeot", color:"red", model:"5008", price:8000, "year":2018,"id":2},
    {brand:"Volkswagen", color:"white", model:"Golf 7", price:8500, "year":2019,"id":3},
  ]
  let [users, setUsers] = useState([])
  let [budget, setBudget] = useState(5000)
  let [page, setPage] = useState(1)
  
  const onChangeHandler = (event) => {
    setBudget(event.target.value)
  }

  useEffect(
    // life circle, like vue.mounted watch
    // https://reqres.in a website delivery pretend api response
    ()=>{
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then(response=>response.json())
        .then(json=>setUsers(json['data']))
      }, [page]
  )
  
  return (
    <div className="App">
      <Header></Header>
      <button onClick={()=>{page===1?setPage(2):setPage(1)}}>
        Toggle users
      </button>
      <ul>
        {users&&users.map(
          (el)=>{
            return <li key={el.id}>{el.email}</li>
          })
        }
      </ul>
      <div >Your budget is:<span>{budget}</span></div>
      <div>
        {data.map(
          (el)=>{
            return (
              <Card key={el.id} car={el}></Card>
            )
          }
        )}
      </div>
      <div>
        <label htmlFor="budget">Budget:</label>
        <input id="budget" name="budget" min="30" max="1000000" type="number" step="100"
               onChange={onChangeHandler}></input>
      </div>
    </div>
  );
}

export default App;
