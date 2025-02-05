import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'

import './index.css'

class SimilarJobs extends Component {
  render() {
    const {each} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = each
    return (
      <li className="similar-jobs-background-container">
        <div className="similar-job-logo-title-and-rating-container">
          <img
            className="similar-job-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-job-title-and-rating-container">
            <h3 className="similar-job-title ">{title}</h3>
            <div className="similar-job-rating-container">
              <IoIosStar size={28} className="yellow-star" />
              <p className="similar-job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job-description-container">
          <h3 className="similar-job-description-heading">Description</h3>
          <p className="similar-job-job-description">{jobDescription}</p>
        </div>
        <div className="similar-job-location-and-employment-type-container">
          <div className="similar-job-location-container ">
            <IoLocationSharp className="white-location" />
            <p className="similar-job-location">{location}</p>
          </div>
          <div className="similar-job-employment-type-container">
            <FaSuitcase className="white-suitcase" />
            <p className="similar-job-employment-type">{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default SimilarJobs
