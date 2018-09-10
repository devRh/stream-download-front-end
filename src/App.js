import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import CustomPaginationTable from './components/table';


class App extends Component {
  render() {
    return (
        <CustomPaginationTable/> 
    );
  }
}
 
export default App;
