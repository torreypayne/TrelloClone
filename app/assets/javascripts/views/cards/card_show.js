TrelloClone.Views.CardShow = Backbone.View.extend({

  template: JST['cards/card'],

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var cardShow = this.template({ card: this.model });
    this.$el.html(cardShow);
    return this;
  }

});
