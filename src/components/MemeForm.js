import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg"

const MemeForm = ({memesList, findMeme, postMeme}) => {

    const [stateMeme, setStateMeme] = useState({
        template_id:findMeme.id,
        username:"",
        password:"",
        text0:"",
        text1:"",
        // boxes:[
        //     {
        //        "text": "One does not simply",
        //        "x": 10,
        //        "y": 10,
        //        "width": 548,
        //        "height": 100,
        //        "color": "#ffffff",
        //        "outline_color": "#000000"
        //     },
        //     {
        //        "text": "Make custom memes on the web via imgflip API",
        //        "x": 10,
        //        "y": 225,
        //        "width": 548,
        //        "height": 100,
        //        "color": "#ffffff",
        //        "outline_color": "#000000"
        //     }
        //  ]
    })
    
    const [currentMeme, setCurrentMeme] = useState(memesList.find((meme)=>meme==findMeme))

    const [imageUrl, setImageUrl] = useState("")

    
    const memesOptions = memesList.map((meme)=>{
        return <option key={meme.id} value={meme.id} img = {meme.url}>
            <div>
            {meme.name}
            <image src = {meme.url} ></image>
            </div>
            </option>
    })

    const handleChange=(event)=>{
        const propertyName = event.target.name;
        const updatedStateMeme = {...stateMeme};
        updatedStateMeme[propertyName] = event.target.value;
        setStateMeme(updatedStateMeme);
        // console.log(stateMeme);
    }

    const handleFormSubmit = (event)=>{
        event.preventDefault()

        if (!stateMeme.username|| !stateMeme.password){
            return alert("Either the username or password field is empty")
        }

        setImageUrl("")
        postMeme(stateMeme, setCurrentMeme)
        setStateMeme({template_id:currentMeme.id,
            username:"",
            password:"",
            text0:"",
            text1:""})
        // set
    }

    useEffect(()=>{

        const updatedMeme = memesList.find((meme)=>meme.id==stateMeme.template_id)
        console.log(updatedMeme)
        if (updatedMeme){
            setImageUrl(updatedMeme.url)
        }

        console.log(updatedMeme)

    },[stateMeme.template_id])

    useEffect(()=>{

        // const updatedMeme = memesList.find((meme)=>meme.id==stateMeme.template_id)
        // if (updatedMeme){
            setImageUrl(currentMeme.url)
        // }

    },[currentMeme.url])

    // console.log(currentMeme)
    

    return ( 
        <section id = "form-section">
            <img id={imageUrl ? "" : "rotating"} src={imageUrl ? imageUrl : logo} alt="Meme loading..."></img>
            <form id="form" onSubmit={handleFormSubmit} >
                <h1>Generate Meme!</h1>

                <label htmlFor="template_id" >Choose your template!</label>
                <select 
                id= "template_id"
                name="template_id"
                defaultValue={findMeme.id}
                onChange={handleChange}>
                    {memesOptions}
                </select>

                <label htmlFor="username" >Username:</label>
                <input 
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    onChange={handleChange}
                    value={stateMeme.username}
                />

                <label htmlFor="password" >Password:</label>
                <input 
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={stateMeme.password}
                />

                <label htmlFor="text0" >Text box 1</label>
                <input 
                    id="text0"
                    name="text0"
                    type="text"
                    placeholder="Text box 1"
                    onChange={handleChange}
                    value={stateMeme.text0}
                />

                <label htmlFor="text1" >Text box 2</label>
                <input 
                    id="text1"
                    name="text1"
                    type="text"
                    placeholder="Text box 2"
                    onChange={handleChange}
                    value={stateMeme.text1}
                />
                <input type="submit" value="Generate"/>
            </form>
        </section>
    );
}

export default MemeForm;