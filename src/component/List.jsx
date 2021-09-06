import React, { Component } from 'react'

export default class List extends Component {
    render() {
        console.log(1);
        let { genres, groupByGenre, cGenre } = this.props;
        return (
            <ul class="list-group">
                        {     
                            genres.map((cgObj) => {
                                let active = cGenre == cgObj.name ? "list-group-item active" : "list-group-item"
                                return (<li class={active} key={cgObj.id} onClick={() => { groupByGenre(cgObj.name)}}>{cgObj.name}</li>)
                            })
                        }
            </ul>
        )
    }
}
