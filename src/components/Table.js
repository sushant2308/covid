import React,{useEffect,useState} from 'react';
import axios from 'axios';
import CountUp from 'react-countup';



function Table(){
    const [Data,setData] = useState([]);

    useEffect(() => {
        const fetchData = async ()=>{
        try {
            let data=[];
            const res = await axios.get(`https://covid19.mathdro.id/api/countries/india/confirmed`);
            for(const dataobj of res.data){
                data.push(dataobj);
            }
            setData(data);
        }
        catch(err){

        }
    }
    fetchData();
    }, []);
    
    
    return (
        <div className="table-responsive" >
            
                
                    <h1 className="title">State Wise Data</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>State Name</th>
                                <th>Confirmed</th> 
                                <th>Active</th>
                                <th>Recovered</th>
                                <th>Death</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Data.map((item,i) => (
                                    <tr key={i}>
                                        <td>{item.provinceState}</td>
                                        <td><CountUp start={0} end={item.confirmed} duration={2.75}/></td>
                                        <td><CountUp start={0} end={item.active} duration={2.75}/></td>
                                        <td><CountUp start={0} end={item.recovered} duration={2.75}/></td>
                                        <td><CountUp start={0} end={item.deaths} duration={2.75}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        
                        
                    </table>
            
            
        </div>
    );
};
export default Table;