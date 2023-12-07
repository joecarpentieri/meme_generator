import MemesList from "../components/MemesList";
import MemeForm from "../components/MemeForm";
import Home from "../components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

const MemesContainer = () => {

    const [allMemes, setAllMemes] = useState(null)
    const [myMemes, setMyMemes] = useState([])

    const fetchAllMemes = async () => {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setAllMemes(data.data.memes);
        // for ()
        // console.log(allMemes);
    }

    useEffect(() => {
        fetchAllMemes();
    }, [])

    const memeRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/",
                    element: <MemesList memesList={allMemes}/>
                },
                {
                    path: "/generate-meme",
                    element: <MemeForm/>
                },
                {
                    path: "/my-memes",
                    element: <MemesList memesList={myMemes}/>
                }
            ]
        }
    ])
    

    return ( 
    <>
        <h1>All Memes</h1>
        {allMemes ? <RouterProvider router={memeRoutes}/>: <p>Loading...</p>}
    </>
     );
}
 
export default MemesContainer;