import React from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null,
        booked: true
    }

    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <p  onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </p>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"
                />
            :
            <span
                className="label-year"
                onClick={(e)=> { this.showYearEditor()}}
                style={{cursor:"pointer"}}
                >
                {this.year()}
            </span>
        );
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdaysShort.map((day) => {
          
            return (
                <td key={day} className="week-day">{day}
               </td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d === this.currentDay() ? "current-day day " : "day");
            let selectedClass = (d === this.state.selectedDay ? " selected-day " : "")
            let classNameBooking = (this.state.booked === false ? "availability-icon-2-cal" : "availability-icon-1-cal")
          
            daysInMonth.push(
                <td key={d} className={className + selectedClass} >
                    <span onClick={(e)=>{this.onDayClick(e, d)}}>{d}
                    <p className={classNameBooking}> </p>
                    </span>
                </td>
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
          
            return (
                <tr key={i*100}>
                    {d}
                   
                </tr>
            );
        })

        return (
          <div>
            <div className="calender-main-container">
                  <div className="calender-wrapper">
                    <div className="availability">
                      <div className="available-dates">
                        <div className="available-dates-1">
                          <p className="availability-icon-1"> </p>
                        <p className="calender-align-availability">Available dates</p></div>

                        <i className="fa fa-times close-icon"
                         style={{cursor:"pointer"}}
                         >

                        </i>
                      </div>
          
                      <div className="available-dates-1">
                        <p className="availability-icon-2"> </p>
                        <p className="calender-align-availability">Booked dates</p>
                      </div>

                     
                    </div>
          
                    <div className="calender-container-outer">
                      <div className="calender-container">
                        <table className="calender">
                          <thead>
                            <tr >
                              <td colSpan="5"  className="calender-header">
                                  <div className="calender-month-year">
                                  <this.MonthNav />
                                  <this.YearNav />
                                  </div>

                                  
                                  

                              </td>
                              <td colSpan="4" className="nav-month">
                                  <i className="prev fa fa-fw fa-chevron-left"
                                      onClick={(e)=> {this.prevMonth()}}
                                      style={{cursor:"pointer"}}
                                      >
                                  </i>
                                  <i className="prev fa fa-fw fa-chevron-right"
                                      onClick={(e)=> {this.nextMonth()}}
                                      style={{cursor:"pointer"}}
                                      
                                      >
                                  </i>

                              </td>
                          </tr>
                          </thead>
          
                          <tbody >
                          <tr  >
                            {weekdays}
                        </tr>
                        {trElems}
                   
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
          

        );
    }
}
