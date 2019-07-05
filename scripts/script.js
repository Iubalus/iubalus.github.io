$(function(){
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

        $("body").on("click", "[data-open-console]", function(){
            window.open('console.html', 'Console', 'width=837,height=528');
        });
});