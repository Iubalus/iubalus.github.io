$(function(){
        $("body").on("click", "[data-tab]", function(){
            var clicked = $(this);
            var target = clicked.parents("[data-tabbed-content]");
            target.find("[data-tab]").toggleClass("active", false);
            clicked.toggleClass("active", true);
            target.find("[data-tab-content]").toggleClass("active", false);
            target.find("[data-tab-content='"+ clicked.data("tab")+"']").toggleClass("active", true);
        });
});