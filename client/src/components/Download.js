import React, {Component} from 'react';
import './Components.css';

class Download extends Component {

    // constructor(props){
    //     super(props);
    // }

    selectAll = () => {
        const results = document.getElementsByClassName("checkbox");
        for (let i = 0; i < results.length; i++) {
            results[i].checked = true;
        }
        for (let i = 0; i< this.props.data.length; i++) {
            this.props.data[i].isChecked = true;
        }
    }

    deselectAll = () => {
        const results = document.getElementsByClassName("checkbox");
        for (let i = 0; i < results.length; i++) {
            results[i].checked = false;
        }
        for (let i = 0; i< this.props.data.length; i++) {
            this.props.data[i].isChecked = false;
        }
    }

    trimData = (data) => {
        // copy the object array.
        const arr = [...this.props.data];
        let newArr = [];
        for (let i = 0; i< arr.length; i++) {
            if(arr[i].isChecked) {
                newArr.push({
                    title:arr[i].title.trim(),
                    url:arr[i].url.trim(),
                    description:arr[i].description.trim(),
                });
            }}
        return newArr;
    }

    tocsv = (data) => {
        const csvRows = [];
        //get the headers
        if (data.length !== 0){
            const headers = Object.keys(data[0]);
            csvRows.push(headers.join(','));

            for (const row of data) {
                const values = headers.map(header => {
                    const escaped = (''+row[header]).replace(/"/g, '\\"');
                    return `"${escaped}"`;
                })
                csvRows.push(values.join(','));
            }
            return csvRows.join('\n');
        }else{
            return csvRows;
        }
    }

    // toxml = (data) => {
    //     let result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<results>\n";
    //     /* */
    //     for(let i = 0; i<data.length; i++) {
    //         if (data[i].isChecked) {
    //             let title = data[i].title.trim();
    //             let url = data[i].url.trim();
    //             let description = data[i].description.trim();
    //             result = result + "<result>\n<title>" + title + "</title>\n" +
    //                 "<url>" + url + "</url>\n" + "<description>" +
    //                 description + "</description>\n</result>\n";
    //         }
    //     }
    //     result += "</results>";
    //     return result.trim();
    // };

    toxml = (data) => {
        let result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<results>\n";
        for(let i = 0; i<data.length; i++) {

                let title = data[i].title;
                let url = data[i].url;
                let description = data[i].description;
                result = result + "  <result>\n    <title>" + title + "</title>\n" +
                    "    <url>" + url + "</url>\n" + "    <description>" +
                    description + "</description>\n  </result>\n";

        }
        result += "</results>";
        return result;
    }

    download = (data, fileName, type) => {
        const file = new Blob([data], {type: type});
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    downloadFile = (e) => {
        e.preventDefault();
        const input = e.target.elements.input.value;
        const fileType = e.target.elements.options.value;
        const fileName = input + fileType;
        const trim = this.trimData(this.props.data);

        // the data has already been stored in states in parent class, retrieve the data from this.props.data
        if (fileType === ".csv") {
            const data = this.tocsv(trim);
            this.download(data, fileName, "text/csv");
        }
        else if (fileType === ".json") {
            const data = JSON.stringify(trim);
            // const data = this.tojson(this.props.data);
            this.download(data, fileName, "application/json");
        }else{
            const data = this.toxml(trim);
            this.download(data, fileName, "text/xml");
        }
    }

    render() {
        return (
            <div>
                <form className="downloadFile" onSubmit={this.downloadFile}>
                    <div id="selector">
                        <button id="selectall" className="btn btn-light purple-btn mr-sm-1" type="button" onClick={this.selectAll}>Select All</button>
                        <button id="deselectall" className="btn btn-light purple-btn" type="button" onClick={this.deselectAll}>Deselect All</button>
                    </div>
                        <button id="download" className="btn btn-light mr-sm-1" type="submit">Download</button>
                        <input id="fileName" className="form-control mr-sm-1" type="text" placeholder="File Name" name="input" required="required"/>
                        <select name="options" id="fileType" className="custom-select" required="required">
                            <option value=".json">.JSON</option>
                            <option value=".csv">.CSV</option>
                            <option value=".xml">.XML</option>
                        </select>
                </form>
            </div>
        );
    }
}

export default Download;