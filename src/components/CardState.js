import React,{useEffect,useState} from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
const CardState =(props) => {
    const [Conf,setConf] = useState(0);
    const [Recovered,setRecovered] = useState(0);
    const [Death,setDeath] = useState(0);
    const [Active,setActive] = useState(0);
    
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await axios.get(`https://covid19.mathdro.id/api/countries/india/confirmed`);
                
                for(const item of res.data){
                    
                    if(item.provinceState===props.props){
                        
                        setConf(item.confirmed);
                        setActive(item.active);
                        setRecovered(item.recovered);
                        setDeath(item.deaths);
                        
                    }
                }
                
                
            }
            catch(err){

            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return (
        <div className="row fadeInUp">
            <div className="col-md-3 fadeInUp">
                <div className="card" >
                    <div className="card-body confirmedbody">
                        <span className="mx-2">
                            <CountUp start={0} end={Conf} duration={2.75}/>
                        </span>
                    </div>
                    <div className="card-footer confirmedfooter">
                        Confirmed
                    </div>
                </div>
            </div>
        
            <div className="col-md-3 fadeInUp">
                <div className="card">
                    <div className="card-body activebody">
                        <span className="mx-2"><CountUp start={0} end={Active} duration={2.75}/></span>
                        <br/>
                        <br/>
                        <span className="mx-2">{(parseInt(Active)/parseInt(Conf) * 100).toFixed(2)} %</span>
                    </div>

                    <div className="card-footer activefooter">Active</div>
                </div>
            </div>
            <div className="col-md-3 fadeInUp">
                <div className="card ">
                    <div className="card-body recoveredbody">
                        <span className="mx-2"><CountUp start={0} end={Recovered} duration={2.75}/></span>
                        <br/>
                        <br/>
                        <span className="mx-2">{(parseInt(Recovered)/parseInt(Conf) * 100).toFixed(2)} %</span>
                    </div>
                    <div className="card-footer recoveredfooter">Recovered</div>
                </div>
            </div>
            <div className="col-md-3 fadeInUp">
                <div className="card ">
                    
                    <div className="card-body deathbody">
                        <span className="mx-2"><CountUp start={0} end={Death} duration={2.75}/></span>
                        <br/>
                        <br/>
                        <span className="mx-2">{(parseInt(Death)/parseInt(Conf) * 100).toFixed(2)} %</span>
                    </div>
                    <div className="card-footer deathfooter">Deaths</div>
                </div>
            </div>
        </div>
    );

}
export default CardState;