function draw(geo_data) {
  "use strict";
  var margin = 75,
      width = 1050 - margin,
      height = 610 - margin;

  var svg = d3.select("#map")
      .append("svg")
      .attr("width", width + margin)
      .attr("height", height + margin) 
      .append('g')
      .attr('class', 'USmap');

  var projection = d3.geo.mercator()
                         .scale(150)
                         .translate( [width / 2, height / 1.5]);

  var path = d3.geo.path().projection(projection);

  var map = svg.selectAll('path')
               .data(geo_data.features)
               .enter()
               .append('path')
               .attr('d', path)
               .style('fill', 'lightBlue')
               .style('stroke', 'black')
               .style('stroke-width', 0.5);

};
