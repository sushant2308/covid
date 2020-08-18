import React from 'react';
import {Link} from 'react-router-dom';
import * as Icon from 'react-feather';
import {useWindowSize} from 'react-use';

function Navbar({darkMode, setDarkMode}) {
    const windowSize = useWindowSize();
    return (
        <div>
            {windowSize.width>769 && (
            <nav className="navbar ">
                <ul className="navbar-nav">
                    <li className="logo">
                        <Link to="/" className="nav-link">
                            <span className="link-text logo-text">Covid-19</span>
                            <img src="https://img.icons8.com/nolan/64/coronavirus.png" alt=""/>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <img src="https://img.icons8.com/nolan/64/home.png" alt=""/>
                            <span className="link-text">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/prevention" className="nav-link">
                        <img src="https://img.icons8.com/nolan/64/wash-your-hands.png" alt=""/>
                            <span className="link-text">Prevention</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/news" className="nav-link">
                            <img src="https://img.icons8.com/nolan/64/news.png" alt=""/>
                            <span className="link-text">News</span>
                        </Link>
                    </li> 
                    <li className="nav-item" id="themeButton">
                        <div className="nav-link" onClick={()=>setDarkMode(!darkMode)}>
                            {!darkMode ? <Icon.Sun color={'#ffc107'} /> : <Icon.Moon />}
                            <span className="link-text">{darkMode ?"Dark Mode" : "Light Mode"}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        )}
        {windowSize.width<=769 && (
            <nav className="navbar navbar-expand-lg">
                <span className="navbar-brand" >Stay Safe</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="ng">Menu</span>
                </button>    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/prevention" className="nav-link">Vaccine</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/news" className="nav-link">News</Link>
                        </li> 
                        <li className="nav-item">
                            <div className="nav-link" onClick={()=>setDarkMode(!darkMode)}>
                                {!darkMode ? <Icon.Sun color={'#ffc107'} /> : <Icon.Moon />}
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )}
        </div>
        
        
    );
}
export default Navbar;