TrelloClone.Views.CardShow = Backbone.View.extend({

  initialize: function(options) {
    
  },

  comparator: function() {
    return card.get('title');
  },

  template: JST['cards/card'],

  events: {
    'click button.card-delete': 'destroyCard'
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var cardShow = this.template({ card: this.model });
    this.$el.html(cardShow) //.sortable().css('background', '#F8F8F8');
    return this;
  },

  destroyCard: function(event) {
    event.preventDefault();
    console.log('hit here');
    // var $target = $(event.currentTarget);
    // card = this.collection.getOrFetch($target.attrs('data-id'));
    this.model.destroy();
    this.remove();
    // debugger;
  },



});
