/*global StarterKit*/

(function() {
  "use strict";

  addStringExtensions();

  function addStringExtensions() {
    var stringProto = String.prototype;

    function fmt(str, formats) {
      // first, replace any ORDERED replacements.
      var idx  = 0; // the current index for non-numerical replacements
      return str.replace(/%@([0-9]+)?/g, function(s, argIndex) {
        argIndex = (argIndex) ? parseInt(argIndex,0) - 1 : idx++ ;
        s = formats[argIndex];
        return ((s === null) ? '(null)' : (s === undefined) ? '' : s).toString();
      }) ;
    }

    stringProto.fmt = function() {
      return fmt(this, arguments);
    };

    function extend(prop, getter) {
      Object.defineProperty(stringProto, prop, {
        get: getter
      });
    }

    extend('p', function() {
      return '<p>'+this+'</p>';
    });

    extend('bold', function() {
      return '<span style="font-weight: bold;">'+this+'</span>';
    });

    var colors = {
      red: '#a00',
      green: '#0a0',
      blue: '#4866ff',
      yellow: '#aa0',
      teal: '#0aa',
      magenta: '#a0a',
      lightGrey: '#aaa',
      veryLightGrey: '#666'
    };

    Object.keys(colors).forEach(function(color) {
      extend(color, function() {
        return "<span style='color: "+colors[color]+";'>"+this+"</span>";
      });
    });
  }
})();


(function() {
  "use strict";

  // Add analytics functionality to the
  // Starter Kit
  $.extend(StarterKit, {

    wiretapCard: function(card) {
      card.wiretap(this.printWiretapEvent, this);
    },

    initializeAnalytics: function() {
      var $analytics = $('.analytics');

      $analytics.find('.tab').on('click', function() {
        $analytics.toggleClass('showing');
      });

      this.$analytics = $analytics;

      this.print("✔ Analytics monitoring active".green);
      this.print("");
      this.print("%@ %@ %@ %@".fmt(padLeft("Service", 11).blue.bold, "↔".teal.bold, pad("Event", 14).magenta.bold, "Data".lightGrey.bold));
      this.print("");
    },

    printWiretapEvent: function(service, event) {
      if (service === "nestedWiretapping") {
        this.printNestedWiretapEvent(service, event);
      } else {
        this.printNonNestedWiretapEvent(service, event);
      }
    },

    printNonNestedWiretapEvent: function(service, event) {
      var direction = (event.direction === "sent" ? "→" : "←");
      var data = JSON.stringify(event.data) || "";

      this.print("%@ %@ %@ %@".fmt(padLeft(service, 11).blue, direction.teal, pad(event.type, 14).magenta, htmlEscape(data).lightGrey));
    },

    printNestedWiretapEvent: function (service, event) {
      var i, data, dataStr, direction;

      for(i = 1, data = event.data;
          data.service === "nestedWiretapping";
          data = data.data, ++i);

      direction = (data.direction === "sent" ? "→" : "←");
      this.print("%@ %@ %@ %@ %@ %@".fmt(
        padLeft(i + "/" + data.service, 11).blue,
        direction.teal,
        pad(event.type, 14).magenta,
        data.url.veryLightGrey,
        data.id.veryLightGrey));

      if (data.data) {
        dataStr = JSON.stringify(data.data);
        this.print("%@ %@".fmt(padLeft("", 28).lightGrey, htmlEscape(dataStr).lightGrey));
      }
    },

    print: function(string) {
      var $output = this.$analytics.find('.output'),
          atBottom;

      // Determine if the output is scrolled to the bottom,
      // or if the user has scrolled up to see older log
      // messages. We only want to auto-scroll if it won't
      // disrupt the user.
      atBottom = ($output.scrollTop() === ($output[0].scrollHeight - $output.height()));

      // Append the new message
      $output.append("<p>%@%@</p>".fmt(timestamp().yellow, string));

      if (atBottom) {
        // Scroll the div to show the new message
        $output.scrollTop($output[0].scrollHeight);
      }
    }
  });

  // Pad a string with spaces to a maximum length.
  // For example, calling pad("foo", 5) would return
  // "foo  " (the original string plus two spaces to
  // bring it to five characters).
  function pad(string, max) {
    while (string.length < max) {
      string = string+" ";
    }

    return string;
  }

  // Pad a string with spaces, but prepend the necessary
  // spaces instead of appending them.
  function padLeft(string, max) {
    while (string.length < max) {
      string = " "+string;
    }

    return string;
  }

  // Pad a single-digit number with a zero, if necessary.
  // zeroPad(3)  => "03"
  // zeroPad(10) => "10"
  function zeroPad(number) {
    number = number+'';
    if (number.length === 1) {
      return "0"+number;
    }
    return number;
  }

  // Returns a new human-readable timestamp for the current time.
  // timestamp() => "2013-03-14 10:55"
  function timestamp() {
    var date = new Date(),
        year = date.getFullYear(),
        month = zeroPad(date.getMonth()+1),
        day = zeroPad(date.getDate()),
        hour = zeroPad(date.getHours()),
        minute = zeroPad(date.getMinutes());

    return "%@-%@-%@ %@:%@ ".fmt(year, month, day, hour, minute);
  }

  function htmlEscape(str) {
    return str.replace(/</g, '&lt;');
  }

})();

