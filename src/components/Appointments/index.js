import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isStarred: false,
    isAsked: false,
  }

  onAddingAppointment = event => {
    event.preventDefault()
    const {title, date, isStarred, isAsked} = this.state
    const newAppoint = {
      id: uuidv4(),
      title,
      date: date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : '',
      isStarred,
      isAsked,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppoint],
      title: '',
      date: '',
      isStarred: false,
      isAsked: false,
    }))
  }

  onEnteringTitle = event => {
    this.setState({title: event.target.value})
  }

  onEnteringDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  filterImportantAppointments = () => {
    this.setState(prevState => ({isAsked: !prevState.isAsked}))
  }

  render() {
    const {isAsked, appointmentList, title, date} = this.state
    let filteredAppointmentList
    if (isAsked) {
      filteredAppointmentList = appointmentList.filter(each => each.isStarred)
    } else {
      filteredAppointmentList = appointmentList
    }
    return (
      <div className="app-container">
        <div className="app-card-container">
          <div className="appointment-input-container">
            <div className="input-container">
              <h1 className="header">Add Appointment</h1>
              <form
                className="add-form-container"
                onSubmit={this.onAddingAppointment}
              >
                <label htmlFor="title-bar" className="title-bar">
                  TITLE
                </label>
                <input
                  id="title-bar"
                  type="text"
                  className="input"
                  value={title}
                  placeholder="Title"
                  onChange={this.onEnteringTitle}
                />
                <label htmlFor="date-bar" className="title-bar">
                  DATE
                </label>
                <input
                  id="date-bar"
                  type="date"
                  className="input"
                  min="2023-01-01"
                  max="2024-12-31"
                  value={date}
                  onChange={this.onEnteringDate}
                />
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-rule" />
          <div className="appointment-text-container">
            <div className="appointment-title-container">
              <h1 className="botttom-header">Appointments</h1>
              {isAsked ? (
                <button
                  type="button"
                  className="show-starred-button"
                  onClick={this.filterImportantAppointments}
                >
                  Starred
                </button>
              ) : (
                <button
                  type="button"
                  className="starred-button"
                  onClick={this.filterImportantAppointments}
                >
                  Starred
                </button>
              )}
            </div>
            <ul className="appointment-list-container">
              {filteredAppointmentList.map(each => (
                <AppointmentItem
                  appointmentList={each}
                  key={each.id}
                  toggleIsFavorite={this.toggleIsFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
