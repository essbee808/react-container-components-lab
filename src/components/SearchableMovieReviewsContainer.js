import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'S0G6qanUrPEZXA9xfftC0yMmnrX8NKrI';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
export default class SearchableMovieReviewsContainer extends Component {
    constructor() {
        super();

        this.state = {
            reviews: [],
            searchTerm: "",
        }
    }

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    handleSubmit = (e) => {
        alert('Click!')
        e.preventDefault();
        debugger
        // const submittedEvent = e.currentTarget[0].value;

        fetch(`${URL}`)
        .then(resp => resp.json())
        .then(reviews => {
            const arr = reviews.results
            const filtered = arr.filter(obj => {return obj.display_title === `${this.state.searchTerm}`})
            console.log("Filtered", filtered)
            debugger
            this.setState({reviews: filtered})
            return this.state.searchTerm
        })
    }

    render() {
        return(
            <form className="searchable-movie-reviews" onSubmit={this.handleSubmit}>
                <label>
                    Search movie reviews:
                    <input type="text" value={this.state.searchTerm} onChange={this.handleChange}/>
                    <button type="submit">Submit</button>
                </label>
                <MovieReviews reviews={this.state.reviews}/>
            </form>
        )
    }
}