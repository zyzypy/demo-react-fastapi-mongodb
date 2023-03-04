import {Link, NavLink} from "react-router-dom";

const Header = () => {
  // I don't like over flexible writing approaches in js https://stackoverflow.com/questions/52562134/why-can-i-omit-the-return-statement-with-parenthesis-in-react
  return (
    <nav className="flex justify-between relative items-center font-mono h-16">
      <Link to="/" className="pl-8 font-semibold">React-FastApi-Mongodb Demo</Link>
      <div className="pr-8 font-semibold">
        {/* brace in argument, es6 syntax, unpack object to receive args */}
        <NavLink className={ ({isActive}) => isActive ? "active-link": "p-4" }
                 to="/">Home</NavLink>
        <NavLink className={ ({isActive}) => isActive ? "active-link": "p-4" }
                 to="/cars">Home</NavLink>
        <NavLink className={ ({isActive}) => isActive ? "active-link": "p-4" }
                 to="/new">Home</NavLink>
      </div>
    </nav>
  )
}

export default Header