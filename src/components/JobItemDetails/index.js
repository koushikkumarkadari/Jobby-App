import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'
import {GrShare} from 'react-icons/gr'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import SimilarJobs from '../SimilarJobs'
import FailurePage from '../FailurePage'
import './index.css'

const jobDetailsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsStatus: jobDetailsStatusConstants.initial,
    jobData: {jobDetails: {skills: [], lifeAtCompany: {}}, similarJobs: []},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobDetailsStatus: jobDetailsStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const formattedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({
        jobData: formattedData,
        jobDetailsStatus: jobDetailsStatusConstants.success,
      })
    } else {
      this.setState({jobDetailsStatus: jobDetailsStatusConstants.failure})
    }
  }

  onFind = () => {
    this.getJobDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailurePage = () => <FailurePage onFind={this.onFind} />

  renderCompanyData = () => {
    const {jobData} = this.state
    const {jobDetails} = jobData
    const {companyLogoUrl, rating, title} = jobDetails
    return (
      <div className="job-details-company-data-container">
        <img
          className="job-details-company-logo"
          src={companyLogoUrl}
          alt="job details company logo"
        />
        <div className="job-details-title-and-rating-container">
          <h3 className="job-details-title">{title}</h3>
          <div className="job-details-rating-container">
            <IoIosStar size={28} className="yellow-star" />
            <p className="job-details-rating">{rating}</p>
          </div>
        </div>
      </div>
    )
  }

  renderAnnualPackage = () => {
    const {jobData} = this.state
    const {jobDetails} = jobData
    const {employmentType, location, packagePerAnnum} = jobDetails
    return (
      <div className="job-details-location-employment-type-and-annual-package-container">
        <div className="job-details-location-and-employment-type-container">
          <div className="job-details-location-container">
            <IoLocationSharp className="white-location" />
            <p className="job-details-location">{location}</p>
          </div>
          <div className="job-details-employment-type-container">
            <FaSuitcase className="white-suitcase" />
            <p className="job-details-employment-type">{employmentType}</p>
          </div>
        </div>
        <div>
          <p className="job-details-annual-package">{packagePerAnnum}</p>
        </div>
      </div>
    )
  }

  renderJobDescription = () => {
    const {jobData} = this.state
    const {jobDetails} = jobData
    const {companyWebsiteUrl, jobDescription} = jobDetails
    return (
      <div className="job-details-job-description-container">
        <div className="job-details-description-and-visit-container">
          <h3 className="job-details-description-heading">Description</h3>
          <div className="job-details-company-visit-container">
            <a className="job-details-visit" href={companyWebsiteUrl}>
              Visit
            </a>
            <GrShare />
          </div>
        </div>
        <div>
          <p className="job-details-job-description">{jobDescription}</p>
        </div>
      </div>
    )
  }

  renderSkills = () => {
    const {jobData} = this.state
    const {jobDetails} = jobData
    const {skills} = jobDetails
    return (
      <div className="job-details-skills-heading-and-background-container">
        <h3 className="job-details-skills-heading">Skills</h3>
        <ul className="job-details-skills-background-container">
          {skills.map(each => {
            const {name} = each
            return (
              <li className="job-details-skills-container" key={name}>
                <img
                  className="job-details-skills-image"
                  src={each.imageUrl}
                  alt={name}
                />
                <p className="job-details-skill">{name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderLifeAtCompany = () => {
    const {jobData} = this.state
    const {jobDetails} = jobData
    const {lifeAtCompany} = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-details-life-at-company-container">
        <h3 className="job-details-life-at-company-heading">Life at Company</h3>
        <div className="job-details-life-at-company-description-and-image-container">
          <p className="job-details-life-at-company-description">
            {description}
          </p>
          <img
            className="job-details-life-at-company-image"
            src={imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {jobData} = this.state
    const {similarJobs} = jobData
    return (
      <div className="job-details-similar-jobs-container">
        <h1>Similar Jobs</h1>
        <ul className="job-details-similar-jobs-background-container">
          {similarJobs.map(each => (
            <SimilarJobs key={each.id} each={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => (
    <div className="job-details-background-container">
      <div className="job-details-container">
        {this.renderCompanyData()}
        {this.renderAnnualPackage()}
        <hr />
        {this.renderJobDescription()}
        {this.renderSkills()}
        {this.renderLifeAtCompany()}
      </div>
      {this.renderSimilarJobs()}
    </div>
  )

  renderJobDetailsInterface = () => {
    const {jobDetailsStatus} = this.state
    switch (jobDetailsStatus) {
      case jobDetailsStatusConstants.success:
        return this.renderJobDetails()
      case jobDetailsStatusConstants.failure:
        return this.renderFailurePage()
      case jobDetailsStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        {this.renderJobDetailsInterface()}
      </>
    )
  }
}

export default JobItemDetails
