import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoIosHome} from 'react-icons/io'
import {FaSuitcase} from 'react-icons/fa'
import {IoLogOut} from 'react-icons/io5'
import Cookies from 'js-cookie'
import './index.css'

class NavBar extends Component {
  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navbar-background-container">
        <ul className="navbar-unordered-list">
          <li>
            <Link to="/">
              <img
                className="navbar-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </li>
          <li>
            <div className="nav-bar-link-container">
              <Link className="navbar-link" to="/">
                <p>Home</p>
              </Link>
              <Link className="navbar-link" to="/jobs">
                <p>Jobs</p>
              </Link>
            </div>
          </li>
          <li className="nav-icons-list-item">
            <ul className="nav-icon-container">
              <li>
                <Link className="navbar-link" to="/">
                  <IoIosHome size={32} />
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/jobs">
                  <FaSuitcase size={32} />
                </Link>
              </li>
              <li>
                <IoLogOut size={32} onClick={this.onLogout} />
              </li>
            </ul>
            <button
              className="navbar-logout-button"
              onClick={this.onLogout}
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(NavBar)
