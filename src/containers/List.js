import React, { Fragment } from "react";

import Card from "../components/Card/Card";

const API = process.env.API;

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchTerm: "",
      error: "",
    };
  }

  async componentDidMount() {
    //const res = await fetch('../../assets/data.json')
    const res = await fetch(`${API}&s=batman`);
    const resJSON = await res.json();
    console.log(resJSON);
    this.setState({ data: resJSON.Search });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.searchTerm) {
      return this.setState({ error: "Please write a valid name" });
    }

    const res = await fetch(`${API}&s=${this.state.searchTerm}`)
    const data = await res.json();

    if(!data.Search){
        return this.setState({error: 'There are no results'});
    }

    this.setState({data: data.Search, error: '', searchTerm: ''})
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form  id="my-form" onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}
                autoFocus
              />
            </form>
            <br/>
            <p className="text-white">{this.state.error ? this.state.error : ""}</p>
            <div className="col text-center">
              <button className="btn btn-secondary" form="my-form" type="submit">Search</button>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.data.map((movie, i) => {
            return <Card movie={movie} key={ i }/>;
          })}
        </div>
      </Fragment>
    );
  }
}

export default List;
