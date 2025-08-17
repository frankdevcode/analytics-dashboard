import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Limpiar SVG anterior

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Colores
    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['#4F46E5', '#7C3AED', '#EC4899', '#EF4444', '#F59E0B', '#10B981']);

    // Crear tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Pie generator
    const pie = d3
      .pie()
      .value(d => d.value)
      .sort(null);

    // Arc generator
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcHover = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius + 10);

    // Crear arcos
    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Agregar paths
    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arcHover);
        
        const percentage = ((d.data.value / d3.sum(data, d => d.value)) * 100).toFixed(1);
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.data.label}</strong><br/>Valor: ${d.data.value.toLocaleString()}<br/>Porcentaje: ${percentage}%`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

    // Agregar etiquetas
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text(d => {
        const percentage = ((d.data.value / d3.sum(data, d => d.value)) * 100);
        return percentage > 5 ? `${percentage.toFixed(0)}%` : '';
      })
      .style('opacity', 0)
      .transition()
      .delay(1000)
      .duration(500)
      .style('opacity', 1);

    // Leyenda
    const legend = g
      .selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${radius + 20}, ${-data.length * 10 + i * 20})`);

    legend
      .append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', d => color(d.label))
      .attr('rx', 2);

    legend
      .append('text')
      .attr('x', 18)
      .attr('y', 6)
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .text(d => d.label);

    // Cleanup function
    return () => {
      d3.selectAll('.tooltip').remove();
    };
  }, [data]);

  return (
    <div className="w-full flex justify-center">
      <svg ref={svgRef} className="w-full h-auto max-w-md"></svg>
    </div>
  );
};

export default PieChart;