import React from "react";
import {
  Container,
  Link,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container>
        <div className="header">
          <div className="logo">
            <span>M</span>agnificent Calendar
          </div>
          <div className="header-links">
            <a className="link active" href="#">
              Dashboard
            </a>
            <a className="link" href="#">
              Calendar
            </a>
          </div>
        </div>

        <div className="content">
          <div className="left-sidebar">
            <div className="user-info">
              <div className="user-info__date">
                <p className="p big-p">Saturday, October 14, 07:00</p>
              </div>
              <div className="user-info__greeting">
                <h2 className="h2">Hi, Anatolii</h2>
              </div>
              <div className="user-info__planned">
                <p className="p">You have:</p>
                <p className="p planned__text">
                  1 meeting <span className="today">today</span>
                </p>
                <p className="p planned__text">
                  7 meetings <span className="upcoming">in next week</span>
                </p>
              </div>
              <div className="button outlined">View Schedule</div>
            </div>
            <div className="statistic">
              <div className="statistic__box staticstic__box-color-1">
                <div className="statistic__icon">
                  <img src="/" alt="" />
                </div>
                <p className="statistic__number">24</p>
                <p className="statistic__name">Scheduled</p>
              </div>
              <div className="statistic__box staticstic__box-color-2">
                <div className="statistic__icon">
                  <img src="/" alt="" />
                </div>
                <p className="statistic__number">41</p>
                <p className="statistic__name">Rescheduled</p>
              </div>
              <div className="statistic__box staticstic__box-color-3">
                <div className="statistic__icon">
                  <img src="/" alt="" />
                </div>
                <p className="statistic__number">2</p>
                <p className="statistic__name">Rejected</p>
              </div>
              <div className="statistic__box staticstic__box-color-4">
                <div className="statistic__icon">
                  <img src="/" alt="" />
                </div>
                <p className="statistic__number">87</p>
                <p className="statistic__name">Completed</p>
              </div>
            </div>
          </div>

          <div className="event-list">
            <div className="event-list__row">
              <div className="event-list__top">
                <h2 className="h2">Today's Events</h2>
                <a className="link active" href="#">
                  See All
                </a>
              </div>
              <div className="event-list__item">
                <h2 className="h3">Meeting with John</h2>
                <p className="p">
                  <AccessTimeIcon fontSize="small" />
                  07:30-11:00
                </p>
                <p className="p">
                  <PlaceIcon fontSize="small" />
                  London, Great Street, 18
                </p>
                <div className="event-list__item-bottom">
                  <p className="p">
                    <ApartmentIcon fontSize="small" />
                    Atlant agency
                  </p>
                  <div className="event-list__item-time">In 30 min</div>
                </div>
              </div>
              <div className="event-list__item">
                <h2 className="h3">Meeting with John</h2>
                <p className="p">
                  <AccessTimeIcon fontSize="small" />
                  07:30-11:00
                </p>
                <p className="p">
                  <PlaceIcon fontSize="small" />
                  London, Great Street, 18
                </p>
                <div className="event-list__item-bottom">
                  <p className="p">
                    <ApartmentIcon fontSize="small" />
                    Atlant agency
                  </p>
                  <div className="event-list__item-time">Rejected</div>
                </div>
              </div>
            </div>

            <div className="event-list__row">
              <div className="event-list__top">
                <h2 className="h2">Upcoming</h2>
                <a className="link active" href="#">
                  See All
                </a>
              </div>
              <div className="event-list__item">
                <h2 className="h3">Job Interview</h2>
                <p className="p">
                  <AccessTimeIcon fontSize="small" />
                  07:30-11:00
                </p>
                <p className="p">
                  <PlaceIcon fontSize="small" />
                  London, Great Street, 18
                </p>
                <div className="event-list__item-bottom">
                  <p className="p">
                    <ApartmentIcon fontSize="small" />
                    Atlant agency
                  </p>
                  <div className="event-list__item-time">15 October</div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-sidebar">
            <div className="right-sidebar__calendar"></div>
            <div className="button">Add Event</div>
            <div className="right-sidebar__reminder">
              <div className="reminder__top">
                <h3 className="h3">Reminders</h3>
                <div>
                  <AddCircleOutlinedIcon sx={{ color: "#3664da" }} />
                </div>
              </div>
              <div className="reminder__item">
                <FormControlLabel
                  label="Call to Maria"
                  control={<Checkbox />}
                />
                <p className="p">13:00</p>
              </div>
              <div className="reminder__item">
                <FormControlLabel
                  label="Find september archive"
                  control={<Checkbox />}
                />
                <p className="p">14:00</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
