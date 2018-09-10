import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { fetchAllTaxiTrip } from '../actions/dataTableAction';
import './table.css';

 class CustomPaginationTable extends Component {


  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      sizePerPage: 5,
    };
    this.fetchTaxiTrip = this.fetchTaxiTrip.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
  }

  componentWillMount() {
    this.fetchTaxiTrip();
  }

  fetchTaxiTrip(page = this.state.page, sizePerPage = this.state.sizePerPage) {
    this.props.fetchAllTaxiTrip(page, sizePerPage);
  }

  handlePageChange(page, sizePerPage) {
    this.setState({page});
    this.fetchTaxiTrip(page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    this.setState({sizePerPage})
    this.fetchTaxiTrip(1, sizePerPage);
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={ { color: 'blue' } }>
      Showing { start } to { to } of { total }&nbsp;&nbsp; Results<br/>
      </p>
    );
  }

  render() {
    console.log("state------>",this.state)
    console.log("props------->",this.props);

    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,  
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      } ],  
      pageStartIndex: 1,
      paginationSize: 3, 
      prePage: 'Prev', 
      nextPage: 'Next', 
      firstPage: 'First', 
      lastPage: 'Last', 
      prePageTitle: 'Go to previous', 
      nextPageTitle: 'Go to next', 
      firstPageTitle: 'Go to first', 
      lastPageTitle: 'Go to Last', 
      paginationShowsTotal: this.renderShowsTotal,  
      paginationPosition: 'top' 
    };

    return !this.props.count ? (
      <div className="spinner"/>
      ) :
    <BootstrapTable data={ this.props.data }
          keyField='_id' 
          pagination
          fetchInfo={{dataTotalSize: this.props.count}}
          remote
          options={ options }
        >
            <TableHeaderColumn dataField='VendorID'>Vendor-id</TableHeaderColumn>
            <TableHeaderColumn dataField='PULocationID'>Pick-up location</TableHeaderColumn>
            <TableHeaderColumn dataField='DOLocationID'>Drop-off location</TableHeaderColumn>
        </BootstrapTable>
}

}  


const mapStateToProps = state => ({
  ...state.dataTable
})

export default connect(mapStateToProps, {fetchAllTaxiTrip})(CustomPaginationTable);
