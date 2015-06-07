TrelloClone.Views.CardShow = Backbone.View.extend({

  template: JST['cards/card'],

  // events: {
  //   'click button.card-delete': 'removeCardSubview'
  // },

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var cardShow = this.template({ card: this.model });
    this.$el.html(cardShow).sortable().draggable().css('background', '#F8F8F8');
    return this;
  },

  // removeCardSubview: function(card) {
  //   this.removeModelSubview(card);
  //   card.destroy();
  // }

});
