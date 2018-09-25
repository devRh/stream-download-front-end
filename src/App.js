import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import CustomPaginationTable from './components/table';



class App extends Component {
  render() {
    return (
      <div>
        <CustomPaginationTable/> 
      </div>
    );
  }
}

export default App;
