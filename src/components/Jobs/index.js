import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import UserProfile from '../UserProfile'
import FiltersGroup from '../FiltersGroup'
import JobItems from '../JobItems'
import NavBar from '../NavBar'
import FailurePage from '../FailurePage'

const jobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employmentType: [],
    minimumPackage: 0,
    search: '',
    jobsData: {jobs: []},
    jobsStatus: jobsStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  onSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onFind = () => {
    this.getJobs()
  }

  onAddEmploymentType = employmentTypeId => {
    const {employmentType} = this.state
    this.setState(
      {employmentType: [...employmentType, employmentTypeId]},
      this.getJobs,
    )
  }

  onRemoveEmploymentType = employmentTypeId => {
    const {employmentType} = this.state
    const filteredEmploymentType = employmentType.filter(
      each => each !== employmentTypeId,
    )
    this.setState({employmentType: [...filteredEmploymentType]}, this.getJobs)
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({minimumPackage: salaryRangeId}, this.getJobs)
  }

  getJobs = async () => {
    this.setState({jobsStatus: jobsStatusConstants.inProgress})
    const {employmentType, minimumPackage, search} = this.state
    const typeString = employmentType.join()
    const accessToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeString}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        jobs: data.jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({
        jobsData: formattedData,
        jobsStatus: jobsStatusConstants.success,
      })
    } else {
      this.setState({jobsStatus: jobsStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSearchContainer = () => (
    <div className="jobs-search-input-container">
      <input
        placeholder="Search"
        className="jobs-search-input"
        type="search"
        onChange={this.onSearchInput}
      />
      <button
        onClick={this.onFind}
        className="search-icon-button"
        type="button"
        data-testid="searchButton"
      >
        <BsSearch />
      </button>
    </div>
  )

  renderSuccessJobItems = () => {
    const {jobsData} = this.state
    return jobsData.jobs.length !== 0 ? (
      <ul className="jobs-unordered-list">
        {jobsData.jobs.map(each => {
          console.log(each.id)
          return <JobItems key={each.id} each={each} />
        })}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          className="no-jobs-image"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1>No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureContainer = () => <FailurePage onFind={this.onFind} />

  renderJobsList = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case jobsStatusConstants.success:
        return this.renderSuccessJobItems()
      case jobsStatusConstants.failure:
        return this.renderFailureContainer()
      case jobsStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="jobs-interface-background-container">
          <div className="user-profile-filters-container">
            <div className="search-container-small-screen">
              {this.renderSearchContainer()}
            </div>
            <UserProfile />
            <hr />
            <FiltersGroup
              onAddEmploymentType={this.onAddEmploymentType}
              onRemoveEmploymentType={this.onRemoveEmploymentType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>
          <div className="search-and-jobs-contianer">
            <div className="search-container-large-screen">
              {this.renderSearchContainer()}
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
