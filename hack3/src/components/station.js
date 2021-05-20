import React from 'react'

function Station(props) {
  const element = props.data;
  const color = props.color;
  const index = props.index;
  const max = props.len;

  if(index === 0 || index === max-1){
    return (
      <div className="station-line-container">
        <div className="station-and-name" id={"s-"+element.station_id}> {/* you should add both id and onClick to attributes */}
          <div className="station-rectangle end">{element.station_id}</div>
          <div className={"station-name" + ' ' + color}>{element.station_name}</div>
        </div>
        <div className={"line" + ' '+ color} id={"l-"+element.station_id}></div> {/* you should add both id to attributes */}
      </div>
    )
  }
  else{
    return (
      <div className="station-line-container">
        <div className="station-and-name" id={"s-"+element.station_id}> {/* you should add both id and onClick to attributes */}
          <div className="station-rectangle">{element.station_id}</div>
          <div className={"station-name" + ' ' + color}>{element.station_name}</div>
        </div>
        <div className={"line" + ' '+ color} id={"l-"+element.station_id}></div> {/* you should add both id to attributes */}
      </div>
    )
  }
}

export default Station