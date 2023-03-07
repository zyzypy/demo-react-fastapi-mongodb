import {Link, NavLink} from "react-router-dom";

const Header = () => {
  // I don't like over flexible writing approaches in js https://stackoverflow.com/questions/52562134/why-can-i-omit-the-return-statement-with-parenthesis-in-react
  return (
    <nav className="flex justify-between relative items-center font-mono h-16 bg-black text-white">
      <Link to="/" className="pl-8 font-semibold">React-FastApi-Mongodb Demo</Link>
      <div className="pr-8 font-semibold mx-0.5">
        {/* brace in argument, es6 syntax, unpack object to receive args */}
        <NavLink className={ ({isActive}) => isActive ? "active-link  text-yellow-500": "" }
                 to="/">Home</NavLink><span>/</span>
        <NavLink className={ ({isActive}) => isActive ? "active-link  text-yellow-500": "" }
                 to="/cars">Cars</NavLink><span>/</span>
        <NavLink className={ ({isActive}) => isActive ? "active-link  text-yellow-500": "" }
                 to="/new">NewCar</NavLink><span>/</span>
        <NavLink className={ ({isActive}) => isActive ? "active-link  text-yellow-500": "" }
                 to="http://localhost:8000/docs" target="_blank">Docs</NavLink>
      </div>
    </nav>
  )
}

export default Header