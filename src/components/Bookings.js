import React from "react";
const Events = () => {
    




  return (
    <div className="events-container">
      <h3> Events</h3>
      <table className="events-table">
        <tr className="events-tableRow">
          <th className="events-tableHead">Title</th>
          <th className="events-tableHead">Price</th>
          <th className="events-tableHead">Date/Time</th>
          <th className="events-tableHead">Location</th>
        </tr>
        <tr className="events-tableRow">
          <td className="events-tableData">Alfreds Futterkiste</td>
          <td className="events-tableData">$ 1500000</td>
          <td className="events-tableData">
            1966-06-23 <br /> 04:34:34{" "}
          </td>
          <td className="events-tableData">
            Abuja event center
            <br /> Maitama, Abuja.
          </td>
          <td>
            <button className="delete-event">Delete</button>
          </td>
        </tr>

        <tr className="events-tableRow">
          <td className="events-tableData">Alfreds Futterkiste</td>
          <td className="events-tableData">$ 1500000</td>
          <td className="events-tableData">
            1966-06-23 <br /> 04:34:34{" "}
          </td>
          <td className="events-tableData">
            Abuja event center
            <br /> Maitama, Abuja.
          </td>
          <td>
            <button className="delete-event">Delete</button>
          </td>
        </tr>

        <tr className="events-tableRow">
          <td className="events-tableData">Alfreds Futterkiste</td>
          <td className="events-tableData">$ 1500000</td>
          <td className="events-tableData">
            1966-06-23 <br /> 04:34:34{" "}
          </td>
          <td className="events-tableData">
            Abuja event center
            <br /> Maitama, Abuja.
          </td>
          <td>
            <button className="delete-event">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  );
};



export default Events;
