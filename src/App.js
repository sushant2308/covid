import React,{useState,useEffect} from 'react';
import {Route,Switch} from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.scss';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {useLocalStorage} from 'react-use';
import State from './components/State';
import Prevention from './components/Prevention';
import News from './components/News';
import Loader from './components/Loader';
function App() {
    const [Dark,SetDark] = useLocalStorage('darkMode', false);
    const [loaded,setLoaded] =useState(true);
    useEffect(()=>{
        
        if(!Dark){
            document.querySelector('body').classList.add('dark-mode');
        }
        else{
            document.querySelector('body').classList.remove('dark-mode');
        }

    },[Dark]);
    setTimeout(()=>{
        setLoaded(false);
    },2000);

    if (loaded) {
        return (
            <Loader />
        );
    }
    else {
        return (
            <div className="">
              
    
                <main>
                    <Navbar darkMode={Dark} setDarkMode={SetDark}/>
                    <Switch>
                        <Route path='/' component={Home} exact/>
                        <Route path='/state/:id' component={State}/>
                        <Route path='/news' component={News}/>
                        <Route path='/prevention' component={Prevention}/>
                    </Switch>
                    
                    
                    
                </main>
                
            </div>
           
        );
    }

};

export default App;
