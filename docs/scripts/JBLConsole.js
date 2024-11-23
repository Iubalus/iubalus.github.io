let target = document.querySelector("[data-console]");
let dataOut = document.querySelector("[data-command-out]");
let dataIn = document.querySelector("[data-command-in]");
let executionWrap = document.querySelector("[data-console-execute-wrap]");
let focusAnchor = document.querySelector("[data-console-focus]");

var consoleBuffer = [];
var renderSize = 20;
var position = 0;
var screenWidth = 80;

var ignoredKeys = [
    9,//tab
    16, 17, 18, 20,//modifier keys
    35, 36, 37, 39,//arrow and navigation
    112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,//function keys
    144//num lock
];

function consolePrint(message) {
    consoleBuffer.push(message);
    if (consoleBuffer.length > renderSize) {
        position++;
    }
    refresh();
}

function consolePrintln(message) {
    consolePrint(message + '<br>');
}

function refresh() {
    dataOut.innerHTML = "";
    for (var i = position; i < Math.min(position + renderSize, consoleBuffer.length); i++) {
        console.log(consoleBuffer[i]);
        dataOut.innerHTML += "<span>" + consoleBuffer[i] + "</span>";
    }
}

var commands = {
    'smile': {
        doc: function () {
            consolePrintln("The smile command prints a smile. Pass a number to print more smiles");
        },
        cmd: function (args) {
            let repeat = 1;
            if (args.length > 0) {
                repeat = parseInt(args[0])
            }

            for (let i = 0; i < repeat; i++) {
                consolePrintln(":)");
                if (i > 100) {
                    consolePrintln("Okay that's too many smiles...")
                    setTimeout(()=>{
                        consolePrintln("Alright maybe one more")
                        consolePrintln(":)")
                    }, 1000)
                    break;
                }
            }
        }
    },
    'help': {
        doc: function () {
            consolePrintln("You can use help to see the docs for a command like you just did for \"Help\"")
        },
        cmd: function (args) {
            if (args.length > 0) {
                for (var i = 0; i < args.length; i++) {
                    var docFor = commands[args[i]];
                    if (docFor === undefined) {
                        consolePrintln("No function \"" + args[i] + "\" exists");
                    } else {
                        docFor.doc();
                    }
                }
            } else {
                consolePrintln("Smile and Help are all that's here for now");
            }
        }
    }
}

target.addEventListener("click", function () {
    focusAnchor.focus();
});

focusAnchor.addEventListener("keydown", function (event) {
    for (var i = 0; i < ignoredKeys.length; i++) {
        if (event.keyCode == ignoredKeys[i]) {
            return;
        }
    }
    if (event.keyCode === 8) {
        //backspace
        dataIn.textContent = (dataIn.textContent || '').slice(0, -1)
    } else if (event.keyCode === 13) {
        //enter
        var command = dataIn.textContent || "";
        var parts = command.split(' ');
        var toExecute = commands[parts[0].toLowerCase()];
        consolePrintln(command);
        if (toExecute === undefined) {
            consolePrintln("Unknown command: \"" + command + "\"");
        } else {
            toExecute.cmd(parts.slice(1));
        }
        dataIn.textContent = "";
        refresh();
    } else if (event.keyCode === 33) {
        //page up
        if (position - renderSize < 0) {
            position = 0;
        } else {
            position -= renderSize;
        }
        refresh();
    } else if (event.keyCode === 34) {
        //page down
        if (position + renderSize > consoleBuffer.length) {
            position = consoleBuffer.length - 1;
        } else {
            position += renderSize;
        }
        refresh();
    } else if (event.keyCode === 38) {
        //arrow up
        if (position - 1 < 0) {
            position = 0;
        } else {
            position -= 1;
        }
        refresh();
    } else if (event.keyCode === 40) {
        //arrow down
        if (position + 1 > consoleBuffer.length) {
            position = consoleBuffer.length - 1;
        } else {
            position += 1;
        }
        refresh();
    } else {
        if ((dataIn.textContent || '').length < screenWidth) {
            dataIn.textContent += event.key;
        }
    }
});

focusAnchor.focus();

