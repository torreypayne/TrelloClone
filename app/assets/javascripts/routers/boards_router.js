TrelloClone.Routers.Boards = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.boards = options.boards;
    // this.boards.fetch();
  },

  routes: {
    '': 'index',
    '/boards/edit': 'new',
    'boards/:id': 'show'
  },

  index: function() {
    this.boards.fetch();
    var indexView = new TrelloClone.Views.BoardsIndex({ collection: this.boards });
    this._swapView(indexView);
  },

  show: function(id) {
    // event.preventDefault();
    var board = this.boards.getOrFetch(id);
    var boardView = new TrelloClone.Views.BoardShow({ model: board });
    this._swapView(boardView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
