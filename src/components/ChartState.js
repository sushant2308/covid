import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
function ChartState(props){
    const [Conf,setConf] = useState([]);
    const [death,setDeath] = useState([]);
    const [recovered,setRecovered] = useState([]);
    const [Dc,setDc] = useState([]);
    const [dailydeath,setDailyDeath] = useState([]);
    const [dailyrecovered,setDailyRecovered] = useState([]);
    const [Date,setDate]= useState([]);  
    useEffect(() => {
      const fetchData = async ()=>{
        try {
            const st= props.props;
            const res = await axios.get(`https://api.covid19india.org/v5/min/timeseries-${st}.min.json`);
            const act=res.data[Object.keys(res.data)[0]];
            let dates=[];
            let confirms=[];
            let rec=[];
            let dea=[];
            let dailrec=[];
            let dailcon=[];
            let daildea=[];
            console.log(act.dates);
            for(var key in act.dates){
             
              console.log(act.dates[key].delta);
              dates.push(key);
              if(act.dates[key].total.confirmed!=null) confirms.push(parseInt(act.dates[key].total.confirmed));
              else confirms.push(0);
              if(act.dates[key].total.recovered!=null) rec.push(parseInt(act.dates[key].total.recovered));
              else rec.push(0);
              if(act.dates[key].total.deceased!=null) dea.push(parseInt(act.dates[key].total.deceased));
              else dea.push(0);
              if(act.dates[key].delta!=null) dailcon.push(parseInt(act.dates[key].delta.confirmed));
              else dailcon.push(0);
              if(act.dates[key].delta!=null && act.dates[key].delta.recovered!=null) dailrec.push(parseInt(act.dates[key].delta.recovered));
              else dailrec.push(0);
              if(act.dates[key].delta!=null && act.dates[key].delta.deceased!=null) daildea.push(parseInt(act.dates[key].delta.deceased));
              else daildea.push(0);
              
              
            }
            setConf(confirms);
            setDate(dates);
            setRecovered(rec);
            setDeath(dea);
            setDc(dailcon);
            setDailyDeath(daildea);
            setDailyRecovered(dailrec);
            
            
        }
        catch(err){

        }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [val,setVal]=useState(false);
    return (
        <div className="container">
          <button onClick={()=>setVal(!val)} className={!val ?"btn btn-danger":"btn btn-warning"}>{!val ?"Cumulative":"Daily"}</button>
          {val ?
              <Line
                data={{
                  labels: Date,
                  datasets: [
                    {
                      label:"Confirmed",
                      data: Conf,
                      fill: true,
                      backgroundColor: "#FFE0E6",
                      borderWidth: 2,
                      borderColor: "#FF073A"
                    }
                  ]
                }}

                options={{
                  responsive: true,
                  legend: {
                    display:false,
                  },
                  title: {
                    display: true,
                    text: 'Confirmed'
                },
                  scales:{
                    xAxes: [{
                        display: false //this will remove all the x-axis grid lines
                    }]
                  }
                }}
                
              />
              :
              <Line
            data={{
              labels: Date,
              datasets: [
                {
                  label:"Confirmed",
                  data: Dc,
                  fill: true,
                  backgroundColor: "#FFE0E6",
                  borderWidth: 2,
                  borderColor: "#FF073A"
                }
              ]
            }}

            options={{
              responsive: true,
              legend: {
                display:false,
              },
              title: {
                display: true,
                text: 'Confirmed'
            },
              scales:{
                xAxes: [{
                    display: false //this will remove all the x-axis grid lines
                }]
              }
            }}
            
          />
          }
          {val ?
              <Line
                data={{
                  labels: Date,
                  datasets: [
                    {
                      label:"Recovered",
                      data: recovered,
                      fill: true,
                      backgroundColor: "#E4F4E7",
                      borderWidth: 2,
                      borderColor: "#28A744"
                    }
                  ]
                }}

                options={{
                  responsive: true,
                  legend: {
                    display:false,
                  },
                  title: {
                    display: true,
                    text: 'Recovered'
                },
                  scales:{
                    xAxes: [{
                        display: false //this will remove all the x-axis grid lines
                    }]
                  }
                }}
                
              />
              :
              <Line
            data={{
              labels: Date,
              datasets: [
                {
                  label:"Recovered",
                  data: dailyrecovered,
                  fill: true,
                  backgroundColor: "#E4F4E7",
                  borderWidth: 2,
                  borderColor: "#28A744"
                }
              ]
            }}

            options={{
              responsive: true,
              legend: {
                display:false,
              },
              title: {
                display: true,
                text: 'Recovered'
            },
              scales:{
                xAxes: [{
                    display: false //this will remove all the x-axis grid lines
                }]
              }
            }}
            
          />
          }
          {val ?
              <Line
                data={{
                  labels: Date,
                  datasets: [
                    {
                      label:"Deaths",
                      data: death,
                      fill: true,
                      backgroundColor: "#F6F6F7",
                      borderWidth: 2,
                      borderColor: "#6C757D"
                    }
                  ]
                }}

                options={{
                  responsive: true,
                  legend: {
                    display:false,
                  },
                  title: {
                    display: true,
                    text: 'Deaths'
                },
                  scales:{
                    xAxes: [{
                        display: false //this will remove all the x-axis grid lines
                    }]
                  }
                }}
                
              />
              :
              <Line
            data={{
              labels: Date,
              datasets: [
                {
                  label:"Deaths",
                  data: dailydeath,
                  fill: true,
                  backgroundColor: "#F6F6F7",
                  borderWidth: 2,
                  borderColor: "#6C757D"
                }
              ]
            }}

            options={{
              responsive: true,
              legend: {
                display:false,
              },
              title: {
                display: true,
                text: 'Deaths'
            },
              scales:{
                xAxes: [{
                    display: false //this will remove all the x-axis grid lines
                }]
              }
            }}
            
          />
          }
        </div>
    );
}
export default ChartState;