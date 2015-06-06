window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.boards = new TrelloClone.Collections.Boards();
    var router = new TrelloClone.Routers.Boards({
      $rootEl: $('#main'),
      boards: this.boards
      });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
