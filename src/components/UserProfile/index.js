import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const userProfileStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class UserProfile extends Component {
  state = {userInfo: {}, userStatus: userProfileStatusConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({userStatus: userProfileStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const accessToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const formatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        userInfo: formatedData,
        userStatus: userProfileStatusConstants.success,
      })
    } else {
      this.setState({userStatus: userProfileStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="user-profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {userInfo} = this.state
    const {name, profileImageUrl, shortBio} = userInfo
    return (
      <div className="user-profile-background-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="user-name">{name}</h1>
        <p className="user-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailure = () => (
    <div className="user-profile-failure-container">
      <button
        className="user-profile-retry-button"
        type="button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {userStatus} = this.state
    switch (userStatus) {
      case userProfileStatusConstants.inProgress:
        return this.renderLoader()
      case userProfileStatusConstants.success:
        return this.renderSuccess()
      case userProfileStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default UserProfile
