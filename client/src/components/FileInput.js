import React from 'react';
import Download from "./Download";
import './Components.css';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        // this.fileInput = React.createRef();
        this.state = {
            data: [],
        }
    }
    delete = (event) => {
        const index = event.target.dataset.index;
        this.setState(state => {
            const data = [...state.data]
            data.splice(index, 1);
            return{
                data: data,
            }
        })
    }
    // a controlled form handles all form changes via state, which is a very React way of doing things.
    checkBox = (event) => {
        const index = event.target.dataset.index;
        this.setState(state => {
            const data = [...state.data];
            const object = state.data[index];
            object.isChecked = !object.isChecked;
            data.splice(index, 1, object);
            return {
                data
            }
        })

        console.log(this.state.data);
        // this.setState({
        //     data
        // })
    }

    // uploadFile = (event) => {
    //     let file = event.target.files[0];
    //     console.log(file);
    //
    //     let data = new FormData();
    //     if (file) {
    //         // data.append sends key value pair.
    //         data.append('file', file);
    //         console.log(data);
    //         // axios.post('/files', data)...
    //     }
    // }

    showFile = async (e) => {
        e.preventDefault();
        //get file name.
        const fileName = e.target.files[0].name;
        // check file type.
        const type = fileName.split(".")[1];
        // read the file contents as plain text.
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            // console.log(text);
            //todo: add isChecked
            if (type === "json") {
                // JSON.parse() take a json string and turn it into a json object.
                let obj = JSON.parse(text);
                this.setState({
                    data: obj.Result,
                })
                // console.log(obj); // return a object { ... }
                // console.log(obj.Result); //return an array [{...}, {....}]
            }
            else if (type === "csv") {
                const lines = text.split("\n");
                // console.log(lines);
                let csvData = [];

                for (let i = 0; i<lines.length; i++){
                    let arr = lines[i].split(",");
                    csvData.push({
                        title: arr[0],
                        url: arr[1],
                        description: arr[2],
                        isChecked: false,
                    });
                }
                this.setState({
                    data: csvData,
                })
            }
            else{
                const parser = new DOMParser();
                let doc = parser.parseFromString(text, "text/xml");
                const results = doc.getElementsByTagName("result");

                let xmlData = [];
                for (let i = 0; i<results.length; i++){
                    xmlData.push({
                        title: doc.getElementsByTagName("title")[i].innerHTML,
                        url: doc.getElementsByTagName("url")[i].innerHTML,
                        description: doc.getElementsByTagName("description")[i].innerHTML,
                        isChecked: false,
                    });
                }
                this.setState({
                    data: xmlData,
                })
            }
        };
        reader.readAsText(e.target.files[0])
    }

    render() {
        return (
            <div className="level1">
                <h2>File Upload</h2>
                <h5 style={{textAlign: 'center'}}>* Support files in .xml, .json, .csv formats.</h5>
                <input className="btn btn-outline-light search" type="file" accept=".xml,.json,.csv" onChange={this.showFile}/>
                {/*passing data as a property to child class*/}
                <Download data={this.state.data}/>

                <div className="container">
                    {this.state.data.map((data, i) => {
                        return (
                            <div key={i} className="row">
                                <div className="col-sm-2"></div>
                                <div key={i} className="col-sm-8">
                                    <div className="box">
                                        <input data-index={i} className="checkbox" type="checkbox" name="check" onChange={this.checkBox}/>
                                        {/*<button className="btn btn-outline-primary" data-index={i} onClick={this.delete}> Delete </button>*/}
                                        <h3>{data.title}</h3>
                                        <h4><a href={data.url}>{data.url}</a></h4>
                                        <h5>{data.description}</h5>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
            </div>

        )
    }
}

export default FileInput;