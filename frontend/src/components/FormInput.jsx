// over encapsulate, should write in newCar.jsx
const FormInput = (props) => {
  const {label, placeholder, type, onChange, name} = props
  
  return (
    <div className="flex flex-row items-center justify-between my-2 w-full">
      <label className="w-1/5">{label}</label>
      <input className="w-4/5 p-1 ml-2 rounded-md border-2 border-gray-300"
             placeholder={placeholder} type={type} name={name}
             onChange={onChange} />
    </div>
  )
}

export default FormInput