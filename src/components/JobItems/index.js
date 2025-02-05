import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

class JobItems extends Component {
  renderCompanyData = () => {
    const {each} = this.props
    const {companyLogoUrl, rating, title} = each
    return (
      <div className="job-item-top-section-first-container">
        <img
          className="job-item-company-image"
          src={companyLogoUrl}
          alt="company logo"
        />
        <div className="job-item-title-rating-container">
          <h3 className="job-item-title">{title}</h3>
          <div className="job-item-rating-container">
            <IoIosStar className="yellow-star" />
            <p className="job-item-rating">{rating}</p>
          </div>
        </div>
      </div>
    )
  }

  renderAnnualPackage = () => {
    const {each} = this.props
    const {employmentType, location, packagePerAnnum} = each
    return (
      <div className="job-item-top-section-second-container">
        <div className="job-item-location-employment-type">
          <div className="job-item-location">
            <IoLocationSharp className="white-location" />
            <p className="job-item-location-text">{location}</p>
          </div>
          <div className="job-item-employment-type">
            <FaSuitcase className="white-suitcase" />
            <p className="job-item-employment-type-text">{employmentType}</p>
          </div>
        </div>
        <div>
          <p>{packagePerAnnum}</p>
        </div>
      </div>
    )
  }

  renderJobDescription = () => {
    const {each} = this.props
    const {jobDescription} = each
    return (
      <div className="job-item-bottom-section-container">
        <h3 className="job-item-description-heading">Description</h3>
        <p className="job-item-description">{jobDescription}</p>
      </div>
    )
  }

  renderJobItem = () => {
    const {each} = this.props
    const {id} = each
    return (
      <li>
        <Link to={`/jobs/${id}`} className="job-item-Link">
          <div className="job-item-background-container">
            <div className="job-item-top-section">
              {this.renderCompanyData()}
              {this.renderAnnualPackage()}
            </div>
            <hr />
            {this.renderJobDescription()}
          </div>
        </Link>
      </li>
    )
  }

  render() {
    return this.renderJobItem()
  }
}

export default JobItems
