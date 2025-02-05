import {Component} from 'react'
import './index.css'

class FailurePage extends Component {
  render() {
    const {onFind} = this.props
    return (
      <div className="no-jobs-container">
        <img
          className="no-jobs-image"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={onFind} type="button" className="retry-button">
          Retry
        </button>
      </div>
    )
  }
}
export default FailurePage
