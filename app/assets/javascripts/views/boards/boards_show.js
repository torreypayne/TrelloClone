TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],

  initialize: function(options) {
    // this.model = options.board;

    // Whoa. If I don't turn off the listener to my model, I get an error
    // from my render function. Is this because it tries to update the
    // subviews, 'setting' them with 'parsed' data on the second render
    // when in fact the update actually deletes them?
    // Edit: this was completely untrue and I was in fact just very fatigued
    // and lazy.

    // this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addListSubview);
    this.listenTo(this.model.lists(), 'remove', this.removeListSubview);
    this.listenTo(this.model.lists(), 'sort', this.render);
    this.model.lists().each(function(list) {
      this.addListSubview(list);
    }.bind(this));
  },

  events: {
    'click button.btn-remove': 'remove',
    'submit form.create-list': 'addList',
    'click button.delete-list': 'removeList'
    // 'click a' : 'removeBoardSubview'
    // 'click button.btn-add-list': 'addList'
  },

  addListSubview: function(list) {
    var listItem = new TrelloClone.Views.ListItem({ model: list });
    this.addSubview("ul.board-show", listItem);
  },

  // What is the below doing, actually?

  addList: function(event) {
    var boardView = this;
    event.preventDefault();
    var newItem = this.$('form').serializeJSON();
    newItem.board_id = this.model.id;
    console.log(newItem);
    var newList = new TrelloClone.Models.List(newItem);
    newList.save({}, {
      success: function() {
        boardView.addListSubview(newList);
      }.bind(this)
    });
  },


  render: function() {
    // var boardShow = this.template({ board: this.model });
    // this.$el.html(boardShow);
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    return this;
  },

  removeListSubview: function (list) {
    this.removeModelSubview("ul.board-show", list);
  }

  // remove: function() {
  //   this.$el.remove();
  //   this.model.destroy();
  // }

});
