import React from 'react';
import './Components.css';

// const style = {
//     marginTop: '200px',
//     width: '18rem'
// }

const Home = () => {
    return (
        <div id="home" class="card">
            <h2>Welcome to the Home Page!</h2>
        
            <ul id="homelist">
                
                <h4>Instructions:</h4>
                <li>Click on 'Indexing Launcher', then you can input a web page to index all the words from that page.</li>
                <li>Click on 'Custom Search Engine' to search the words in the database you have priviously indexed.</li>
                <br/>
                Dropdown Menus: 
                <li>Search: Search from a file or search from google.</li>
                <li>Browser: Display your browser sepcification. </li>
                <li>Geolocation: Displays your current latitude and longitude.</li>
                <li>About: Developer's names and you can contact us by email.</li>
            </ul>
        
        </div>
    )
}
export default Home;

