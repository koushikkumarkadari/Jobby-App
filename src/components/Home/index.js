import {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="home-background-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button
              onClick={this.onFindJobs}
              className="home-find-jobs-button"
              type="button"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
