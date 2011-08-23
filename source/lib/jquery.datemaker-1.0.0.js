/**
 * jquery.datemaker.js: Date Maker plugin
 *
 * Copyright (c) 2008 Doug Sparling
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 *
 * Create a Date object using the given date format string.
 *
 * Date formats like Perl CGI::Cookie:
 * Date formats like Rails ActiveSupport::CoreExtension::Numeric::Time
 *
 * @option String s number of seconds
 * @option String m number of minutes
 * @option String h number of hours
 * @option String d number of days
 * @option String M number of months
 * @option String y number of years
 * @option String s x.second.ago
 * @option String s x.second.from_now
 * @option String s x.seconds.ago
 * @option String s x.seconds.from_now
 * @option String s x.minute.ago
 * @option String s x.minute.from_now
 * @option String s x.minutes.ago
 * @option String s x.minutes.from_now
 * @option String s x.hour.ago
 * @option String s x.hour.from_now
 * @option String s x.hours.ago
 * @option String s x.hours.from_now
 * @option String s x.day.ago
 * @option String s x.day.from_now
 * @option String s x.days.ago
 * @option String s x.days.from_now
 * @option String s x.month.ago
 * @option String s x.month.from_now
 * @option String s x.months.ago
 * @option String s x.months.from_now
 * @option String s x.year.ago
 * @option String s x.year.from_now
 * @option String s x.years.ago
 * @option String s x.years.from_now
 * @option String midnight 
 * @option String now 
 *
 * @example 
 * $.datemaker('+30s');                // 30 seconds from now
 * $.datemaker('+5m');                 // 5 minutes from now
 * $.datemaker('+1h');                 // 1 hour from now
 * $.datemaker('-1d');                 // 1 day ago 
 * $.datemaker('+10d');                // 10 days from now 
 * $.datemaker('+2M');                 // 2 months from now      
 * $.datemaker('-6M');                 // 6 months ago      
 * $.datemaker('+1y');                 // 1 year from now      
 * $.datemaker('30.seconds.ago');      // 30 seconds ago     
 * $.datemaker('30.seconds.from_now'); // 30 seconds from now      
 * $.datemaker('5.minutes.ago');       // 5 minutes ago     
 * $.datemaker('5.minutes.from_now');  // 5 minutes from now      
 * $.datemaker('1.hour.ago');          // 1 hour ago     
 * $.datemaker('1.hour.from_now');     // 1 hour from now      
 * $.datemaker('10.days.ago');         // 10 days ago     
 * $.datemaker('10.days.from_now');    // 10 days from now      
 * $.datemaker('6.months.ago');        // 6 months ago     
 * $.datemaker('6.months.from_now');   // 6 months from now      
 * $.datemaker('1.year.ago');          // 1 year ago     
 * $.datemaker('1.year.from_now');     // 1 year from now      
 * $.datemaker('midnight');            // midnight
 * $.datemaker('now');                 // now
 * @desc Examples...
 * @example $.cookie('cookie_name', 'cookie_value', { expires: $.datemaker('+1h') });
 * @desc Using with jQuery cookie plugin
 *
 * @param String s Date format identifier.
 * @return Date object
 * @type Date object
 *
 * @name $.datemaker
 * @cat Plugins/Date
 * @author Doug Sparling/doug.sparling@gmail.com
 * @version 1.0.0
 */
(function($) {

  $.datemaker = function(expires) {

    var d1 = new Date();

    if ( ar = expires.match(/^([+|-])?(\d+)(\w)$/) ) {

      var action;
      RegExp.$1 == '+' || RegExp.$1 == ''  ? action = '+' : action = '-';

      if (RegExp.$3 == 's') {
        action  == '-' ? $.datemaker.advanceSeconds(d1, '-', RegExp.$2) : $.datemaker.advanceSeconds(d1, '+', RegExp.$2);
      } else if (RegExp.$3 == 'm') {
        action  == '-' ? $.datemaker.advanceMinutes(d1, '-', RegExp.$2) : $.datemaker.advanceMinutes(d1, '+', RegExp.$2);
      } else if (RegExp.$3 == 'h') {
        action  == '-' ? $.datemaker.advanceHours(d1, '-', RegExp.$2) : $.datemaker.advanceHours(d1, '+', RegExp.$2);
      } else if (RegExp.$3 == 'd') {
        action  == '-' ? $.datemaker.advanceDays(d1, '-', RegExp.$2) : $.datemaker.advanceDays(d1, '+', RegExp.$2);
      } else if (RegExp.$3 == 'M') {
        action  == '-' ? $.datemaker.advanceMonths(d1, '-', RegExp.$2) : $.datemaker.advanceMonths(d1, '+', RegExp.$2);
      } else if (RegExp.$3 == 'y') {
        action  == '-' ? $.datemaker.advanceYears(d1, '-', RegExp.$2) : $.datemaker.advanceYears(d1, '+', RegExp.$2);
      }
    } else if ( ar = expires.match(/^(\d+)\.seconds?\.ago$/) ) {
      $.datemaker.advanceSeconds(d1, '-', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.seconds?\.from_now$/) ) {
      $.datemaker.advanceSeconds(d1, '+', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.minutes?\.ago$/) ) {
      $.datemaker.advanceMinutes(d1, '-', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.minutes?\.from_now$/) ) {
      $.datemaker.advanceMinutes(d1, '+', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.hours?\.ago$/) ) {
      $.datemaker.advanceHours(d1, '-', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.hours?\.from_now$/) ) {
      $.datemaker.advanceHours(d1, '+', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.days?\.ago$/) ) {
      $.datemaker.advanceDays(d1, '-', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.days?\.from_now$/) ) {
      $.datemaker.advanceDays(d1, '+', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.months?\.ago$/) ) {
      $.datemaker.advanceMonths(d1, '-', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.months?\.from_now$/) ) {
      $.datemaker.advanceMonths(d1, '+', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.years?\.ago$/) ) {
      $.datemaker.advanceYears(d1, '-', RegExp.$1);
    } else if ( ar = expires.match(/^(\d+)\.years?\.from_now$/) ) {
      $.datemaker.advanceYears(d1, '+', RegExp.$1);
    } else if (ar = expires.match(/^now$/)) {
      // just return d1
    } else if (ar = expires.match(/^midnight$/)) {
       d1.setDate(d1.getDate()+1);
       d1.setHours(0);
       d1.setMinutes(0);
       d1.setSeconds(0);
    }
    return d1;
  };

  // Advance functions
  $.datemaker.advanceSeconds = function(d1, direction, seconds) {
      direction == '-' ? d1.setSeconds( d1.getSeconds() - parseInt(seconds) ) : d1.setSeconds( d1.getSeconds() + parseInt(seconds) );
  }
  $.datemaker.advanceMinutes = function(d1, direction, minutes) {
      direction == '-' ? d1.setMinutes( d1.getMinutes() - parseInt(minutes) ) : d1.setMinutes( d1.getMinutes() + parseInt(minutes) );
  }
  $.datemaker.advanceHours = function(d1, direction, hours) {
      direction == '-' ? d1.setHours( d1.getHours() - parseInt(hours) ) : d1.setHours( d1.getHours() + parseInt(hours) );
  }
  $.datemaker.advanceDays = function(d1, direction, days) {
      direction == '-' ? d1.setDate( d1.getDate() - parseInt(days) ) : d1.setDate( d1.getDate() + parseInt(days) );
  }
  $.datemaker.advanceMonths = function(d1, direction, months) {
      direction == '-' ? d1.setMonth( d1.getMonth() - parseInt(months) ) : d1.setMonth( d1.getMonth() + parseInt(months) );
  }
  $.datemaker.advanceYears = function(d1, direction, years) {
      direction == '-' ? d1.setFullYear( d1.getFullYear() - parseInt(years) ) : d1.setFullYear( d1.getFullYear() + parseInt(years) );
  };
}) (jQuery)
