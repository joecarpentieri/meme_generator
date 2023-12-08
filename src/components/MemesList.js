import { Link } from "react-router-dom";
import MemeComponent from "./MemeComponent";

const MemesList = ({memesList, title, setFindMeme}) => {
    // console.log(memes.data.memes);

    const memeComponents = memesList.map((meme) => {
            // let splitUp = meme.url.split("/")
            // const memeKey = splitUp[splitUp.length-1].split(".")[0];
            // meme.key = memeKey;

            const handleFindMeme = () => {
                setFindMeme(meme)
                
            }
        
        return (
        <Link to="/generate-meme" onClick={handleFindMeme}>
                <MemeComponent key={meme.id} meme={meme} setFindMeme={setFindMeme}/>
                </Link>
                )
    })

    return ( 
        <>
            <h2>{title}</h2>
            <section>
                {memeComponents}
            </section>
        </>
    );
}

export default MemesList;