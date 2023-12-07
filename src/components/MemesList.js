import MemeComponent from "./MemeComponent";

const MemesList = ({memesList}) => {
    // console.log(memes.data.memes);

    const memeComponents = memesList.map((meme) => {
            // let split = memes.url.split("/")
            // console.log(split);
            // const memeKey = split[-1];
        return <MemeComponent key={meme.id} meme={meme} />
    })

    return ( 
        <section>
            <h2>Meme List</h2>
            {memeComponents}
        </section>

     );
}
 
export default MemesList;