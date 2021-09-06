import React, { Component } from 'react'

export default class Pagination extends Component {
    render() {
        let { numberOfPage, currentPage, changeCurrentPage } = this.props;
        let pageNumberArr = [];
        for(let i = 0; i < numberOfPage; i++) {
            pageNumberArr.push(i + 1);
        }
        return (
            <nav aria-label="..." className="col-2" >
                        <ul className="pagination">
                            {
                                pageNumberArr.map((pageNumber) => {
                                    let additional = pageNumber == currentPage ? "page-item active" : "page-item";
                                    return (
                                        <li className={additional} onClick={() => {changeCurrentPage(pageNumber)}}>
                                            <span className="page-link">{pageNumber}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                </nav>
        )
    }
}

