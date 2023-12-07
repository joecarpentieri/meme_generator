import MemesList from "../components/MemesList";
import MemeForm from "../components/MemeForm";
import Home from "../components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

const MemesContainer = () => {

    const [allMemes, setAllMemes] = useState([])
    const [myMemes, setMyMemes] = useState([])

    const fetchAllMemes = async () => {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setAllMemes(data.data.memes);
    }
    const postMeme = async (newMeme) => {
        const response = await fetch('https://api.imgflip.com/caption_image', {
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            body: new URLSearchParams(newMeme)
        });
        console.log(response)
        const responseMeme = await response.json();
        console.log(responseMeme)

        const generatedMeme = {
            name:"new name",
            url: responseMeme.data.url
        }

        const updatedMyMemes = [...myMemes,generatedMeme]
        setMyMemes(updatedMyMemes)
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
                    element: <MemeForm memesList={allMemes} findMeme={allMemes[0]} postMeme = {postMeme}/>
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
        {allMemes!=[]? <RouterProvider router={memeRoutes}/>: <p>Loading...</p>}
    </>
     );
}
 
export default MemesContainer;