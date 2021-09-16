import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: "8",
        category: "general"
    }

    static propeTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor() {
        super()

        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63b7458784284a62afde12425ee295a5&pageSize=${this.props.pageSize}`

        this.setState({ loading: true })

        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63b7458784284a62afde12425ee295a5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`

        this.setState({ loading: true })

        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63b7458784284a62afde12425ee295a5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`

            this.setState({ loading: true })

            let data = await fetch(url)
            let parseData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }


    }

    render() {
        return (
            <div className="container my-3">

                <h1 style={{ margin: "40px 0" }} className="text-center">NewsAgent - Tops Headlines</h1>

                {this.state.loading && <Spinner />}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
