import { useSelector } from "react-redux"
import { Routing } from "./components/Routing"

function App() {

  const store = useSelector(store=> store?.user);

  return (
    <>
    <Routing store={store}/>
    </>
  )
}

export default App
