import { Link, Outlet } from "react-router-dom";

const MemeComponent = ({meme, setFindMeme}) => {

    const handleFindMeme = () => {
        setFindMeme(meme)
        console.log(meme);
    }

    return ( 
    <article>
        <h4><b>{meme.name}</b></h4>
        <img src={meme.url} ></img>
    </article>
    );
    // img button/link + title on top
}

export default MemeComponent;