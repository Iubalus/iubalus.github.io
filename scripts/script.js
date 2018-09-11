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
            'Do you like the purple? I like the purple. Some people haven\'t been too keen on it.',
            'If I\'ve written something questionable, feel free to tweet me about it: Typos ttoo.'
        ];
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
});