TrelloClone.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],

  initialize: function(options) {
    // this.collection = options.boards;
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'click button': 'new'
  },

  render: function() {
    var indexView = this.template({ boards: this.collection });
    this.$el.html(indexView);
    return this;
  },

  new: function() {
    event.preventDefault();
    boardView = this;
    var boardData = $('input.new-board').serializeJSON();
    // where do I get the user_id? Navbar knows about currentUser...
    // boardData.user_id
    var newBoard = new TrelloClone.Models.Board(boardData);
    newBoard.save({},{
      success: function() {
        boardView.render();
        Backbone.history.navigate('#/boards/' + newBoard.id, { trigger: true });
      }
    });
  },

});
