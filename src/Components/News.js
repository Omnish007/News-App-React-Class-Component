import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propeTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsAgent`
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63b7458784284a62afde12425ee295a5&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })

        let data = await fetch(url)
        this.props.setProgress(30)

        let parseData = await data.json()
        this.props.setProgress(50)

        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63b7458784284a62afde12425ee295a5&page=1&pageSize=${this.props.pageSize}`

        // this.setState({ loading: true })

        // let data = await fetch(url)
        // let parseData = await data.json()
        // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.updateNews()
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page-- })
        this.updateNews()
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page++ })
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63b7458784284a62afde12425ee295a5&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults })
    }

    render() {
        return (
            <>

                <h1 style={{ margin: "40px 0" }} className="text-center">NewsAgent - Tops {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>

            </>
        )
    }
}

export default News
