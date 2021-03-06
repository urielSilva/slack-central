//= require cable
//= require_self
//= require_tree .

this.App = {};

App.cable = ActionCable.createConsumer();
/* Code under test. Will be refactored soon. */
App.quotes = App.cable.subscriptions.create('QuotesChannel', {
  received: function(data) {
    var ref = this;

    $("#quote-text").animate({ opacity: 0 }, 400, function() {
      $("#quote-text").empty();
      $("#quote-text").append(ref.renderText(data));
      $("#quote-text").animate({ opacity: 1 }, 500);
    });

    $("#quote-author").animate({ opacity: 0 }, 400, function() {
      $("#quote-author").empty();
      $("#quote-author").append(ref.renderAuthor(data));
      $("#quote-author").animate({ opacity: 1 }, 500);
    });
  },
  renderText: function(data) {
    return data.text;
  },
  renderAuthor: function(data) {
    return data.author;
  }
});
