import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <img
          className="not-found-image"
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        />
        <h1>Page Not Found</h1>
        <p className="not-found-para">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    )
  }
}

export default NotFound
