import { Link, Outlet } from "react-router-dom";

const MemeComponent = ({meme, setFindMeme}) => {

    const handleFindMeme = () => {
        setFindMeme(meme)
    }

    return ( 
    <article>
        <h4><b><Link to="/generate-meme" onClick={handleFindMeme}>{meme.name}</Link></b></h4>
        <img src={meme.url} ></img> 
    </article>
    );
    // img button/link + title on top
}
 
export default MemeComponent;