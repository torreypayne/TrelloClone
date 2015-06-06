TrelloClone.Views.ListItem = Backbone.CompositeView.extend({

  template: JST['lists/list_items'],

  className: 'list-item',

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'sync add', this.addCardSubview);
    this.model.cards().each(function(card) {
      // Make cardView
      // var cardShow = new TrelloClone.Views.CardShow({ model: card });
      this.addCardSubview(card);
    }.bind(this));
  },

  render: function() {
    var listView = this.template({ list: this.model });
    this.attachSubviews();
    this.$el.html(listView);

    this.$el.css({
      'float' : 'left',
      'hover' : 'true'
    });
    // this.addCardSubview($('ul.list-show'), listView);
    return this;
  },

  addCardSubview: function(card) {
    var cardItem = new TrelloClone.Views.CardShow({ model: card });
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
