$(function(){
        var quips = [
            'Welcome to jubalrife.com!',
            'I\'m sure I\'ll think of something to write about',
            'Want to hear music I\'ve made? Check out the music tab',
            'Gee, You found my site. Neat!',
            'Got questions or comments? Tweet me. It\'s a ghost town over there',
            'Did you know GitHub lets you host a blog for free? Neato!',
            'I re-skinned and abandoned the google doc, but I need to make a thing to generate the html for me.',
            'Don\'t expect too much from my page. It\'s all kinda taped together right now...',
            'I think this new site look is pretty spiffy!',
            '90% Widgets 10% probably other stuff I guess.',
            'Follow me on Twitter over there to the right... I\'ll say stuff like \"Check out my site\"...',
            'This used to be purple, but I got tired of that so it\'s bluish now',
            'If I\'ve written something questionable, feel free to tweet me about it: Typos ttoo.',
            'I don\'t have a subscriber count here, but I do have Google Analytics... It tells me I visit my site a lot...'
        ];
        var musicLibrary = [
            {
                name: 'Rhodes Aesthetic',
                date: '2018-10-07',
                source: 'https://drive.google.com/uc?export=download&amp;id=1nfA46_IsDF4-xX--GHWiL19bnpooa4lg',
                type: 'audio/wav'
            }
        ]
        var anchor = $("[data-quip-anchor]")
        function pickQuip(){
            anchor.html(quips[Math.floor(Math.random()*quips.length)]);
        }
        pickQuip();
        $("body").on("click", ".welcome", pickQuip);

        //save soundcloud widget render cost until the music tab is requested
        $("body").on("click", "[data-tab='music']:not(.loaded)", function(){
            $("#music-tab-content").html('<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/477779040&color=%23dcd4d0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>')
            $("[data-tab='music']").toggleClass("loaded", true);
        })

        $("body").on("click", "[data-tab]", function(){
            var clicked = $(this);
            var target = clicked.parents("[data-tabbed-content]");
            target.find("[data-tab]").toggleClass("active", false);
            clicked.toggleClass("active", true);
            target.find("[data-tab-content]").toggleClass("active", false);
            target.find("[data-tab-content='"+ clicked.data("tab")+"']").toggleClass("active", true);
        });

        $('[data-tab-content="dev-blog"]').html($("#blog-content").remove())
        console({
            target:$("[data-console]"),
            dataOut:$("[data-command-out]"),
            dataIn:$("[data-command-in]")
        })

		function console(setup){
		    var target = setup.target;
		    var dataOut = setup.dataOut;
		    var dataIn = setup.dataIn;

		    target.append('<span contenteditable="true" data-console-focus class="offscreen"></span>');
		    target.on("click", function(){
                $("[data-console-focus]").focus();
		    });

		    $("[data-console-focus]").keydown(function(event){
            		    var excluded = [16,17,18,20,9,37,38,39,40,112,113,114,115,116,117,118,119,120,121,122,123,33,34,35,36,144];
            		    for(var i = 0; i < excluded.length; i++){
            		        if(event.keyCode == excluded[i]){
            		            return;
            		        }
            		    }
            		    if(event.keyCode == 8){
            		        dataIn.text(dataIn.text().slice(0, -1))
            		    } else if(event.keyCode == 13){
            		        var command = dataIn.text();
            		        consolePrintln(command);
            		        if(command.substring(0, 6) === "manual"){
            		            consolePrintln("\"play\" is the only other supported operation");
            		        }
            		        if(command.substring(0, 4) === "play"){
            		            var selection = musicLibrary[0];
            		            consolePrint("loading " + selection.name + " " + selection.date + "...");
            		            $("[data-console-execute-wrap]").html(audioTemplate(selection));
            		            playAudio();
            		        }
            		        dataIn.empty();
            		    } else {
            		        dataIn.append(event.key);
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
		        dataOut.append('<span>' + message + '<span>');
		    }

		    function consolePrintln(message){
		        consolePrint(message + '<br>');
		    }

		}
});