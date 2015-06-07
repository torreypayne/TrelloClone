TrelloClone.Collections.Lists = Backbone.Collection.extend({

  url: 'api/lists',

  model: TrelloClone.Models.List,

  getOrFetch: function(id) {
    var collection = this;
    var list = this.get(id);
    if (list) {
      list.fetch();
    } else {
      list = new TrelloClone.Models.List({ id: id });
      list.fetch({
        success: function() {
          collection.add(list);
        }
      });
    }
    return list;
  },

  comparator: function(list) {
    return list.get('title');
  }

  // cards: function() {}

});
