function is_leap_year(year) {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

function days_in_year(year) {
  return is_leap_year(year) ? 366 : 365;
}

function day_of_year(date) {   // d is a Date object
  var yn = date.getFullYear();
  var mn = date.getMonth();
  var dn = date.getDate();
  var d1 = new Date(yn,  0,  1, 12, 0, 0); // noon on Jan. 1
  var d2 = new Date(yn, mn, dn, 12, 0, 0); // noon on input date
  var ddiff = Math.round((d2 - d1) / 864e5);

  return ddiff + 1;
}

$(document).ready(function() {
  var now = new Date();

  do_it(now);
});

function do_it(the_date) {
  var days_in_curr_year = days_in_year(the_date.getFullYear());
  var curr_day          = day_of_year(the_date);
  var percent           = (curr_day * 100 / days_in_curr_year).toFixed(1);

  $('#data').html("Day number " + curr_day + " (" + percent + "%)");

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: ""
    },
    dataPointWidth: 15,
    data: [{
      type: "stackedBar100",
      toolTipContent: "<b>{name}:</b> {y} (" + percent + "%)",
      percent: percent,
      name: "Day",
      dataPoints: [
        {y: curr_day, label: the_date.getFullYear(), color: "green"},
      ]
    }, {
      type: "stackedBar100",
      toolTipContent: "{name}",
      name: "",
      dataPoints: [
        {y: days_in_curr_year - curr_day, label: "", color: "white"},
      ]
    }]
  });
  chart.render();
}
