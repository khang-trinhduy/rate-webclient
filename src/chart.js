/**
 * Chart SVG module for simple SVG DOM abstraction
 *
 * @module Chart.svg
 */

/* global Chart */

// Steps
// + get data
// + create svg
// + return svg

(function(chart) {
  function getData(data) {
    return data;
  }

  function createSvg(canvas) {
    return svg;
  }

  function createCanvas(data) {
    var canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 150;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const rate = data[i];
      if (i === 0) {
        ctx.lineTo(75, rate.value * 25);
      } else {
        ctx.moveTo(75 * (i + 1), rate.value * 25);
      }
    }
    ctx.stroke();
    ctx.closePath();
    return canvas;
  }
})(chart);
