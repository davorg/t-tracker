Number.prototype.toFixedNumber = function(digits, base){
  var pow = Math.pow(base||10, digits);
  return Math.round(this*pow) / pow;
}

$(document).ready(function() {
  var now             = new Date();

  do_it(now.getTime(), now.getFullYear());
});

function do_it(ms_now, year) {
  var start_of_yr    = new Date(year + '/01/01 00:00:00');
  var ms_start_of_yr = start_of_yr.getTime();
  var end_of_yr      = new Date((year + 1) + '/01/01 00:00:00');
  var ms_end_of_yr   = end_of_yr.getTime();

  var ms_in_yr       = ms_end_of_yr - ms_start_of_yr;
  var ms_thru_yr     = ms_now - ms_start_of_yr;

  var yr_percent  = (ms_thru_yr * 100) / ms_in_yr;
  var fmt_percent = yr_percent.toFixedNumber(1);

  $('#data').html(fmt_percent + '%');


  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: ""
    },
    dataPointWidth: 15,
    data: [{
      type: "stackedBar100",
      toolTipContent: "<b>{name}:</b> {y}%",
      name: "Done",
      dataPoints: [
        {y: fmt_percent, label: year, color: "green"},
      ]
    }, {
      type: "stackedBar100",
      toolTipContent: "{name}",
      name: "",
      dataPoints: [
        {y: 100 - fmt_percent, label: "", color: "white"},
      ]
    }]
  });
  chart.render();
}

