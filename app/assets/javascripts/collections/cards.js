TrelloClone.Collections.Cards = Backbone.Collection.extend({

  url: 'api/cards',

  model: TrelloClone.Models.Card,

  getOrFetch: function(id) {
    var collection = this;
    var card = this.get(id);
    if (card) {
      card.fetch();
    } else {
      card = new TrelloClone.Models.Card({ id: id });
      card.fetch({
        success: function() {
          collection.add(card);
        }
      });
      return card;
    }
  }

});
