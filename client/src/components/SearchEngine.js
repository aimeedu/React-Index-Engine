import React, {Component} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import './Components.css';
import Download from "./Download";
import axios from "axios";

class SearchEngine extends Component {

    constructor(props){
        super(props);
        this.state = {
            caseInsensitive: false,
            partialMatch: false,
            term: null,
            data:[],

        }
    }
    /** Here, we are using $text and $search MongoDB operators for find all documents in collection collectionName which contains at least one word from the specified find query.
     partial search */
    search = async (e) => {
        e.preventDefault();
        const term = e.target.elements.userInput.value;
        const username = e.target.elements.userInput.value;
        this.setState({
            term
        })
        // console.log(term);
        //     `http://localhost:5000/admin/${term}`
        const api_call = await fetch(`/admin/${term}`);
        const data = await api_call.json();
        const searchFreq = data.length;
        console.log(searchFreq);

        /** send the term to back end 'http://localhost:5000/custom'*/
        axios.post('/custom', {term:term, searchFreq:searchFreq})
            .then((res)=>{
                console.log(res.data);
                // console.log('Pass term to back end!');
            });
        this.setState({
            data: data
        })
        console.log(this.state.data);

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

    checkCase = () => {
        this.setState({
            caseInsensitive: !this.state.caseInsensitive,
        })
        console.log(this.state.caseInsensitive);
    }

    checkMatch = () => {
        this.setState({
            partialMatch: !this.state.partialMatch,
        })
        console.log(this.state.partialMatch);
    }

    render() {
        return (
            <div>
                <h2>My Custom Search Engine</h2>

                <div className="checkbox">
                    <label><input type="checkbox" name="case" onChange={this.checkCase}/> Case Insensitive </label>
                    <label><input type="checkbox" name="match" onChange={this.checkMatch}/> Allow Partial Match </label>
                </div>


                <Form className="search" onSubmit={this.search}>
                    <FormControl className="mr-sm-1 searchBar" type="text" placeholder="Type a word to Search." name="userInput"/>
                    <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Search</Button>
                </Form>

                <Download data={this.state.data} />
<br/>
                <h3> Search Term: {this.state.term}</h3>

                {/*\ when click search button*/}
                {/*    pass the term to backend, insert into search table/ done*/}
                {/*    query the page table. find all the entries with certain words.*/}
                {/*    display the result*/}
                {/*    download the result*/}

                {this.state.data.length === 0? <h3>"No results in DB for {this.state.term}!"</h3>:
                <div className="container">

                    {this.state.data.map((data, i) => {
                        return (
                            <div key={i} className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="box">
                                        <input data-index={i} id="ch" className="checkbox" type="checkbox" name="check" onChange={this.checkBox}/>
                                        {/*<button className="btn btn-outline-primary" data-index={i} onClick={this.delete}> Delete </button>*/}
                                        <h4>{data.wordname}</h4>
                                        <h4>Title: {data.title}</h4>
                                        <h4>Description: {data.description}</h4>
                                        <h5><a href={data.url}>{data.url}</a></h5>
                                        <h5>id: {data._id}</h5>
                                        <h5>Created At: {data.createdAt}</h5>
                                        <h5>Time to Search: </h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                }
            </div>
        )
    }
}

export default SearchEngine;