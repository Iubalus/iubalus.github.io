$(function(){
        var musicLibrary = [
            {
                name: 'Rhodes Aesthetic',
                date: '2018-10-07',
                source: 'https://drive.google.com/uc?export=download&amp;id=1nfA46_IsDF4-xX--GHWiL19bnpooa4lg',
                type: 'audio/wav'
            }
        ]

        JBLConsole({
            target:$("[data-console]"),
            dataOut:$("[data-command-out]"),
            dataIn:$("[data-command-in]")
        })

		function JBLConsole(setup){
		    var target = setup.target;
		    var dataOut = setup.dataOut;
		    var dataIn = setup.dataIn;

            var consoleBuffer = [];
            var renderSize = 20;
            var position = 0;
            var screenWidth = 80;

            var ignoredKeys = [
                9,//tab
                16,17,18,20,//modifier keys
                35,36,37,39,//arrow and navigation
                112,113,114,115,116,117,118,119,120,121,122,123,//function keys
                144//num lock
            ];
            var commands = {
                'play': {
                    doc:function(){
                        consolePrintln("&nbsp;");
                        consolePrintln("################################### Play ######################################")
                        consolePrintln("NAME");
                        consolePrintln("&nbsp;&nbsp;&nbsp;play - play a musical track");
                        consolePrintln("&nbsp;");
                        consolePrintln("SYNOPSIS");
                        consolePrintln("&nbsp;&nbsp;&nbsp;play [TRACKNO]");
                        consolePrintln("&nbsp;");
                        consolePrintln("DESCRIPTION");
                        consolePrintln("&nbsp;&nbsp;&nbsp;Play a music track or list available tracks if TRACKNO is not provided");
                        consolePrintln("&nbsp;");
                        consolePrintln("AUTHOR");
                        consolePrintln("&nbsp;&nbsp;&nbsp;Jubal Rife");
                        consolePrintln("&nbsp;");
                        consolePrintln("COPYRIGHT");
                        consolePrintln("&nbsp;&nbsp;&nbsp;You know this is a joke right?");
                        consolePrintln("&nbsp;");

                    },
                    cmd: function(args){
                        if(args.length == 0){
                            consolePrintln("Use \"help play\" for more information");
                            consolePrintln("[TRACKS]");
                            for(var i = 0; i < musicLibrary.length; i++){
                                consolePrintln("&nbsp;&nbsp;&nbsp" + i + " - \"" + musicLibrary[i].name + "\" " + musicLibrary[i].date);
                            }
                        } else {
                            var selection = musicLibrary[args[0]];
                            if(selection === undefined){
                                consolePrintln("No track \"" + args[0] + "\" could be found. Track must be a number.");
                            } else {
                                consolePrint("loading " + selection.name + " " + selection.date + "...");
                                $("[data-console-execute-wrap]").html(audioTemplate(selection));
                                playAudio();
                            }
                        }
                    }
                },
                'help':{
                    doc: function(){},
                    cmd: function(args){
                        if(args.length > 0){
                            for(var i = 0; i < args.length; i++){
                                var docFor = commands[args[i]];
                                if(docFor === undefined){
                                    consolePrintln("No function \"" + args[i] + "\" exists");
                                } else {
                                    docFor.doc();
                                }
                            }
                        } else {
                            var documented = ['play'];
                            for(var i = 0; i < documented.length; i++){
                                commands[documented[i]].doc();
                            }
                        }
                    }
                }
            }

		    target.append('<span contenteditable="true" data-console-focus class="offscreen"></span>');
		    target.on("click", function(){
                $("[data-console-focus]").focus();
		    });
		    $("[data-console-focus]").keydown(function(event){
                    for(var i = 0; i < ignoredKeys.length; i++){
                        if(event.keyCode == ignoredKeys[i]){
                            return;
                        }
                    }
                    if(event.keyCode === 8){
                        //backspace
                        dataIn.text(dataIn.text().slice(0, -1))
                    } else if(event.keyCode === 13){
                        //enter
                        var command = dataIn.text();
                        var parts = command.split(' ');
                        var toExecute = commands[parts[0].toLowerCase()];
                        consolePrintln(command);
                        if(toExecute === undefined){
                            consolePrintln("Unknown command: \"" + command + "\"");
                        } else {
                            toExecute.cmd(parts.slice(1));
                        }
                        dataIn.empty();
                        refresh();
                    } else if(event.keyCode === 33){
                        //page up
                        if(position - renderSize < 0){
                            position = 0;
                        } else {
                            position -= renderSize;
                        }
                        refresh();
                    } else if(event.keyCode === 34){
                        //page down
                        if(position + renderSize > consoleBuffer.length){
                            position = consoleBuffer.length - 1;
                        } else {
                            position += renderSize;
                        }
                        refresh();
                    } else if(event.keyCode === 38) {
                        //arrow up
                        if(position - 1 < 0){
                            position = 0;
                        } else {
                            position -= 1;
                        }
                        refresh();
                    } else if(event.keyCode === 40) {
                        //arrow down
                        if(position + 1 > consoleBuffer.length){
                            position = consoleBuffer.length - 1;
                        } else {
                            position += 1;
                        }
                        refresh();
                    } else {
                        if(dataIn.text().length < screenWidth){
                            dataIn.append(event.key);
                        }
                    }
            });

		    async function playAudio(){
		        try{
		            var song = target.find("[data-console-audio-song]")[0];
		            song.load();
		            await song.play();
		            consolePrintln(" playing...");
		        } catch(err){
		            console.log(err);
		        }
		    }

		    function audioTemplate(opts){
		        var source = opts.source;
		        var type = opts.type;
		        return "<audio controls='' data-console-audio-song src='" + source + "' type='" + type + "'></audio>"
		    }

		    function consolePrint(message){
		        consoleBuffer.push(message);
		        if(consoleBuffer.length > renderSize){
		            position++;
		        }
		        refresh();
		    }

		    function consolePrintln(message){
		        consolePrint(message + '<br>');
		    }

		    function refresh(){
                dataOut.empty();
                for(var i = position; i < Math.min(position + renderSize, consoleBuffer.length); i++){
                    dataOut.append("<span>" + consoleBuffer[i] + "</span>");
                }
		    }

		}
});