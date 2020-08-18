import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Loader from './Loader';
import Footer from './Footer';

const News =()=>{
    const [Result,setResult] = useState([]);
    const [Res,setRes] = useState([]);
    const [loaded,setLoaded] =useState(true);
    useEffect(()=>{
        const fetchdata = async ()=>{
            try {
                var url1 = 'http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=57cd1b552e4340c1b93ee4754925895b';
                var url2= 'http://newsapi.org/v2/top-headlines?country=in&apiKey=57cd1b552e4340c1b93ee4754925895b'
                const res1 = await Axios.get(url2);
                const res2=await Axios.get(url1);
                const act= res1.data.articles;
                const act2= res2.data.articles;
                setResult(act);
                setRes(act2);
                if(res1!=null) setLoaded(false);
            }
            catch(err){
                console.log(err);
            }
        }
        
        fetchdata();
    },[]);
    console.log(Result);
    if(loaded) {
        return (
            <Loader/>
        );
    }
    
    else {
        return (
        <div className="Home">
            <h1 className="head">Top Headlines</h1>
            <div className="container">
                <div className="carousel-inner">
                    <Carousel infiniteLoop autoPlay>
                        {
                            Result.map((item,i)=>(
                                <div className="carousel-item active" key={i}>
                                    <img className="bd-placeholder-img" src={item.urlToImage} alt="First slide"/>
                                    <div className="carousel-caption text-left">
                                        <h2 className="Caption">{item.title}</h2>
                                        
                                        <p className="Caption"><a className="btn btn-lg btn-primary" href={item.url} role="button">Read full Article</a></p>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </Carousel>
                </div>
            </div>
            <div className="container g">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="cor text-left">Health News</h1>
                        {
                            Res.map((item,i)=>(
                                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                    <div className="col p-4 d-flex flex-column position-static d">
                                        
                                        <h3 className="mb-0">{item.title}</h3>
                                        <div className="mb-1 text-muted">{item.publishedAt}</div>
                                        <p className="card-text mb-auto">{item.description}</p>
                                        <a href={item.url} className="stretched-link">Continue reading</a>
                                    </div>
                                    <div className="col-auto d-none d-lg-block">
                                        <img className="bd-placeholder-img" src={item.urlToImage} alt="d"  style={{width:"200px",height:"250px"}}/>
                                    </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className="col-md-4">
                    <h1 className="cor text-left">Vaccine Tracker</h1>
                        <div class="card gi">
                            
                            <div className="row pre">
                                <div className="col-sm-6"><h5>Preclinical Trials</h5></div>
                                <div className="col-sm-6">135+</div>
                            </div>
                            <div className="row I">
                                <div className="col-sm-6"><h5>Phase I</h5></div>
                                <div className="col-sm-6">20</div>
                            </div>
                            <div className="row II">
                                <div className="col-sm-6"><h5>Phase II</h5></div>
                                <div className="col-sm-6">11</div>
                            </div>
                            <div className="row III">
                                <div className="col-sm-6"><h5>Phase III</h5></div>
                                <div className="col-sm-6">8</div>
                            </div>
                            <div className="row app">
                                <div className="col-sm-6"><h5>Approved</h5></div>
                                <div className="col-sm-6">2</div>
                            </div>
                            <div class="card-footer"><a href="https://www.nytimes.com/interactive/2020/science/coronavirus-vaccine-tracker.html">For details</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fadeInUp" style={{position:"relative",marginTop:"4rem"}}>
                            <Footer/>
            </div>
            
                
        </div>
        
        );
     }
};
export default News;