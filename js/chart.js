var margin = {top: 30, right: 60, bottom: 40, left: 20},
    width = 310 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var rooms = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(rooms, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(rooms, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

// Adds title
			svg.append("text")
       		 	.attr("x", (width / 2))             
        		.attr("y", 0 - (margin.top / 2))
        		.attr("text-anchor", "middle")  
        		.style("font-size", "15px")
        		//.style("text-decoration", "underline")  
        		.text("Temperatura w mieszkaniu");

			// Adds y axis label
 			svg.append("text")
        		.attr("transform", "rotate(-90)")
        		.attr("y", 0 - margin.left)
        		.attr("x",0 - (height / 2))
        		.attr("dy", "1em")
        		.style("text-anchor", "middle")
				.style("font-size", "8px")
        		.text("Temperatura (°C)");

  var room = svg.selectAll(".room")
      .data(rooms)
    .enter().append("g")
      .attr("class", "room");

  room.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  room.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});
