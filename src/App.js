// import logo from './logo.svg';
import './App.css';
import MoviesPage from './component/MoviesPage';
import New from './component/New';
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from './component/Login';
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    movies: []
  }

  setMovies = (arr) => {
    this.setState({
      movies : arr
    })
  }


  deleteEntry = (id) => {
    let filteredMovies = this.state.movies.filter((moviesObj) => {
        return moviesObj._id != id;
    })
    this.setState({
        movies: filteredMovies
    })
  }
  addMovie = (obj) => {
      
    let { title, genre, stock, rate } = obj;
    let genreObj = [{ _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" }
    ];
    for (let i = 0; i < genreObj.length; i++) {
      if (genreObj[i].name == genre) {
        genre = genreObj[i]
      }
    }
    let movieObj = {
      _id: Date.now(),
      title,
      genre,
      dailyRentalRate: rate,
      numberInStock: stock
    }

    let copyofMovies = [...this.state.movies, movieObj];
    this.setState({
      movies: copyofMovies
    })
  }
  

  async componentDidMount() {
    let resp = await fetch("https://react-backend101.herokuapp.com/movies");
    console.log(resp);   // we get response here 
    let jsonMovies = await resp.json();
    console.log(jsonMovies);
    this.setState({
        movies: jsonMovies.movies
    });
  }

  render() {
    return (
      <>
        <Navbar></Navbar>
        <Switch>
          <Route path="/new" render={(props) => {          // this is how we pass
              return(                                  //props to a component in routing       
                <New 
                  {...props} addMovie={this.addMovie}
                ></New>
              )
            }
          }>
          </Route>

          <Route path="/" render={(props) => {
            return (
              <MoviesPage
                {...props} deleteEntry={this.deleteEntry}
                setMovies = {this.setMovies}
                movies={this.state.movies}
              ></MoviesPage>
            )
          }}></Route>
        </Switch> 
      </>
    )
  }
}

