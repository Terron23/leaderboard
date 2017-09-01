import React, { Component } from 'react';
import './App.css';
//import axios to make server request
import axios from 'axios';
//import table from react-bootstrap
import Table from 'react-bootstrap/lib/Table'
//allows for images to placed in my table
import Image from 'react-bootstrap/lib/Image'
import 'font-awesome/css/font-awesome.css'

class App extends Component {
  state = {
    best100days: [],
    bestAllTime: [],
    //current state allows us to flick back and forth between recent and all time
    flip: true
  }
  //Does ajax calls when component loads
  //
  getData(url, stateName) {
    axios.get(url)
    .then(({data}) => {
      this.setState({[stateName]: data});
      console.log(this.state.best100days);
    });
  }
  
  //function to change values
  
  tableChange(value) {
    if(this.state.flip !== value) {
      this.setState({flip :value})
    }
  }
 
 //Makes Ajax calls fires off after page loads
 componentDidMount(){
   //Url is the api key and 2nd argument represents value in state objects
   this.getData('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'best100days')
   this.getData('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'bestAllTime')
   
 }
 
  
  render() {
    //this constructor saves me time in typing no lnger hve to type bestAlltime.state etc...
   const {bestAllTime, best100days, flip} = this.state;
    return (
      <div className="App container">
       <Table className="white">
       <table className="table">
       <tr>

       <th></th>
       <th>#</th>
        <th>Name</th>
       <th onClick={(event) => this.tableChange(false)}>30 Day Leader {flip === false && (<i className="fa fa-caret-down"></i>)}</th>
       <th onClick={(event) => this.tableChange(true)}>All time Leader {flip && (<i className="fa fa-caret-down"></i>)}</th>
       <th>Last Update</th>
       </tr>
       <tbody>
       
       {flip && (best100days.map((t, i)=>
         <tr key={t.userName}>
        
           <td>
        <Image src={t.img} className="small" />
         </td>
          <td>
       {/*Used to keep track of what is beung outputted*/}
       { i + 1}
         </td>
           <td>
      {t.username}
         </td>
           <td>
     {t.recent}
     </td>
     <td>
     {t.alltime}
     </td>
      <td>
     {t.lastUpdate}
     </td>
        
          </tr>
          )
          )
       }
      
      
       {flip === false && (bestAllTime.map((t, i)=>
         <tr key={t.userName}>
        
           <td>
        <Image src={t.img} className="small" />
         </td>
          <td>
       {/*Used to keep track of what is beung outputted*/}
       { i + 1}
         </td>
           <td>
      {t.username}
         </td>
           <td>
     {t.recent}
     </td>
     <td>
     {t.alltime}
     </td>
      <td>
     {t.lastUpdate}
     </td>
        
          </tr>
        )  )
       }
      
       </tbody>
       </table>
       </Table>
       
       
       
      </div>
    );
  }
}

export default App;
