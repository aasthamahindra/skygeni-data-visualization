import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';

const CustomerTypeChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        // clear previous render
        svg.selectAll('*').remove();

        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(data.map((d) => d.Cust_Type))
            .range(['#4CAF50', '#FF9800']);

        const pie = d3.pie().value((d) => d.acv);

        const arc = d3.arc().innerRadius(70).outerRadius(radius - 10);
        const g = svg.attr('width', width).attr('height', height).append('g').attr('transform', `translate(${width/ 2}, ${height / 2})`);

        const arcs = g.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.Cust_Type));

        // add labels
        arcs.append('text')
            .attr('transform', (d) =>`translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .text(d => d.data.Cust_Type);
    }, [data]);

    return (
        <div>
            <h3>Doughnut Chart: Customer Type (by ACV)</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default CustomerTypeChart;