window.StarterKit = {
  initialize: function() {
    var conductor, card, cardUrl, $cardWrapper;
    conductor = this.conductor = new Conductor();

    this.initializeAnalytics();
    this.initializeIframeBorderToggle();

    cardUrl = "js/cards/example_card/example_card.js";
    cardId = 1;

    conductor.loadData(cardUrl, cardId, {});
    card = conductor.load(cardUrl, cardId, []);

    $cardWrapper = $("<div class='card-wrapper'>");
    $('.cards').append($cardWrapper);
    card.appendTo($cardWrapper[0]).then(function() {
      card.render('thumbnail', {
        width: 600,
        height: 200
      });

      $cardWrapper.find('iframe').css({
        width: 600,
        height: 200
      });

      setTimeout(function() {
        $('.card-wrapper').find('iframe').css({
          width: 600,
          height: 200
        });
      }, 100); // TODO : why can I not set the iframe's css width and height right away?
    });
  },
  initializeIframeBorderToggle: function() {
    $('#show-borders').on('change', function() {
      $('body').toggleClass('show-borders', $(this).val());
    });
  }
};

$(function() {
  StarterKit.initialize();
});
