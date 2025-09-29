import { useContext } from "react";
import Header from "./components/Header"
import SearchBox from "./components/SearchBox";
import WeatherGrid from "./components/WeatherGrid";
import { Store } from "./context";
import Error from "./components/Error";


function App() {
  const { error } = useContext(Store)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container min-h-screen py-8">
        {
          error
            ?
            <Error />
            :
            <>
              <h1 className="text-6xl text-center font-bold max-md:text-[3.5rem]">How’s the sky looking today?</h1>
              <SearchBox />
              <WeatherGrid />
            </>
        }
      </div>
    </main>
  )
}

export default App
