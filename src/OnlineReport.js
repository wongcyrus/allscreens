import React from "react";
import ReactExport from "react-data-export";
import { Button} from 'semantic-ui-react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class OnlineReport extends React.Component {
    render() {
                const getFormattedTime = () => {
            let today = new Date();
            let y = today.getFullYear();
            let m = today.getMonth() + 1;
            let d = today.getDate();
            let h = today.getHours();
            let mi = today.getMinutes();
            let s = today.getSeconds();
            return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
        };
        return (
            <ExcelFile 
                filename={"OnlineRecords" + this.props.currentClassroom + "-" + getFormattedTime()} 
                element={<Button>Download Current Online Record.</Button>}
            >
                <ExcelSheet data={this.props.data} name="Online">
                    <ExcelColumn label="Email" value="email"/>
                    <ExcelColumn label="Online" value="isOnline"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}