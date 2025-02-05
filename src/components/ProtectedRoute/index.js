import {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class ProtectedRoute extends Component {
  render() {
    const access = Cookies.get('jwt_token')
    if (access === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...this.props} />
  }
}

export default ProtectedRoute
