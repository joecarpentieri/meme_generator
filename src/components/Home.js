import { Link, Outlet } from "react-router-dom";

const Home = () => {
    return ( 
        <>
            <nav>
                <ul>
                    <li><Link to="/">Memepage</Link></li>
                    <li><Link to="/generate-meme">Meme Generator</Link></li>
                    <li><Link to="/my-memes">MyMemes</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
     );
}
 
export default Home;