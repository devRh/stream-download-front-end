import React, {Component} from "react";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;



class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    
    render() {
        return (
            <ExcelFile element={<button className="btn btn-success" ><i class="fa fa-download"></i> Download as excel</button>}>
                <ExcelSheet dataSet={this.props.data} name="Organization"/>
            </ExcelFile>
        );
    }
}
export default Download;
