TrelloClone.Views.ListItem = Backbone.CompositeView.extend({

  template: JST['lists/list_items'],

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCardSubview);
    this.model.cards().each(function(card) {
      this.addCardSubview(card);
    }.bind(this));
  },

  render: function() {
    var listView = this.template({ list: this.model });
    this.$el.html(listView);
    this.attachSubviews();
    // this.addCardSubview($('ul.list-show'), listView);
    return this;
  },

  addCardSubview: function(card) {
    var cardItem = new TrelloClone.Views.CardItem({ model: card });
    this.addSubview($('ul.list-show'), cardItem);
  },

  addCard: function(event) {
    var listView = this;
    event.preventDefault();
    var newItem = this.$('form').serializeJSON();
    newItem.list_id = this.model.id;
    console.log(newCard);
    var newCard = new TrelloClone.Models.Card(newItem);
    newCard.save({}, {
      success: function() {
        listView.addCardSubview(newCard);
      }.bind(this)
    });
  }

});
