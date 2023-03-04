import {Link} from 'react-router-dom'

const Card = ({car}) => {
  // console.log(props)
  let {_id, brand, year, price, make, km, cm3} = car
  
  return (
    <Link to={`/cars/${_id}`}>
      <div className="shadow-lg p-5 m-2 flex flex-col rounded-lg bg-white
      transition ease-in-out hover:scale-105 duration-100 font-mono">
        <div className="font-bold text-center text-lg">
          <span className="">{brand}</span>{make}</div>
        <div><span className="text-gray-500"> Year:</span> {year} </div>
        <div><span className="text-gray-500"> Price:</span> ${price} </div>
        <div><span className="text-gray-500"> Range:</span> {km}km </div>
        <div><span className="text-gray-500"> Engine:</span> {cm3}cm³ </div>
      </div>
    </Link>
  )
}

export default Card
