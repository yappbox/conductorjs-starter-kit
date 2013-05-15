Conductor.require('../../../libs/jquery-1.9.1.js');
Conductor.requireCSS('example_card.css');

var card = Conductor.card({
  consumers: {
    exampleConsumer: Conductor.Oasis.Consumer.extend({
      events: {
        // add events here
      }
    })
  },

  activate: function(data) {
    // this is called when loadData is called?
  },

  render: function(intent, dimensions) {
    // you need to have a block level element that has width, so the container can size you
    $('body').html('<div id="width-target">example card rendered!</div>');
  },

  resize: function(dimensions) {
    // container asks for you to fit in dimensions.width and dimensions.height
  }
});
