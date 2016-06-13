var Dialog = require("DialogModule");

function show_dialog(argument) {
  Dialog.show({
    title: "Hello, World!",
    message: "Dialog created in JavaScript",
    positiveButton: {
      text: "OK",
      callback: function () { console.log("OK clicked!"); }
    },
    negativeButton: {
      text: "CANCEL",
      callback: function () { console.log("CANCEL clicked!"); }
    },
  });
}

module.exports = {
  show_dialog: show_dialog
};
