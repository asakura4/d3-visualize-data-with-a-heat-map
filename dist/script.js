// colors from colorbrewer
// http://colorbrewer2.org/

var colorbrewer = {
  RdYlBu: {
    3: ['#fc8d59', '#ffffbf', '#91bfdb'],
    4: ['#d7191c', '#fdae61', '#abd9e9', '#2c7bb6'],
    5: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
    6: ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'],
    7: [
    '#d73027',
    '#fc8d59',
    '#fee090',
    '#ffffbf',
    '#e0f3f8',
    '#91bfdb',
    '#4575b4'],

    8: [
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee090',
    '#e0f3f8',
    '#abd9e9',
    '#74add1',
    '#4575b4'],

    9: [
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee090',
    '#ffffbf',
    '#e0f3f8',
    '#abd9e9',
    '#74add1',
    '#4575b4'],

    10: [
    '#a50026',
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee090',
    '#e0f3f8',
    '#abd9e9',
    '#74add1',
    '#4575b4',
    '#313695'],

    11: [
    '#a50026',
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee090',
    '#ffffbf',
    '#e0f3f8',
    '#abd9e9',
    '#74add1',
    '#4575b4',
    '#313695'] },


  RdBu: {
    3: ['#ef8a62', '#f7f7f7', '#67a9cf'],
    4: ['#ca0020', '#f4a582', '#92c5de', '#0571b0'],
    5: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
    6: ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'],
    7: [
    '#b2182b',
    '#ef8a62',
    '#fddbc7',
    '#f7f7f7',
    '#d1e5f0',
    '#67a9cf',
    '#2166ac'],

    8: [
    '#b2182b',
    '#d6604d',
    '#f4a582',
    '#fddbc7',
    '#d1e5f0',
    '#92c5de',
    '#4393c3',
    '#2166ac'],

    9: [
    '#b2182b',
    '#d6604d',
    '#f4a582',
    '#fddbc7',
    '#f7f7f7',
    '#d1e5f0',
    '#92c5de',
    '#4393c3',
    '#2166ac'],

    10: [
    '#67001f',
    '#b2182b',
    '#d6604d',
    '#f4a582',
    '#fddbc7',
    '#d1e5f0',
    '#92c5de',
    '#4393c3',
    '#2166ac',
    '#053061'],

    11: [
    '#67001f',
    '#b2182b',
    '#d6604d',
    '#f4a582',
    '#fddbc7',
    '#f7f7f7',
    '#d1e5f0',
    '#92c5de',
    '#4393c3',
    '#2166ac',
    '#053061'] } };




let url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';


var main = d3.select('body').
append('div').
attr('class', 'main');
var header = main.append('div').
attr('class', 'header');

header.append('h1').
attr('id', 'title').
text('Monthly Global Tepmerature');

d3.json(url, function (error, data) {
  if (error) {
    throw error;
  }
  header.append('h3').
  attr('id', 'description').
  html(
  'Base temperature: ' + data.baseTemperature + '&#8451;, from ' +
  data.monthlyVariance[0].year +
  ' to ' +
  data.monthlyVariance[data.monthlyVariance.length - 1].year);



  var fontSize = 14;
  var width = 5 * Math.ceil(data.monthlyVariance.length / 12);
  var height = 33 * 12;
  var padding = {
    left: 9 * fontSize,
    right: 9 * fontSize,
    top: 2 * fontSize,
    bottom: 6 * fontSize };



  var tip = d3.select('body').
  append('div').
  attr('id', 'tooltip').
  attr('class', 'tooltip').
  style('opacity', 0);





  var svg = main.
  append('div').
  append('class', 'graph-part').
  append('svg').
  attr('width', width + padding.left + padding.right).
  attr('height', height + padding.top + padding.bottom);


  // var tip = d3.tip()
  //   .attr('class', 'd3-tip')
  //   .attr('id', 'tooltip')
  //   .html(d => d)
  //   .direction('n')
  //   .offset([-10, 0]);

  // svg.call(tip);




  console.log(d3.min(data.monthlyVariance, d => d.year));
  console.log(d3.max(data.monthlyVariance, d => d.year));

  // x-axis

  var xData = data.monthlyVariance.map(x => x.year);
  xData = d3.set(xData).values();

  var xTickValues = xData.filter(y => y % 10 === 0);



  var xScale = d3.scaleBand().
  domain(xData).
  range([0, width]);


  var xAxis = d3.axisBottom(xScale).
  tickValues(xScale.domain().filter(year => year % 10 === 1)).
  tickFormat(year => {
    var date = new Date(0);
    date.setUTCFullYear(year);
    return d3.timeFormat("%Y")(date);
  });


  svg.append('g').
  call(xAxis).
  attr('id', 'x-axis').
  attr(
  'transform',
  'translate(' + padding.left + ',' + (height + padding.top) + ')');



  // y-axis

  var yData = data.monthlyVariance.map(x => x.month);
  yData = d3.set(yData).values();
  console.log(yData);

  var yScale = d3.scaleBand().
  domain(yData).
  range([0, height]);

  var yAxis = d3.axisLeft(yScale).
  tickValues(yScale.domain()).
  tickFormat(month => {
    var date = new Date(0);
    date.setUTCMonth(month);
    console.log(date);
    return d3.timeFormat('%B')(date);
  });

  svg.append('g').
  call(yAxis).
  attr('id', 'y-axis').
  attr(
  'transform',
  'translate(' + padding.left + ',' + padding.top + ')');


  // legend

  var legendColors = colorbrewer.RdYlBu[11].reverse();
  var legendWidth = 400;
  var legendHeight = 300 / legendColors.length;

  var variance = data.monthlyVariance.map(val => val.variance);
  var minTemp = data.baseTemperature + Math.min.apply(null, variance);
  var maxTemp = data.baseTemperature + Math.max.apply(null, variance);

  console.log(minTemp, maxTemp);

  var setLegendDomain = (min, max, len) => {
    var arr = [];
    var step = (max - min) / len;
    for (var i = 1; i < len; i++) {
      arr.push(min + i * step);
    }
    return arr;
  };


  var legendThreshold = d3.scaleThreshold().
  domain(setLegendDomain(minTemp, maxTemp, legendColors.length)).
  range(legendColors);


  console.log(legendThreshold.domain());
  console.log(legendThreshold.range());

  var legendXScale = d3.scaleLinear().
  domain([minTemp, maxTemp]).
  range([0, legendWidth]);

  console.log(legendXScale.domain());
  var legendXTick = legendThreshold.domain().map(x => x);
  legendXTick.unshift(minTemp);
  legendXTick.push(maxTemp);
  console.log("Xtick", legendXTick);

  var legendXAxis = d3.axisBottom(legendXScale).
  tickValues(legendXTick).
  tickFormat(d3.format('.1f'));

  var legend = svg.append('g').
  attr('id', 'legend').
  attr(
  'transform',
  'translate(' +
  padding.left +
  ',' + (
  padding.top + height + padding.bottom - 2 * legendHeight) +
  ')');




  legend.
  append('g').
  selectAll('rect').
  data(
  legendThreshold.range().map(function (color) {
    var d = legendThreshold.invertExtent(color);
    if (isNaN(d[0])) {

      d[0] = legendXScale.domain()[0];
    }
    if (isNaN(d[1])) {

      d[1] = legendXScale.domain()[1];
    }
    console.log(d);
    return d;
  })).

  enter().
  append('rect').
  style('fill', function (d) {
    console.log(legendThreshold(d[0]));
    return legendThreshold(d[0]);
  }).
  attr('x', d => {
    if (!isNaN(d[0])) {
      return legendXScale(d[0]);
    }
  }).
  attr('y', 0).
  attr('width', d => legendXScale(d[1]) - legendXScale(d[0])).
  attr('height', legendHeight);
  // .attr({
  //       x: function (d) {
  //         return legendXScale(d[0]);
  //       },
  //       y: 0,
  //       width: function (d) {
  //         return legendXScale(d[1]) - legendXScale(d[0]);
  //       },
  //       height: legendHeight
  //     });

  legend.
  append('g').
  attr('transform', 'translate(' + 0 + ',' + legendHeight + ')').
  call(legendXAxis);


  // map
  svg.append('g').
  attr('class', 'map').
  attr('transform', 'translate(' + padding.left + ',' + padding.top + ')').
  selectAll('rect').
  data(data.monthlyVariance).
  enter().
  append('rect').
  attr('class', 'cell').
  attr('data-month', d => d.month - 1).
  attr('data-year', d => d.year).
  attr('data-temp', d => data.baseTemperature + d.variance).
  attr('x', d => xScale(d.year)).
  attr('y', d => yScale(d.month)).
  attr('width', d => xScale.bandwidth()).
  attr('height', d => yScale.bandwidth()).
  attr('fill', d => legendThreshold(data.baseTemperature + d.variance)).
  on('mouseover', d => {
    let date = new Date(0);
    date.setUTCFullYear(d.year - 1);
    date.setUTCMonth(d.month);
    console.log(date);
    var str = '<span class=\'tip\'>' +
    d3.timeFormat('%Y - %B')(date) +
    '<br/>' +
    d3.format('.1f')(data.baseTemperature + d.variance) +
    '&#8451;' +
    '<br/>' +
    d3.format('.1f')(d.variance) +
    '</span>';
    tip.style('opacity', 0.9).
    attr('data-year', d.year);

    tip.html(str).
    style('left', xScale(d.year) + 60 + 'px').
    style('top', yScale(d.month) + 'px');

  }).
  on('mouseout', () => {
    tip.style('opacity', 0);
  });


});