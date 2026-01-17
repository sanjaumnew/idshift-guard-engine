import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ClusterZoneMap = ({ nodes = [], links = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!nodes.length && !links.length) return; // nothing to render yet

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 20)
      .attr('fill', '#3b82f6');

    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text(d => d.id)
      .attr('font-size', 12)
      .attr('fill', '#111');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x + 25)
        .attr('y', d => d.y + 5);
    });
  }, [nodes, links]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Cluster–Zone Map</h2>
      <svg ref={svgRef} width={600} height={400}></svg>
    </div>
  );
};

export default ClusterZoneMap;