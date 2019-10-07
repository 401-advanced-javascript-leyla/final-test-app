import React from 'react';
import { connect } from 'react-redux';

// import uuid from 'uuid/v4';
import superagent from 'superagent';
import Score from './components/score';

const API_URL = 'http://localhost:8080';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.state.name = '';
    this.state.score = '';
  }


  componentDidMount = () => {
    superagent.get(`${API_URL}/scores`)
      .then(results => {
        console.log(results.body);
        this.props.loadStore(results.body);
        console.log(this.props.scores);
      })
      .catch(console.log('cannot get data from back-end'));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    superagent.post(`${API_URL}/scores`)
    .send({name: this.state.name, score: this.state.score})
    .set('Accept', 'application/json')
    // .then( () => {
    //   superagent.get(`${API_URL}/scores`)
    // })
    .then(results => {
      this.props.loadStore(results.body);
    })
  }

  handleNameChange = (e) => {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleScoreChange = (e) => {
    e.preventDefault();
    this.setState({score: e.target.value});
  }

  render() {
    return (
      <>
        <h1>High Scores</h1>
        <ul>
          {
            this.props.scores.map(score => 
            <Score key={score._id} score={score} />)
          }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <p>Name</p>
          <input onChange={this.handleNameChange} placeholder='Enter Name' type='text' value={this.state.name} />
          <p>Score</p>
          <input onChange={this.handleScoreChange} placeholder='Enter score' type='text' value={this.state.score} />
          <br />
          <button type='submit'>Add Score</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  scores: state.scores,
});

const mapDispatchToProps = (dispatch) => ({
  loadStore : (scores) => {
    dispatch({
      type: 'SCORE_LOAD',
      payload: scores,
    });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
