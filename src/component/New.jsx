import React, { Component } from 'react'

export default class New extends Component {
    state = {
        data: {
            title: "",
            genre: "",
            stock: "",
            rate: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addMovie(this.state.data);
    }
    handleChange = (e) => {
        let id = e.currentTarget.id;
        let value = e.target.value;
        let newObject = { ...this.state.data };
        newObject[id] = value;
        
        this.setState({
            data: newObject
        })
    }


    render() {
        return (
            <div>
                {/*form  */}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">
                        Title:
                        <input type="text" id="title" value={this.title} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="genre">
                        Genre:
                        <select id="genre" value={this.genre} onChange={this.handleChange}>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Thriller">Thriller</option>
                        </select>
                    </label>

                    <label htmlFor="stock">
                        Stock:
                        <input type="number" id="stock" value={this.stock} onChange={this.handleChange} />
                    </label>

                    <label htmlFor="rate">
                        Title:
                        <input type="number" id="rate" value={this.rate} onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}
