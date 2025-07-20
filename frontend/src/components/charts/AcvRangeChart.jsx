import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Box, Typography } from '@mui/material';

const AcvRangeChart = ({ data }) => {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data || !data.length) return;

    const width = 250;
    const height = 250;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    // Create a group element to center the chart
    const g = svg
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeSet3);

    // Create the pie layout
    const pie = d3.pie()
      .value(d => d.count || 0)
      .sort(null);

    // Arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.5)  // Donut chart
      .outerRadius(radius * 0.9);

    // Tooltip
    const tooltip = d3.select(tooltipRef.current);

    // Create arcs
    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Add the arc paths
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .on('mouseover', (event, d) => {
        const [x, y] = d3.pointer(event, svg.node());
        tooltip
          .style('opacity', 1)
          .html(`
            <div><strong>${d.data.ACV_Range || 'N/A'}</strong></div>
            <div>Count: ${d.data.count}</div>
            <div>ACV: $${d.data.acv?.toLocaleString() || '0'}</div>
          `)
          .style('left', `${x + 10}px`)
          .style('top', `${y}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    // Add labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => {
        const percent = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
        return percent > 10 ? d.data.ACV_Range : '';
      });
  }, [data]);

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Box
        ref={tooltipRef}
        sx={{
          position: 'absolute',
          padding: '8px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          borderRadius: '4px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 10,
          fontSize: '12px',
          fontFamily: 'sans-serif',
        }}
      />
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!data || data.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No ACV Range data available
          </Typography>
        ) : (
          <svg ref={ref} style={{ width: '100%', height: '100%' }} />
        )}
      </Box>
    </Box>
  );
};

export default AcvRangeChart;