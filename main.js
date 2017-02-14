//margin is given 
var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
	    height = (500 - margin.top - margin.bottom);

//scale the axis 
var x=d3.scaleBand().range([0,width]);
var y  = d3.scaleLinear().range([height, 0]);

//select the body and apend with svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("statement.csv", function(error,data){
	 data.forEach(function(d) {
			 d.Amount=d.Amount;
	 });

	  x.domain(data.map(function(d) { return d.date; }));
	    y.domain([
			   d3.min(data,function(d){
				   return -d.Amount;
				   }), 
			    d3.max(data, function(d) { return d.Amount; })]);    
	    
	    
	   

	       svg.append("g")
		       .attr("class", "x axis")
		       .attr("transform","translate(0," + height/2+")")
		       .call(d3.axisBottom(x))
		       .selectAll("text")
		       .style("text-anchor","end")
		       .attr("dx","-.8em")
		       .attr("dy","-.8em")
		       .attr("transform", "rotate(-90)");


	      svg.append("g")
	            .attr("class", "y axis")
	          .call(d3.axisLeft(y))
		      .append("text")
	            .attr("transform", "rotate(-90)")
		    .attr("y", 10)
		     .attr("dy", ".71em")
		   .style("text-anchor", "end")
		 .text("Value ($)");

	        svg.selectAll("bar")
		      .data(data)
		          .enter().append("rect")
		       .style("fill", "steelblue")
		.attr("class",function(d){return "bar bar--" + (d.Amount < 0 ? "negative" : "positive"); })
		.attr("x", function(d){return (x(d.date))+40;})	
		.attr("y", function(d) { return d.Amount < 0 ? y(0) : y(d.Amount)  })
		.attr("width",x.bandwidth()/4)
		.attr("height", function(d) { 
			console.log("height" +height)
				console.log("y(amount)"+y(d.Amount),d.Amount)
				console.log("negetive amount", -1*y(d.Amount))
				console.log("result", height-y(d.Amount))
			return d.Amount < 0 ? -1* (height/2 - ((height/2 - y(0)) + y(d.Amount))) : height/2 - y(d.Amount) });

});
