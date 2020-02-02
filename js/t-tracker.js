
$(document).ready(function() {
  var now             = new Date();

  do_it(now.getTime(), now.getFullYear());
});

function do_it(ms_now, year) {
  var start_of_yr    = new Date(year + '/01/01 00:00:00');
  var ms_start_of_yr = start_of_yr.getTime();
  var end_of_yr      = new Date(++year + '/01/01 00:00:00');
  var ms_end_of_yr   = end_of_yr.getTime();

  var ms_in_yr       = ms_end_of_yr - ms_start_of_yr;
  var ms_thru_yr     = ms_now - ms_start_of_yr;

  var yr_percent  = (ms_thru_yr * 100) / ms_in_yr;

  $('#data').html(yr_percent.toFixed(0) + '%');

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: ""
    },
    data: [{
      type: "pie",
      startAngle: 270,
      yValueFormatString: "##0\"%\"",
      indexLabel: "{label} {y}",
      dataPoints: [
        {y: yr_percent, label: "Done", color: "green"},
        {y: 100 - yr_percent, label: "To do", color: "white" },
      ]
    }]
  });
  chart.render();
}

