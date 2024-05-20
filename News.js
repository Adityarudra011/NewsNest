import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
      };

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
      };

  
    constructor(props){
        super(props);
        console.log("Hello im constructor from news section!!")
        this.state = {
            articles: [],
            loading: false,
            page:1, // ye add karna zururi hai because iske bina page ki intial stage nhi define hogi and move nhi kare ga pages to next one 
            totalResults:0
        }
        document.title = `${this.props.category} - NewsNest `
    }

    async updateNews(){
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=Yourkey&page=${this.state.page}&pageSize=${this.props.pageSize}`; // yaha per end main page = 1 is also imp because wohi page:1 wali command ko follow karne ke liye
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults, 
            loading: false
        })
        this.props.setProgress(100);

    }

    async componentDidMount(){
        this.updateNews(this.state.page);
    }

    // handlePrevClick = async() => {
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     this.setState({page: this.state.page + 1})
    //     this.updateNews();
    // }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=Yourkey&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; // yaha per end main page = 1 is also imp because wohi page:1 wali command ko follow karne ke liye
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults
        });
    };

  render() {
    return (
        <>
        <h1 className="text-center" style={{marginTop: '70px'}}>NewsNest - Top {this.props.category} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
            {this.state.articles.map((element)=>{
                return<div className="col-md-4 my-3" key={element.url}>
                 <NewsItem title ={element.title?element.title:"No Title"} discription = {element.description?element.description.slice(0, 80):"No description"} imageUrl = {element.urlToImage} 
                 newsUrl= {element.url} author={element.author} Date={element.publishedAt} source={element.source.name}/>
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