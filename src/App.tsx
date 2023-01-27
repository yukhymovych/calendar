import React from "react";
import {
  Container,
  Link,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Container>
        <div className="header">
          <div className="logo">
            <p>Magnificent Calendar</p>
          </div>
          <div className="header-links">
            <Link href="#">Dashboard</Link>
            <Link href="#">Calendar</Link>
          </div>
        </div>

        <div className="content">
          <div className="left-sidebar">
            <div className="user-info">
              <div className="user-info__date">
                <p className="p gray-p big-p">Saturday, October 14, 07:00</p>
              </div>
              <div className="user-info__greeting">
                <h2 className="h2">Hi, Anatolii</h2>
              </div>
              <div className="user-info__planned">
                <p className="p gray-p">You have:</p>
                <p className="p">1 meeting today</p>
                <p className="p">7 meetings in next week</p>
              </div>
              <Button>View Schedule</Button>
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
                <Button>See All</Button>
              </div>
              <div className="event-list__item">
                <h2 className="h2">Meeting with John</h2>
                <p className="p">
                  <img src="/" alt="" />
                  07:30-11:00
                </p>
                <p className="p">
                  <img src="/" alt="" />
                  London, Great Street, 18
                </p>
                <div className="event-list__item-bottom">
                  <p className="p">
                    <img src="/" alt="" />
                    Atlant agency
                  </p>
                  <div className="event-list__item-time">In 30 min</div>
                </div>
              </div>
              <div className="event-list__item">
                <h2 className="h2">Meeting with John</h2>
                <p className="p">
                  <img src="/" alt="" />
                  07:30-11:00
                </p>
                <p className="p">
                  <img src="/" alt="" />
                  London, Great Street, 18
                </p>
                <div className="event-list__item-bottom">
                  <p className="p">
                    <img src="/" alt="" />
                    Atlant agency
                  </p>
                  <div className="event-list__item-time">Rejected</div>
                </div>
              </div>
            </div>

            <div className="event-list__row">
              <div className="event-list__top">
                <h2 className="h2">Upcoming</h2>
                <Button>See All</Button>
              </div>
              <div className="event-list__item">
                <h2 className="h2">Job Interview</h2>
                <p className="p">
                  <img src="/" alt="" />
                  07:30-11:00
                </p>
                <p className="p">
                  <img src="/" alt="" />
                  London, Great Street, 18
                </p>
                <div className="event-list__item-bottom">
                  <p className="p">
                    <img src="/" alt="" />
                    Atlant agency
                  </p>
                  <div className="event-list__item-time">15 October</div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-sidebar">
            <div className="right-sidebar__calendar"></div>
            <Button>Add Event</Button>
            <div className="right-sidebar__reminder">
              <div className="reminder__top">
                <h3 className="h3">Reminders</h3>
                <Button>
                  <img src="/" alt="" />
                </Button>
              </div>
              <div className="reminder__item">
                <FormControlLabel label="Call to Maria" control={<Checkbox />} />
                <p className="p">13:00</p>
              </div>
              <div className="reminder__item">
                <FormControlLabel label="Find september archive" control={<Checkbox />} />
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
