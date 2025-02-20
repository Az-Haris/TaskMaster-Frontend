import { Outlet } from "react-router"
import Navbar from "./components/Navbar"



function App() {

  return (
    <>
      <nav>
        <Navbar></Navbar>
        <div className="py-[27px] md:py-8"></div>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default App
