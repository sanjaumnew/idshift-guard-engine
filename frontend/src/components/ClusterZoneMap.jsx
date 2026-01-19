import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ClusterZoneMap = ({ nodes = [], links = [] }) => {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!nodes.length) return;

    const wrapper = wrapperRef.current;
    const width = wrapper.clientWidth;
    const height = 420;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg
      .attr('width', width)
      .attr('height', height);

    // Color by status
    const nodeColor = d => {
      switch (d.status) {
        case 'detected': return '#ef4444';   // red
        case 'underReview': return '#f59e0b'; // amber
        default: return '#3b82f6';           // blue
      }
    };

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(160))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Links
    const link = svg.append('g')
      .attr('stroke', '#94a3b8')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    // Nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 22)
      .attr('fill', nodeColor)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .call(
        d3.drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded)
      );

    // Labels
    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.id)
      .attr('font-size', 12)
      .attr('fill', '#0f172a')
      .attr('font-weight', '500');

    // Tooltip
    const tooltip = d3.select(wrapper)
      .append('div')
      .style('position', 'absolute')
      .style('padding', '6px 10px')
      .style('background', '#0f172a')
      .style('color', '#fff')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    node
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`Platform: ${d.id}<br>Status: ${d.status || 'ok'}`);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', (event.offsetX + 15) + 'px')
          .style('top', (event.offsetY + 15) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

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
        .attr('x', d => d.x + 26)
        .attr('y', d => d.y + 4);
    });

    function dragStarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      tooltip.remove();
    };

  }, [nodes, links]);

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden">
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  );
};

export default ClusterZoneMap;
