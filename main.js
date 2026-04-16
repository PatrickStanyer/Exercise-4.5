// Exercise 4.3 — Create responsive SVG container
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");


// Exercise 4.4 — Load CSV data
d3.csv("../data/BrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count   // convert string → number
  };
})
.then(data => {
  console.log(data);                // full dataset
  console.log(data.length);         // number of rows
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); // [min, max]

  // Optional: sort by count descending
  data.sort((a, b) => b.count - a.count);

  // Pass data to the bar chart function (created in Exercise 4.5)
  drawBarChart(data);
});


// Exercise 4.5 — Draw the bar chart
const drawBarChart = data => {

  // Step 1: Bind data to rectangles
  const bars = svg
    .selectAll("rect.bar")
    .data(data)
    .join("rect")
    .attr("class", "bar");

  // Step 2: Make bars visible
  const barHeight = 20;   // thickness of each bar

  bars
    .attr("width", d => d.count)   // width based on count
    .attr("height", barHeight)     // constant height
    .attr("fill", "steelblue");    // colour so you can see them

  // Step 3: Space out the bars vertically
  bars
    .attr("x", 0)                                 // all bars start at x = 0
    .attr("y", (d, i) => i * (barHeight + 5));    // space them out using index
};


