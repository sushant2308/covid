import React from 'react';
import {STATE_NAMES} from '../Constants';
import CardState from './CardState';
import ChartState from './ChartState';
const State =(props) => {
    const name=props.match.params.id;
    
    



    return (
        <div className="Home container">
            
                <div className="home-left">
                    <div className="header fadeInUp"><h1 className="state-name">{STATE_NAMES[name]}</h1></div>
                    <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                        <CardState props={STATE_NAMES[name]}/>
                    </div >
                    <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                        <ChartState props={name}/>
                    </div>
                </div>
        </div>
    );
};

export default State;


