var MessageBoard = {

    messages: [],
    textField: null,
    messageArea: null,
    maxHistory: 10,

    init: function (e) {

        MessageBoard.textField = document.getElementById("inputText");
        MessageBoard.nameField = document.getElementById("inputName");
        MessageBoard.messageArea = document.getElementById("messagearea");

        // Add eventhandlers    
        document.getElementById("inputText").onfocus = function (e) { this.className = "focus"; }
        document.getElementById("inputText").onblur = function (e) { this.className = "blur" }
        document.getElementById("buttonSend").onclick = function (e) { MessageBoard.sendMessage(); return false; }

        MessageBoard.textField.onkeypress = function (e) {
            if (!e) var e = window.event;

            if (e.keyCode == 13 && !e.shiftKey) {
                MessageBoard.sendMessage();

                return false;
            }
        }
    },
    getMessages: function () {
        $.ajax({
            type: "GET",
            url: "../api/message"
        }).done(function (data) { // called when the AJAX call is ready
            MessageBoard.setMessages(data);
        });
    },
    setMessages: function (data) {
        if (data) {

            MessageBoard.messages = [];
            //MessageBoard.messageArea.innerHTML = "";
            data.forEach(function (item) {
                var message = new Message(item.Name + " said:\n" + item.Message, new Date(item.Date));
                var messageID = MessageBoard.messages.push(message) - 1;
                //MessageBoard.renderMessage(messageID);
            });
            MessageBoard.renderMessages();

            document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
        }

    },
    sendMessage: function () {

        if (MessageBoard.textField.value == "") return;
        // Make call to ajax
        $.ajax({
            contentType: "application/json",
            type: "POST",
            url: "../api/message",
            data: JSON.stringify({ Name: MessageBoard.nameField.value, Message: MessageBoard.textField.value })
        }).done(function (data) {
            //alert("Your message is saved! Reload the page for watching it");
            MessageBoard.textField.value = "";
        });

    },
    renderMessages: function () {

        // Remove all messages
        MessageBoard.messageArea.innerHTML = "";

        // Renders all messages.
        for (var i = 0; i < MessageBoard.messages.length; ++i) {
            MessageBoard.renderMessage(i);
        }

        document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
    },
    cleanHistory: function () {
        if (MessageBoard.messages.length > MessageBoard.maxHistory) {
            MessageBoard.messages.splice(0, MessageBoard.messages.length - MessageBoard.maxHistory);
        }
    },
    renderMessage: function (messageID) {

        // Message div
        var div = document.createElement("div");
        div.className = "message";

        // Clock button
        aTag = document.createElement("a");
        aTag.href = "#";
        aTag.onclick = function () {
            MessageBoard.showTime(messageID);
            return false;
        }

        var imgClock = document.createElement("img");
        imgClock.src = "Areas/Chatty/Content/pic/clock.png";
        imgClock.alt = "Show creation time";

        aTag.appendChild(imgClock);
        div.appendChild(aTag);

        // Message text
        var text = document.createElement("p");

        //textContent hade varit bättre här, dock fungerar inte radbrytningar då..
        text.innerHTML = MessageBoard.messages[messageID].getHTMLText();
        div.appendChild(text);

        // Time - Should fix on server!
        var spanDate = document.createElement("span");
        spanDate.appendChild(document.createTextNode(MessageBoard.messages[messageID].getDateText()))

        div.appendChild(spanDate);

        var spanClear = document.createElement("span");
        spanClear.className = "clear";

        div.appendChild(spanClear);

        MessageBoard.messageArea.appendChild(div);
    },
    removeMessage: function (messageID) {
        if (window.confirm("Vill du verkligen radera meddelandet?")) {

            MessageBoard.messages.splice(messageID, 1); // Removes the message from the array.

            MessageBoard.renderMessages();
        }
    },
    showTime: function (messageID) {

        var time = MessageBoard.messages[messageID].getDate();

        var showTime = "Created " + time.toLocaleDateString() + " at " + time.toLocaleTimeString();

        alert(showTime);
    }
}

MessageBoard.getMessages();

var Connector = {
    poll: function () {
        $.ajax({
            type: "GET",
            url: "../api/message/poll",
            complete: Connector.poll,
            timeout: 60000
        }).success(function (data) {
            console.log("polling successful");
            MessageBoard.setMessages(data);
        }).error(function (err) {
            console.log(err);
        });
    },
    signalr: function () {
        var chatHub = $.connection.chatHub;

        if ($.connection.hub && $.connection.hub.state === $.signalR.connectionState.disconnected) {
            $.connection.hub.start().done(function () {
                console.log("signalr connected");
            });
        }
        chatHub.client.receiveMessage = function (chatMessage) {
            var message = new Message(chatMessage.Name + " said:\n" + chatMessage.Message, new Date(chatMessage.Date));
            var messageID = MessageBoard.messages.push(message) - 1;
            MessageBoard.renderMessage(messageID);
            document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
        }
    },
    socket: function () {

    }
}

Connector.signalr();    //Ingen fallback till Connector.poll - Det finns inget scenario där egna implementationen fungerar men inte signalr
//Connector.poll();

window.onload = MessageBoard.init;