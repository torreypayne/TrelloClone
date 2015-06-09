TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['boards/show'],

  deleteTemplate: JST['boards/deletemodal'],

  initialize: function(options) {
    // this.listenTo(this.model, 'sync', this.addLists);
    this.listenTo(this.model.lists(), 'add', this.addListSubview);
    this.listenTo(this.model.lists(), 'remove', this.removeListSubview);
    this.listenTo(this.model.lists(), 'sync', this.render);
    this.listenTo(this.model.members(), 'sync add', this.render);
    this.model.lists().each(function(list) {
      this.addListSubview(list);
    }.bind(this));
    this.model.members().each(function(member) {
      this.addMemberSubview(member);
    }.bind(this));
    this.$el.on('click button.delete-list', function() {

    });
  },

  events: {
    // 'click .btn-remove': 'removeBoard',
    'click button.delete-board': 'renderModal',
    'submit form.create-list': 'addList',
    'click button.delete-list': 'removeList',
    'click button.btn-add-list': 'addList',
    'submit form.add-board-members': 'addMembership'
  },

  addListSubview: function(list) {
    var listItem = new TrelloClone.Views.ListItem({
      model: list,
      collection: this.model.lists()
     });
    this.addSubview("ul.board-show", listItem);
  },

  addList: function(event) {
    var boardView = this;
    event.preventDefault();
    var newItem = this.$('form.create-list').serializeJSON();
    newItem.board_id = this.model.id;
    console.log(newItem);
    var newList = new TrelloClone.Models.List(newItem);
    newList.save({}, {
      success: function() {
        boardView.addListSubview(newList);
      }.bind(this),
      error: function() {
        $('.btn-add-list').effect('highlight');
      }
    });
  },

  addMembership: function(event) {
    var boardView = this;
    event.preventDefault();
    var newItem = this.$('.add-board-members').serializeJSON();
    newItem.board_id = this.model.id;
    console.log(newItem);
    var newMember = new TrelloClone.Models.Member(newItem);
    newMember.save({}, {
      success: function() {
        boardView.addMemberSubview(newMember);
      }.bind(this),
      error: function() {
        $('.btn-add-list').effect('highlight');
      }
    });
  },

  addMemberSubview: function(member) {
    var memberView = new TrelloClone.Views.MemberShow({ model: member });
    this.addSubview("ul.members", memberView);
  },

  render: function() {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    return this;
  },

  removeListSubview: function (list) {
    this.removeModelSubview("ul.board-show", list);
  },

  removeBoard: function() {
    this.$el.remove();
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
  },

  renderModal: function() {
    var modal = new TrelloClone.Views.ModalShow({
      template: this.deleteTemplate(),
      model: this.model
    });

    $('body').prepend(modal.render().$el);
    this.centerModal();
  },
  //
  // centerModal: function() {
  //   var $modal = $('.btn-remove');
  //   var top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
  //   var left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;
  //
  //   $modal.css({
  //     top: top + $(window).scrollTop(),
  //     left: left + $(window).scrollLeft()
  //   });
  // }
});
