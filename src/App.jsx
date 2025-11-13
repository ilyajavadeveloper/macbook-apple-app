import React from 'react'
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";

const App = () => {
    return (
     <main className="App">

         <NavBar/>
         <Hero/>
         <ProductViewer/>
     </main>
    )
}
export default App
