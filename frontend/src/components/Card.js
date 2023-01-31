const Card = ({car}) => {
  // console.log(props)
  let {brand, model, year, price, color} = car
  return (
    <div>
      <div>{brand}{model}</div>
      <div>Year:{year}</div>
      <div>Price:<span>{price}</span></div>
      <div>Color:{color}</div>
    </div>
  )
}

export default Card
