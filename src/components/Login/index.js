import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSuccessForm = async response => {
    const data = await response.json()
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    this.setState({showErrorMsg: false})
    const {history} = this.props
    history.replace('/')
  }

  onFailureForm = async response => {
    const data = await response.json()
    const errorMsg = data.error_msg
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.onSuccessForm(response)
    } else {
      this.onFailureForm(response)
    }
  }

  renderLogo = (src, alt) => <img className="login-logo" src={src} alt={alt} />

  renderInput = (label, id, type, placeholder, onChangeFunction, value) => (
    <div className="login-input-container">
      <label className="login-label" htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onChangeFunction}
        placeholder={placeholder}
        className="login-input"
        id={id}
        name={id}
        type={type}
        value={value}
      />
    </div>
  )

  renderButton = text => (
    <button type="submit" className="login-btn">
      {text}
    </button>
  )

  renderLoginContainer = () => {
    const {errorMsg, showErrorMsg, username, password} = this.state
    return (
      <form onSubmit={this.onSubmitForm} className="login-container">
        {this.renderLogo(
          'https://assets.ccbp.in/frontend/react-js/logo-img.png',
          'website logo',
        )}
        {this.renderInput(
          'USERNAME',
          'username',
          'text',
          'Username',
          this.onUsernameChange,
          username,
        )}
        {this.renderInput(
          'PASSWORD',
          'password',
          'password',
          'Password',
          this.onPasswordChange,
          password,
        )}
        {this.renderButton('Login')}
        {showErrorMsg && <p className="login-error">{`*${errorMsg}`}</p>}
      </form>
    )
  }

  render() {
    const accessToken = Cookies.get('jwt_token')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background-container">
        {this.renderLoginContainer()}
      </div>
    )
  }
}

export default Login
