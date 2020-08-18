import Search from './Search';
import React from 'react';
import Cards from './Cards';
import Charts from './Charts';
import Table from './Table';
import Footer from './Footer';
function Home () {
    return (
            <React.Fragment>
                <div className="Home">
                    <div className="home-left">
                        <div className="header fadeInUp"><h1 className="India">Covid-19 India Tracker</h1></div>
                        <div className="header fadeInUp" style={{animationDelay: '1s'}}>
                            <Search/>
                        </div>
                        <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                            <Cards/>
                        </div >
                        <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                            <Charts/>
                        </div>
                        <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                            <Table/>
                        </div>
                        <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                            <Footer/>
                        </div>
                        
                    </div>
                    
                </div>
            </React.Fragment>
                    

              
               
                
                
    );
}
export default Home;