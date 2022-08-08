import * as model from "./model.js";
import sendView from "./views/sendView.js";
import messageView from "./views/messageView.js";

const controlResponse = function (message) {
  const messages = model.getResponse(message);

  messageView.render(messages);
};

const controlMessage = function () {
  const messages = model.getMessages();

  messageView.render(messages);

  console.log(model.state.messages);
};

(function () {
  sendView.addHandlerSend(controlResponse);
  messageView.addHandlerMessage(controlMessage);
})();
