TrelloClone.Views.MemberShow = Backbone.View.extend({

  initialize: function() {},

  template: JST['memberships/show'],

  render: function() {
    var showView = this.template({ member: this.model });
    this.$el.html(showView);
    return this;
  }

});
