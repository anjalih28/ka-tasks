import React from 'react';
import './Summary.css';

class Summary extends React.Component {
  render() {
    const { submissions } = this.props.data;

    const totalSubmissions = submissions.length;
    const allUsers = submissions.map((user) => user.name);
    const distinctUsers = [...new Set(allUsers)].length;
    const firstSubmission = submissions[0]['submittedAt'];
    const lastSubmission = submissions[submissions.length - 1]['submittedAt'];

    return (
      <div className="wrapper">
        <div className="row">
          <span className="header">Total Submissions :</span>
          <span className="content">{totalSubmissions}</span>
        </div>
        <div className="row">
          <span className="header">Distinct Users :</span>
          <span className="content">{distinctUsers}</span>
        </div>
        <div className="row">
          <span className="header">Distinct Users :</span>
          <span className="content">{firstSubmission}</span>
        </div>
        <div className="row">
          <span className="header">Distinct Users :</span>
          <span className="content">{lastSubmission}</span>
        </div>
      </div>
    );
  }
}

export default Summary;
