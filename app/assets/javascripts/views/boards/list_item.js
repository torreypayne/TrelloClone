TrelloClone.Views.ListItem = Backbone.CompositeView.extend({

  template: JST['lists/list_items'],

  className: 'list-item',

  events: {
    'click btn.card-delete' : 'removeCard',
    'click button.btn-add': 'newCard',
    'submit form.card-create': 'addCard',
    // 'click button.btn-remove': 'remove',
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync sort remove', this.render);
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

  // remove: function() {
  //   this.$el.remove();
  //   this.model.destroy();
  // },

  addCardSubview: function(card) {
    var cardItem = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview($('ul.list-show'), cardItem);
  },

  newCard: function(event) {
    this.$('div.card-create-form').append(
      $("<form class='card-create' action='api/cards'><label for='title'>Title</label><br><input type='text' id='title' name='card[title]'><br><label for='desc'>Description</label><br><input type='textarea' id='desc' name='card[description]'><br><br><button type='submit'>Create Your New Card!</button><br></form><br>")
      .css('display', 'block').css('float', 'left').css('clear', 'both')
    );
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
  },

  removeCardSubview: function(card) {
    this.removeModelSubview('div.card-create-form', card);
  }

  // deleteCard: function(event) {
  //   var listView = this;
  //   event.preventDefault();
  //   var deletedItem = event;
  // }

});
