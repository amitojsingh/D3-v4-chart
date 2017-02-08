//margin is given 
var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
	    height = 300 - margin.top - margin.bottom;

//scale the axis 
var x=d3.scaleBand().range([0,width]);
var y = d3.scaleLinear().range([height, 0]);

//select the body and apend with svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("statement.csv", function(error,data){
	 data.forEach(function(d) {
			 d.Amount= +d.Amount;
	 });

	  x.domain(data.map(function(d) { return d.date; }));
	    y.domain([0, d3.max(data, function(d) { return d.Amount; })]);      
	    
	    
	    
	       svg.append("g")
		          .attr("class", "x axis")
		        .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x))
	  	     	.selectAll("text")
		       .style("text-anchor", "end")
		    .attr("dx", "-.8em")
	            .attr("dy", "-.55em")
	        .attr("transform", "rotate(-90)" );

	      svg.append("g")
	            .attr("class", "y axis")
	          .call(d3.axisLeft(y))
		      .append("text")
	            .attr("transform", "rotate(-90)")
		    .attr("y", 6)
		     .attr("dy", ".71em")
		   .style("text-anchor", "end")
		 .text("Value ($)");

	        svg.selectAll("bar")
		      .data(data)
		          .enter().append("rect")
		        .style("fill", "steelblue")
		.attr("x", function(d){return (x(d.date))+40;})	
		.attr("y", function(d) { return y(d.Amount); })
		.attr("width",x.bandwidth()/4)
		.attr("height", function(d) { return height - y(d.Amount); });
});
