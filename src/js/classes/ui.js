/* Global variables */

var menuOpen = null;
var clickingMenu = false;

/* Functions */

function TryMenu(menuName, clicking = false) {
    if(menuOpen != menuName) {
        clickingMenu = clicking;
        menuOpen = menuName;
        $('#menu-'+menuName+'.dropdown').show();
        $('button#'+menuName).addClass('selected');
    } else {
        CloseOpenMenus();
    }
}

function CloseOpenMenus() {
    if(menuOpen) {
        $('#menu-'+menuOpen+'.dropdown').hide();
        $('button#'+menuOpen).removeClass('selected');
        menuOpen = null;
    }
}

function RetrieveRandomBackground() {
    console.log("Retrieving new background");
    $("#app-bg.image").css("background-image", "url(https://source.unsplash.com/collection/9402556/1920x1080?"+Date.now()+")");
}

/* Event bindings */

$('.menu button').click(function() {
    TryMenu(this.id, true);
});

$('.menu button').mouseenter(function() {
    if(menuOpen && menuOpen != this.id) {
        CloseOpenMenus();
        TryMenu(this.id);
    }
});

$('#menu-darkmode').click(function() {
    app.config.darkMode(true);
    $('body').attr('id', 'theme-dark');
    $('#menu-darkmode').hide();
    $('#menu-lightmode').show();
});

$('#menu-lightmode').click(function() {
    app.config.darkMode(false);
    $('body').attr('id', 'theme-light');
    $('#menu-darkmode').show();
    $('#menu-lightmode').hide();
});

$('#menu-view-snap').click(function() {
    if(app.config.snap()) {
        console.log("Turning off snapping");
        app.config.snap(false);
    } else {
        console.log("Turning on snapping");
        app.config.snap(true);
    }
});

$('#menu-view-randombackground').click(function() {
    if(app.config.randomBackground()) {
        console.log("Turning off random backgrounds");
        app.config.randomBackground(false);
        $("#app-bg").removeClass("grad").removeClass("image").addClass("grad");
        $("#app-bg").attr("style", ""); /* Webkit really doesn't want to lose the background image */
    } else {
        app.config.randomBackground(true);
        console.log("Turning on random backgrounds");
        $("#app-bg").removeClass("image").removeClass("grad").addClass("image");
        RetrieveRandomBackground();
    }
});

$('#menu-view-blur').click(function() {
    if(app.config.blurBackground()) {
        console.log("Turning off background blur");
        app.config.blurBackground(false);
        $('#app-bg.image').css("filter", "initial");
    } else {
        app.config.blurBackground(true);
        console.log("Turning on background blur");
        $('#app-bg.image').css("filter", "blur(10px)");
    }
});

$('#menu-view-refresh').click(function() {
    RetrieveRandomBackground();
});

$('#node-list').click(function () {
    app.nodeListOpen = !app.nodeListOpen;
    $(this).toggleClass('rotated');
    if(app.nodeListOpen) {
        console.log("Opening node list");
        app.updateNodeListMenu('open');
        $("#search-controls").removeClass("open").addClass("open");
        $("#openHelperMenu").slideDown();
    } else {
        console.log("Closing node list");
        $("#search-controls").removeClass("open");
        $("#openHelperMenu").slideUp();
    }
});

$('#nodeSearchInput').on("change paste keyup", function() {
    if(app.nodeListOpen) {
        app.updateNodeListMenu('open');
    }
});

$(document).click(function() {
    if(menuOpen && !clickingMenu) {
        CloseOpenMenus();
    }
    clickingMenu = false;
});

$(document).ready(function() {
    if(!app.isElectron) {
        $("#frame-controls").hide();
    }
});