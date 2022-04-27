(function () {
    let state = {
        musicOpened: false
    };
    document.getElementById("open-console").addEventListener("click", () => {
        window.open('console.html', 'Console', 'width=837,height=528');
    });
    document.getElementById("open-music-tab").addEventListener("click", () => {
        console.log("open tab clicked")
        if (!state.musicOpened) {
            state.musicOpened = true;
            document.getElementById("music-tab-content").innerHTML = '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/477779040&color=%23dcd4d0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>';
            document.getElementById("open-music-tab").classList.add("loaded");
        }
    });
    let findByAttribute = function (tag, attribute) {
        return Array.from(document.getElementsByTagName(tag))
            .filter(d => Array.from(d.attributes)
                .filter(f => f.name == attribute).length > 0)
    }
    let tabs = findByAttribute("td", "data-tab");
    let contents = findByAttribute("div", "data-tab-content");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            let activeTab = tab.attributes.getNamedItem("data-tab").value;
            contents
                .forEach(c => {
                    if (c.attributes.getNamedItem("data-tab-content").value === activeTab) {
                        c.classList.add("active");
                    } else {
                        c.classList.remove("active");
                    }
                });
        })
    });
})();