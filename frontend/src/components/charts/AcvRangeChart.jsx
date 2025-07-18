import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const AcvRangeChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 300, height = 300, radius = Math.min(width, height) / 2;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeSet3);

    const pie = d3.pie().value((d) => d.count);
    const arc = d3.arc().innerRadius(70).outerRadius(radius);

    const arcs = g.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    arcs.append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .text((d) => d.data.ACV_Range);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default AcvRangeChart;