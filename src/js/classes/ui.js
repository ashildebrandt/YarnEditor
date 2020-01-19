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
    $("#app-bg").css("background", "url(https://source.unsplash.com/collection/9402556/1920x1080?"+Date.now()+")");
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
    app.config.darkMode = true;
    $('body').attr('id', 'theme-dark');
    $(this).hide();
    $('#menu-lightmode').show();
});

$('#menu-lightmode').click(function() {
    app.config.darkMode = false;
    $('body').attr('id', 'theme-light');
    $(this).hide();
    $('#menu-darkmode').show();
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
    } else {
        app.config.randomBackground(true);
        console.log("Turning on random backgrounds");
        RetrieveRandomBackground();
    }
});

$('#menu-view-blur').click(function() {
    if(app.config.blurBackground()) {
        console.log("Turning off background blur");
        app.config.blurBackground(false);
        $('#app-bg').css("filter", "initial");
    } else {
        app.config.blurBackground(true);
        console.log("Turning on background blur");
        $('#app-bg').css("filter", "blur(10px)");
    }
});

$('#menu-view-refresh').click(function() {
    RetrieveRandomBackground();
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