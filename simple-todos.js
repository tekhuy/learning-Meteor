if (Meteor.isClient) {
  // This code only runs on the client 
  // Template.body.helpers({
  //   tasks: [
  //     { text: "This is task 1" },
  //     { text: "This is task 2" },
  //     { text: "This is task 3" },
  //   ]
  // });

  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // prevent default form submit
      return false;
    }
  });

};

Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // this code only runs on the client
  Template.body.helpers({
    tasks: function () {
      // show newest tasks first
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
};