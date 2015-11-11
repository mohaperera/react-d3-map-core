"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

import {
  isTooltipUpdate
} from './utils/tooltipUpdate';

export default class Point extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    pointClass: 'react-d3-map-core__point'
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    geoPath: PropTypes.func.isRequired,
    pointClass: PropTypes.string,
    onMouseOver: (d) => {},
    onMouseOut: (d) => {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isTooltipUpdate(nextProps, nextState, this);
  }

  _mkPoint(dom) {
    const {
      data,
      pointClass,
      geoPath,
      onMouseOut,
      onMouseOver
    } = this.props;

    var point = d3.select(dom);

    point
      .datum(data)
      .attr('class', `${pointClass} point`)
      .attr("d", geoPath)
      .on("mouseover", function (d, i) {return onMouseOver(this, d, i);})
      .on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return point;
  }

  render () {
    var pointGroup = ReactFauxDOM.createElement('path');
    var chart = this._mkPoint(pointGroup)

    return chart.node().toReact();
  }

}
