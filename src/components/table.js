import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { fetchAllTaxiTrip } from '../actions/dataTableAction';
import './table.css';

class CustomPaginationTable extends Component {


  constructor(props) {
    super(props);

    this.state = {
      downloadExcelButtonActive: true,
      page: 1,
      sizePerPage: 5,
    };
    this.fetchTaxiTrip = this.fetchTaxiTrip.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
  }

  componentWillMount() {
    this.fetchTaxiTrip(this.state.page, this.state.sizePerPage);
  }

  fetchTaxiTrip(page, sizePerPage) {
    this.props.fetchAllTaxiTrip(page, sizePerPage);
  }

  handlePageChange(page, sizePerPage) {
    if (page !== this.state.page) {
      this.fetchTaxiTrip(page, sizePerPage);
      this.setState({ page });
    }
  }

  handleSizePerPageChange(sizePerPage) {
    this.setState({ page: 1, sizePerPage })
    this.fetchTaxiTrip(1, sizePerPage);

  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: 'blue' }}>
        Showing {start} to {to} of {total}&nbsp;&nbsp; Results<br />
      </p>
    );
  }

  render() {
    console.log("state------>", this.state)
    console.log("props------->", this.props);

    const options = {
      noDataText: (this.props.error ? ('There is no data to display : ' + this.props.error) : <div className="spinner" />),
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }],
      pageStartIndex: 1,
      paginationSize: 3,
      prePage: 'Prev',
      nextPage: 'Next',
      firstPage: '1...',
      lastPage: !this.props.count ? "..." : ("..." + Math.ceil(this.props.count / this.state.sizePerPage).toString()),
      prePageTitle: 'Go to previous',
      nextPageTitle: 'Go to next',
      firstPageTitle: 'Go to first',
      lastPageTitle: 'Go to Last',
      paginationShowsTotal: this.renderShowsTotal,
      paginationPosition: 'top'
    };
    return (
      <div style={{ 'margin': '3vw' }}>
        <h1> Yellow Taxi Trip Data </h1>

        <a className="btn btn-success" href='http://localhost:5555/taxiTrips'>
          <i className="fa fa-download"></i> Download as excel
        </a>

        <BootstrapTable data={this.props.data}
          version='4'
          keyField='_id'
          options={options}
          fetchInfo={{ dataTotalSize: this.props.count }}
          remote
          pagination
          striped
        >
          <TableHeaderColumn dataField='VendorID'>Vendor-id</TableHeaderColumn>
          <TableHeaderColumn dataField='PULocationID'>Pick-up location</TableHeaderColumn>
          <TableHeaderColumn dataField='DOLocationID'>Drop-off location</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }

}


const mapStateToProps = state => ({
  ...state.dataTable
})

export default connect(mapStateToProps, { fetchAllTaxiTrip })(CustomPaginationTable);
