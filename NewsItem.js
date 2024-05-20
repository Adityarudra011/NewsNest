import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    const divStyle = {
      boxShadow: '0.5rem 0.5rem 1rem 0.1rem  rgba(232, 236, 241, 1)',
    }
    let {title, description, imageUrl, newsUrl, author, Date, source} = this.props;

    return (
      <div>
        <div className="card" style={divStyle}>
          <img src={!imageUrl?"https://media.cnn.com/api/v1/images/stellar/prod/2024-04-26t100156z-1728538298-rc24e7apzs6j-rtrmadp-3-ukraine-crisis-russia-shoigu.JPG?c=16x9&q=w_800,c_fill":imageUrl } className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}<span className="badge rounded-pill text-bg-primary">{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {Date}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
