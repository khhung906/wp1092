import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data;
  const color = props.color;

  return (
    <div className="route-graph-container">
      {
        data.map((element, index) => <Station data={element} color={color} index={index} len={data.length}/> )
      }
    </div>
  )
}

export default RouteGraph
