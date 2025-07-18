import React from 'react';
import * as d3 from 'd3';

const TeamChart = ({ data }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (!data) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 120 };
    const width = 450 - margin.left - margin.right;
    const height = data.length * 30;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.acv)])
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.Team))
      .range([0, height])
      .padding(0.1);

    g.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('y', (d) => y(d.Team))
      .attr('width', (d) => x(d.acv))
      .attr('height', y.bandwidth())
      .attr('fill', '#43a047');

    g.append('g').call(d3.axisLeft(y));
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("$.2s")));

  }, [data]);

  return <svg ref={ref}></svg>;
};

export default TeamChart;