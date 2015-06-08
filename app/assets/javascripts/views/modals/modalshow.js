TrelloClone.Views.ModalShow = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
    this.model = options.model;
    this.$modal = $('.btn-remove');
  },

  events: {
    'click .btn-remove': 'close'
  },

  center: function() {
    var $modal = $('.btn-remove');
    var top = Math.max($(window).height() - this.$modal.outerHeight(), 0) / 2;
    var left = Math.max($(window).width() - this.$modal.outerWidth(), 0) / 2;

    $modal.css({
      top: top + $(window).scrollTop(),
      left: left + $(window).scrollLeft()
    });
  },

  // open: function(settings) {
  //   $content.empty().append(settings.content);
  //   this.$modal.css({
  //     width: settings.width || 'auto',
  //     height: settings.height || 'auto'
  //   })
  //
  //   this.center();
  //
  //   $(window).bind('resize.modal', this.center);
  //
  //   this.$modal.show();
  //   $overlay.show();
  // },

  render: function() {
    this.$el.html(this.template);
    this.center();
    return this;
  },

  close: function() {
    this.$el.remove();
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
  }

})
