import React, {Component} from 'react';
// import '../App.css';
import './Components.css';
import Download from "./Download";
import {Button, Form, FormControl} from "react-bootstrap";

const API_KEY = "AIzaSyDzFrh_sw6E2iClTjBjWCGLApEW_d9xXZU";

class SearchGoogle extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }

    search = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        if(userInput){
            const req = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=${userInput}`)
            // const data = await req.json();
            const data = await req.json();
            const temp = data.items;

            // temp.forEach(function (object) {
            //     object.isChecked = false;
            // });

            let final = [];
            for (let i = 0; i<temp.length; i++){
                final.push({
                    title: temp[i].title,
                    url:temp[i].link,
                    description:temp[i].snippet,
                    isChecked: false,
                });
            }

            this.setState({
                data: final,
                // checked: Array(data.items.length).fill(false),
            })

            console.log(final);
            // console.log(this.state.data);
            // console.log(this.state.checked);
        }
    }

    delete = (event) => {
        const index = event.target.dataset.index;
        this.setState(state => {
            //make a copy of the data in the state.
            const data = [...state.data]
            data.splice(index, 1);
            return{
                data: data
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

    render() {
        return (
            <div className="level1">

                <h2>Google Custom Search API</h2>
                {/*<h3 id="searchRes">You have {this.state.data.length} search results.</h3>*/}

                {/*<form inline className="search" onSubmit={this.search}>*/}
                {/*    <input className="form-control" type="text" placeholder="Google" name="userInput" />*/}
                {/*    <button className="btn btn-light" type="submit"> Search </button>*/}
                {/*</form>*/}

                <Form className="search" onSubmit={this.search}>
                    <FormControl className="mr-sm-1 searchBar" type="text" placeholder="Google" name="userInput"/>
                    <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Search</Button>
                </Form>
                {/*<form className="search" onSubmit={this.search}>*/}
                {/*    <input className="mr-sm-2 searchBar" type="text" placeholder="Google" name="userInput"/>*/}
                {/*    <Button variant="btn-light purple-btn" type="submit">Search</Button>*/}
                {/*</form>*/}

                {/*passing data as a property to child class*/}
                <Download data={this.state.data} />

                <div className="container">
                    {this.state.data.map((data, i) => {
                        return (
                            <div key={i} className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8">
                                    <div className="box">
                                        <input data-index={i} className="checkbox" type="checkbox" name="check" onChange={this.checkBox}/>
                                        {/*<button className="btn btn-outline-primary" data-index={i} onClick={this.delete}> Delete </button>*/}
                                        <h4>{data.title}</h4>
                                        <h5><a href={data.url}>{data.url}</a></h5>
                                        <h5>{data.description}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        );
    }
}

export default SearchGoogle;