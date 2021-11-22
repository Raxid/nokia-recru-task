import React, {Component} from 'react';
import CountriesList from './components/CountriesList';

import './styles/default.css';

class App extends Component{
  render(){
    return (
      <div className="App">
          <div className="header">NOKIA recruitment task</div>
          <CountriesList/>
          <div className="footer">2021. Radosław Stenke &copy;</div>
      </div>
    )
  }
}
 export default App;
