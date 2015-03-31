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
                         .scale(140)
                         .translate( [width / 2, height / 1.2]);

  var path = d3.geo.path().projection(projection);

  var map = svg.selectAll('path')
               .data(geo_data.features)
               .enter()
               .append('path')
               .attr('d', path)
               .style('fill', 'lightBlue')
               .style('stroke', 'black')
               .style('stroke-width', 0.5);

  function plot_points(data) {
    //draw circles logic
    debugger;
    var nested = d3.nest()
                   .key(function(d) {
                      debugger;
                      return d['date'].getUTCFullYear();
                   })
                   .rollup(function(leaves) {
                      debugger;
                      var total = d3.sum(leaves, function(d){
                        return d['attendance'];
                      });
                      var coords = leaves.map(function(d){
                        return projection([+d.long, +d.lat]);
                      });
                      var center_x = d3.mean(coords, function(d){
                        return d[0];
                      });

                   })
                   .entries(data);
  };

  var format = d3.time.format("%d-%m-%Y (%H:%M h)");

  d3.tsv("world_cup_geo.tsv", function(d){
    d['attendance'] = +d['attendance'];
    d['date'] = format.parse(d['date']);
    return d;
  }, plot_points);







};

