import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FiltersGroup extends Component {
  renderTypesOfEmployment = () => {
    const {onAddEmploymentType, onRemoveEmploymentType} = this.props
    return (
      <>
        <h3 className="filters-heading">Type of Employment</h3>
        <ul className="filter-group-container">
          {employmentTypesList.map(each => {
            const {label, employmentTypeId} = each
            const onCheckingCheckBox = event => {
              const {value, checked} = event.target
              if (checked) {
                onAddEmploymentType(value)
              } else {
                onRemoveEmploymentType(value)
              }
            }
            console.log(employmentTypeId)
            return (
              <li
                className="filter-group-input-container"
                key={employmentTypeId}
              >
                <input
                  onClick={onCheckingCheckBox}
                  value={employmentTypeId}
                  type="checkbox"
                  id={employmentTypeId}
                  name={employmentTypeId}
                />
                <label htmlFor={employmentTypeId}>{label}</label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  renderSalaryRange = () => (
    <>
      <h3 className="filters-heading">Salary Range</h3>
      <ul className="filter-group-container">
        {salaryRangesList.map(each => {
          const {label, salaryRangeId} = each
          const {onChangeSalaryRange} = this.props
          const onSelectRange = event => {
            onChangeSalaryRange(event.target.value)
          }
          console.log(salaryRangeId)
          return (
            <li className="filter-group-input-container" key={salaryRangeId}>
              <input
                onClick={onSelectRange}
                value={salaryRangeId}
                type="radio"
                id={salaryRangeId}
                name="salary_range"
              />
              <label htmlFor={salaryRangeId}>{label}</label>
            </li>
          )
        })}
      </ul>
    </>
  )

  render() {
    return (
      <>
        {this.renderTypesOfEmployment()}
        <hr />
        {this.renderSalaryRange()}
      </>
    )
  }
}

export default FiltersGroup
