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
                         .center([-100, 43]) // TODO: Set this to users location
                         .scale(800);

  var path = d3.geo.path().projection(projection);

  var map = svg.selectAll('path')
               .data(geo_data.features)
               .enter()
               .append('path')
               .attr('d', path)
               .style('fill', 'lightBlue')
               .style('stroke', 'black')
               .style('stroke-width', 0.5);

  var g = svg.append("g");

  d3.csv("SightingData.csv", function(error, data){
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle" )
      .attr("cx", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[0]; })
      .attr("cy", function(d){ return projection([d.LONGITUDE, d.LATITUDE])[1]; })
      .attr("r", 1)
      .style("fill", "red")
  });





};

