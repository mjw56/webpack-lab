import React from 'react';
import Utils from './utils/web-api';
import BookList from './components/book-list.react';

var App = module.exports = React.createClass({

  getInitialState() {
    return { lists: [] };
  },

  componentDidMount() {
    let utils = new Utils();
    utils.initData().then((response) => {
      this.setState({ lists: response });
    });
  },

  render() {

    const lists = this.state.lists.map((list, index) => {
      return <BookList key={index} books={list.books} date={list.date} title={list.title} />
    });

    return (
      <div>
        <h1>webpack lab</h1>
        {!this.state.lists.length ? <h2>Loading ...</h2> : lists }
      </div>
    );
  }

});
