import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

const API_URL = 'http://localhost:8080';

class Score extends React.Component {
  handleDelete = (e) => {
    e.preventDefault();
    superagent.delete(`${API_URL}/scores`)
    .send({id: e.target.value})
    .set('Accept', 'application/json')
    .then(results => {
      this.props.loadStore(results.body);
    })
    .catch(console.log('delete is not working'));
  }

  render(){
    return(
      <>
        <li>
        <p>{this.props.score.name} - {this.props.score.score} points</p>
        <button value={this.props.score._id} onClick={this.handleDelete}>Delete</button>
        </li>
      </>
    );
  };

}

const mapDispatchToProps = (dispatch) => ({
    loadStore : (scores) => {
      dispatch({
        type: 'SCORE_LOAD',
        payload: scores,
      });
    },
  });

export default connect(null, mapDispatchToProps)(Score);