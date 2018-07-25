$(function(){
        var quips = [
            'Welcome to jubalrife.com!',
            'I\'m sure I\'ll think of something to write about',
            'Want to hear music I\'ve made? Check out the music tab',
            'Gee, You found my site. Neat!',
            'Got questions or comments? Tweet me. It\'s a ghost town over there',
            'Did you know GitHub lets you host a blog for free? Neato!',
            'Did you know the Developer Blog is a google doc? That might be a problem later...',
            'Don\'t expect too much from my page. It\'s all kinda taped together right now...',
            'I think this new site look is pretty spiffy!'
        ];
        var anchor = $("[data-quip-anchor]")
        function pickQuip(){
            anchor.html(quips[Math.floor(Math.random()*quips.length)]);
            quips.push('Each quip click makes this quip more likely! Little joke of mine');
        }
        pickQuip();

        $("body").on("click", ".welcome", pickQuip);

        $("body").on("click", "[data-tab]", function(){
            var clicked = $(this);
            var target = clicked.parents("[data-tabbed-content]");
            target.find("[data-tab]").toggleClass("active", false);
            clicked.toggleClass("active", true);
            target.find("[data-tab-content]").toggleClass("active", false);
            target.find("[data-tab-content='"+ clicked.data("tab")+"']").toggleClass("active", true);
        });
});