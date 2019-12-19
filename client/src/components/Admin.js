import React, {Component} from 'react';
import './Admin.css';
import {Button, Form, FormControl} from "react-bootstrap";
import axios from 'axios';


class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            SearchData:[],
            IndexingData:[],
            isIndexed: false,
            count:0
        }
    }

    // make AJAX calls, query the data from the search table. http://localhost:3000 or 5000/admin, both working
    // as soon as you click on fetch data button, the table will show.
    fetchSearchHistories = async () => {
        /** when we use postgresql this code works
        const res = await fetch('/admin');
        const results = await res.json();
        this.setState({
            results
        }) */
        // below is for mongodb get search result, 'http://localhost:5000/custom'.
        axios.get('/custom')
            .then(res => {
                this.setState({
                    SearchData: res.data
                })
                // console.log(res.data);
            })
    }

    fetchIndexingHistories = async () => {
        // below is for mongodb get search result.,'http://localhost:5000/admin'
        axios.get('/admin')
            .then(res => {
                this.setState({
                    IndexingData: res.data
                })
                // console.log(res.data);
            })
    }

    indexing = (e) => {
        e.preventDefault();
        // get the user input url
        const inputURL = e.target.elements.userInput.value;
        let inputDepth = e.target.elements.userDepth.value;
        if (!inputDepth) {
            inputDepth = 2;
        }
        console.log(inputURL);
        console.log(inputDepth);
        /** pass this url to the post function.*/
        axios.post('/admin', {inputURL, inputDepth})
            // .then((res)=>{
            //     console.log(res.data);
            //     console.log('Indexing Successfully! Data inserted in DB!');
            // })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        this.setState({
            isIndexed: true,
            count: this.state.count+1
        })
    }

    render() {

        const Searchrows = this.state.SearchData.map((SearchData, i) => {
            return(
                <tr key={i}>
                    <td>{SearchData._id}</td>
                    <td>{SearchData.term}</td>
                    <td>{SearchData.count}</td>
                    <td>{SearchData.createdAt}</td>
                    <td>{SearchData.timetosearch}</td>
                </tr>
            )
        })

        const Indexingrows = this.state.IndexingData.map((IndexingData, i) => {
            return(
                <tr key={i}>
                    <td>{IndexingData._id}</td>
                    {/*<td>{IndexingData.url}</td>*/}
                    <td>{IndexingData.title}</td>
                    <td>{IndexingData.description}</td>
                    <td>{IndexingData.createdAt}</td>
                    <td>{IndexingData.timeToIndex}</td>
                </tr>
            )
        })
        return (
            <div>
                <h2>Indexing Launcher</h2>
                <h3>{this.state.isIndexed?`Data inserted into DB! Indexing Count: ${this.state.count}`:null}</h3>
                {/*<Form className="search" onSubmit={this.indexing}>*/}
                {/*    <FormControl className="mr-sm-1 searchBar" type="url" placeholder="Type a URL to be indexed." name="userInput"/>*/}
                {/*    <FormControl className="mr-sm-1" type="number" placeholder="Depth." name="userDepth"/>*/}
                {/*    <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Index</Button>*/}
                {/*</Form>*/}

                <Form className="input-group mb-4 search" onSubmit={this.indexing}>
                    <FormControl type="text" className="form-control" type="url" placeholder="Type a URL to be indexed." name="userInput"/>
                    <FormControl type="text" className="form-control col-3" type="number" placeholder="Input Depth." name="userDepth"/>
                        <div className="input-group-append">
                            <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Index</Button>
                        </div>
                </Form>

                <br/><br/>

                <h3>User Search Histories <button type="button" className="btn btn-outline-light" onClick={this.fetchSearchHistories}>Fetch Data</button></h3>
                <table className="">
                    <thead>
                        <tr>
                            <th>Search ID</th>
                            <th>Terms</th>
                            <th>Number of search results</th>
                            <th>Created At</th>
                            <th>Searching Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Searchrows}
                    </tbody>
                </table>
                <br/>

                <h3>Indexing Histories <button type="button" className="btn btn-outline-light" onClick={this.fetchIndexingHistories}>Fetch Data</button></h3>
                <table className="">
                    <thead>
                    <tr>
                        {/*<th>Indexing ID</th>*/}
                        <th>URL</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Indexing Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Indexingrows}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Admin;