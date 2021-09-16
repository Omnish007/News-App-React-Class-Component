import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imgUrl, newsUrl } = this.props

        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imgUrl ? "https://images.indianexpress.com/2021/09/horo2121.jpg" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
