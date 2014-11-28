function Message(message, date) {

    this.getText = function () {
        return message;
    }

    this.setText = function (_text) {
        message = text;
    }

    this.getDate = function () {
        return date;
    }

    this.setDate = function (_date) {
        date = date;
    }

}

Message.prototype.toString = function () {
    return this.getText() + " (" + this.getDate() + ")";
}

Message.prototype.getHTMLText = function () {

    return this.getText().replace(/[\n\r]/g, "<br />");
}

Message.prototype.getDateText = function () {
    return this.getDate().toLocaleTimeString();
}
