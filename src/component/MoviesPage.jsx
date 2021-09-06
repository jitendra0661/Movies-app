import React, { Component } from 'react'
// import { getMovies } from '../temp/MovieService';
import List from "./List.jsx";
import Pagination from "./Pagination";
// import { Link } from "react-router-dom";

export default class MoviesPage extends Component {
    state = {
        // movies: [],
        currSearchText: "",
        // filterMovies: getMovies()
        currentPage: 1,
        limit: 4,             // limit is no of movies that we can show on a page
        genres: [{ id: 1, name: "All Genres"}],
        cGenre: "All Genres"
    }
  
    setCurrentText = (e) => {
        let task = e.target.value;
        // let filteredArr = this.state.movies.filter((movieObj) => {             // can't filter here becoz we should have single source of truth i.e., same state i.e., should not be played by movies and filteredMovies, it will become very complex to maitain 2 states for same type of work
        //     let title = movieObj.title.trim().toLowerCase();
        //     return title.includes(task.trim());
        // })
        // if(task == ""){
        //     filteredArr = this.state.movies;
        // }
        this.setState({
            currSearchText: task
            // filterMovies: filteredArr
        })
    }
    sortByRating = (e) => {
        let className = e.target.className.trim();
        let sortedMovies;
        let { movies } = this.props;
        if(className == "fas fa-sort-up"){
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
            });
        } else {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            });
        }
        
        this.props.setMovies(sortedMovies);
    }
    sortByStock = (e) => {
        let className = e.target.className.trim();
        let sortedMovies;
        let { movies } = this.props;
        if(className == "fas fa-sort-up"){
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.numberInStock - movieObjB.numberInStock;
            });
        } else {
            sortedMovies = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            });
        }
        
        this.props.setMovies(sortedMovies);
    }
    changeLimit = (e) => {
        let currLimit = e.target.value;
        if(currLimit < 1) return;
        this.setState({
            limit: currLimit
        })
    }
    changeCurrentPage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }
    groupByGenre = (name) => {
        console.log(3);
        this.setState({
            cGenre: name,
            currSearchText: ""
        })
    }
    
    async componentDidMount() {
       
        let resp = await fetch("https://react-backend101.herokuapp.com/genres");
        let jsonGenres = await resp.json();
        this.setState({
            genres: [...this.state.genres, ...jsonGenres.genres]
        });
    }

    render() {
        let { currSearchText, limit, currentPage, genres, cGenre } = this.state;
        let { movies, deleteEntry } = this.props;

        let filteredArr = movies;

        // filter on basis on genres
        if(cGenre != "All Genres") {
            filteredArr = filteredArr.filter((movieObj) => {
                return movieObj.genre.name == cGenre;
            })
        }

        if(currSearchText != ""){                                        //we won't change original movies and also we maintain only one state for movies i.e., single source of truth
            filteredArr = filteredArr.filter((movieObj) => {      // we are filtering here becoz whenever 
                let title = movieObj.title.trim().toLowerCase();         //we type something on which basis we want to filter ,   
                return title.includes(currSearchText.toLowerCase());     //state of currSearchText will chnage and this component will 
            })                                                          //re-render hence we will here filter movies and show those filtered movies on UI 
        }   
       
        
        // for getting number of pages defined as per limit that we want to show on UI i.e no of movies/limit
        let numberOfPage = Math.ceil(filteredArr.length / limit);
        
        // implement pagination formula ie. how many movie should show on the current page as per limit and page number
        let si = (currentPage - 1) * limit;
        let eidx = si + limit;
        filteredArr = filteredArr.slice(si, eidx);

        return (

            <div className="row">
                <div className="col-3">
                    <List
                        genres = {genres}
                        groupByGenre = {this.groupByGenre}
                        cGenre = {cGenre}
                    ></List>
                </div>
                {console.log(2)}
                <div className="col-9">
                    <input type="search" value={currSearchText} onChange={this.setCurrentText}></input>
                    <input type="number" className="col-1" value={limit} placeholder="no of elements/page" onChange={this.changeLimit}></input>
                    {console.log(5)}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                {/* <th scope="col">Stock</th> */}
                                <th scope="col">
                                    <i className="fas fa-sort-up" onClick={this.sortByStock}></i>
                                    Stock
                                    <i className="fas fa-sort-down" onClick={this.sortByStock}></i>
                                    </th>
                                <th scope="col">
                                    <i className="fas fa-sort-up" onClick={this.sortByRating}></i>
                                    Ratings
                                    <i className="fas fa-sort-down" onClick={this.sortByRating}></i>
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                        {filteredArr.map((moviesObj) => {
                            return (
                                <tr scope="row" key={moviesObj._id}>
                                    <td>{moviesObj.title}</td>
                                    <td>{moviesObj.genre.name}</td>
                                    <td>{moviesObj.numberInStock}</td>
                                    <td>{moviesObj.dailyRentalRate}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => {
                                        deleteEntry(moviesObj._id);
                                    }}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination
                    numberOfPage = {numberOfPage}
                    currentPage = {currentPage}
                    changeCurrentPage = {this.changeCurrentPage}
                ></Pagination>                                   
                </div>
            </div>
        )
    }
}
