TrelloClone.Collections.Members = Backbone.Collection.extend({
  url: 'api/board_memberships',

  model: TrelloClone.Models.Member
});
