TrelloClone.Models.Board = Backbone.Model.extend({

  urlRoot: 'api/boards',

  parse: function(response) {
    if (response.lists) {
      this.lists().set(response.lists).sort();
      this.lists().each(function(list, idx) {
        if (list.cards) {
          list.cards().set(response.lists[idx].cards).sort();
        }
      });
      delete response.lists;
    }
    return response;
  },

  lists: function() {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists([], { board: this });
    }

    return this._lists.sort();
  }
});
