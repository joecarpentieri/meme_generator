import MemesList from "../components/MemesList";
import MemeForm from "../components/MemeForm";
import Home from "../components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

const MemesContainer = () => {

    const [allMemes, setAllMemes] = useState([])
    const [myMemes, setMyMemes] = useState([])
    const [findMeme, setFindMeme] = useState(null)

    const fetchAllMemes = async () => {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setAllMemes(data.data.memes);
        setFindMeme(data.data.memes[0]);
    }

    const postMeme = async (newMeme, setter) => {
        const response = await fetch('https://api.imgflip.com/caption_image', {
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            body: new URLSearchParams(newMeme)
        });
        console.log(response)
        const responseMeme = await response.json();
        console.log(responseMeme)

        const generatedMeme = allMemes.find((meme)=>meme.id==newMeme.template_id)
        const updatedMeme = {...generatedMeme}
        updatedMeme.url = responseMeme.data.url

        const updatedMyMemes = [...myMemes,updatedMeme]
        setMyMemes(updatedMyMemes)
        setter(updatedMeme)
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
                    element: <MemesList memesList={allMemes} setFindMeme={setFindMeme}/>,
                    // children: [
                    //     {
                    //         path: "/generate-meme",
                    //         element: <MemeForm memesList={allMemes} findMeme={allMemes[0]} postMeme = {postMeme}/>
                    //     },
                    // ]
                },
                {
                    path: "/generate-meme",
                    element: <MemeForm memesList={allMemes} findMeme={findMeme} postMeme = {postMeme}/>
                },
                {
                    path: "/my-memes",
                    element: <MemesList memesList={myMemes} setFindMeme={setFindMeme}/>
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