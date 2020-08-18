import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
function Chart(){
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
            const res = await axios.get(`https://api.covid19india.org/data.json`);
            let dates=[];
            let confirms=[];
            let rec=[];
            let dea=[];
            let dailrec=[];
            let dailcon=[];
            let daildea=[];
            for(const dataobj of res.data.cases_time_series){
              dates.push(dataobj.date);
              confirms.push(parseInt(dataobj.totalconfirmed));
              rec.push(parseInt(dataobj.totalrecovered));
              dea.push(parseInt(dataobj.totaldeceased));
              dailcon.push(parseInt(dataobj.dailyconfirmed));
              dailrec.push(parseInt(dataobj.dailyrecovered));
              daildea.push(parseInt(dataobj.dailydeceased));
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
export default Chart;