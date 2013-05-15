window.StarterKit = {
  initialize: function() {
    var conductor, card, cardId, cardUrl, $cardWrapper;
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
      card.render();
    });

    this.wiretapCard(card);
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
