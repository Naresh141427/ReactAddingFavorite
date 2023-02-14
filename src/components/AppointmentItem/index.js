import './index.css'

const AppointmentItem = props => {
  const {appointmentList, toggleIsFavorite} = props
  const {id, title, date, isStarred} = appointmentList

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'

  const onImportant = () => {
    toggleIsFavorite(id)
  }
  return (
    <li className="Appointment">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onImportant}
          data-testid="star"
        >
          <img src={starImgUrl} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date">{`Date: ${date}`}</p>
    </li>
  )
}

export default AppointmentItem
