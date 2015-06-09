TrelloClone.Views.ListItem = Backbone.CompositeView.extend({

  template: JST['lists/list_items'],

  newCardTemplate: JST['cards/new'],

  className: 'list-item',

  events: {
    'click btn.card-delete' : 'removeCard',
    'click button.btn-add': 'newCard',
    'submit form.card-create': 'addCard',
    'sortreceive .list-show': 'addCardToList',
    'sortremove .list-show': 'removeCardFromList'
    // 'click button.btn-remove': 'deleteCard',
  },

  updateLists: function(event) {
    var $target = $(event.currentTarget);
    var $card = $(event.delegateTarget);
    var card;
    this.collection.each(function(list) {
      list.each(function(otherCard) {
        if otherCard.id === $card.id
      })
    });
    debugger;
    // var oldList =
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync sort remove', this.render);
    this.listenTo(this.model.cards(), 'sync add', this.addCardSubview);
    this.listenTo(this.model.cards(), 'remove', this.removeCardSubview);
    this.model.cards().each(function(card) {
      this.addCardSubview(card);
    }.bind(this));
  },

  render: function() {
    var listView = this.template({ list: this.model });
    this.attachSubviews();
    this.$el.html(listView) //.sortable();

    this.$el.css({
      'float' : 'left',
      'hover' : 'true'
    });
    var newCard = new TrelloClone.Models.Card();
    var newCardView = this.newCardTemplate({
      card: newCard,
      list: this.model
    });
    this.$('div.card-create-form').html(newCardView).toggle(false);
    setTimeout(function () {
      $('.list-show').sortable({ connectWith: '.list-show' });
    }, 0);
    return this;
  },

  addCardSubview: function(card) {
    var cardItem = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview('ul.list-show', cardItem);
  },

  newCard: function() {
    // var newCard = new TrelloClone.Models.Card();
    // // newCard.list_id = this.id;
    // var newCardView = this.newCardTemplate({
    //   card: newCard,
    //   list: this.model
    // });
    // this._swapView(newCardView);
    // not done
    this.$('div.card-create-form').toggle();

    // this.$('div.card-create-form').append(
    //   $("<form class='card-create' action='api/cards'><label for='title'>Title</label><br><input type='text' id='title' name='card[title]'><br><label for='desc'>Description</label><br><input type='textarea' id='desc' name='card[description]'><br><br><button type='submit'>Create Your New Card!</button><br></form><br>")
    //   .css('display', 'block').css('float', 'left').css('clear', 'both').toggle()
    // );
  },

  addCard: function(event) {
    var listView = this;
    event.preventDefault();
    var newItem = this.$('form').serializeJSON();
    newItem.list_id = this.model.id;
    var newCard = new TrelloClone.Models.Card(newItem);
    console.log(newCard);
    newCard.save({}, {
      success: function() {
        listView.addCardSubview(newCard);
      }.bind(this),
      error: function() {
        this.$el.effect('highlight');
      }
    });
  },

  removeCardSubview: function(card) {
    this.removeModelSubview('div.list-show', card);
  },

  deleteCard: function(event) {
    var listView = this;
    event.preventDefault();
    var deletedItem = event;
  }

});
