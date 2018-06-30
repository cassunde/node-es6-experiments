const Message = require('./message.model');
const fs = require('fs');
const path = require('path');

class MessageService {
  constructor() {
    let resolvePromise;
    let rejectPromise;

    const filePath = path.join(__dirname, 'messages.json');

    this.messagesPromise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    fs.readFile(filePath, (err, data) => {
      if (err) {
        rejectPromise(err);
      } else {
        const dataArray = JSON.parse(data);
        const dataObj = dataArray.map((item) => {
          return new Message(item.text, item.created);
        });
        resolvePromise(dataObj);
      }
    });
  }
  get message() {
    return this.messagesPromise;
  }
}

const messageService = new MessageService();
messageService.message.then((message) => {
  console.log(message);
}).catch((err) => {
  console.log(err);
});
