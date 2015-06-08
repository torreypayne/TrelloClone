TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],

  initialize: function(options) {
    // this.listenTo(this.model, 'sync', this.addLists);
    this.listenTo(this.model.lists(), 'add', this.addListSubview);
    this.listenTo(this.model.lists(), 'remove', this.removeListSubview);
    this.listenTo(this.model.lists(), 'sync', this.render);
    this.model.lists().each(function(list) {
      this.addListSubview(list);
    }.bind(this));
  },

  events: {
    'click button.btn-remove': 'remove',
    'submit form.create-list': 'addList',
    'click button.delete-list': 'removeList',
    'click button.btn-add-list': 'addList'
  },

  addListSubview: function(list) {
    var listItem = new TrelloClone.Views.ListItem({ model: list });
    this.addSubview("ul.board-show", listItem);
  },

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
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    return this;
  },

  removeListSubview: function (list) {
    this.removeModelSubview("ul.board-show", list);
  },

  removeList: function() {
    this.$el.remove();
    this.model.destroy();
  }
});
