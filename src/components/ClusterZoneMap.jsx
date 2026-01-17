// frontend/src/components/ClusterZoneMap.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ClusterZoneMap = ({ nodes, links }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!nodes || !links) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // clear previous render

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    // Draw nodes
    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 10)
      .attr('fill', d =>
        d.status === 'validated'
          ? '#4ade80'
          : d.status === 'exception'
          ? '#f87171'
          : '#facc15'
      )
      .call(drag(simulation));

    // Tooltip on hover
    node.append('title').text(d => `${d.id} (${d.status})`);

    // Simulation tick updates
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Drag behavior
    function drag(simulation) {
      return d3.drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, [nodes, links]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Cluster–Zone Map</h2>
      <svg ref={svgRef} width={600} height={400}></svg>
    </div>
  );
};

export default ClusterZoneMap;