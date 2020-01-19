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
    $('body').attr('id', 'theme-dark');
    $(this).hide();
    $('#menu-lightmode').show();
});

$('#menu-lightmode').click(function() {
    $('body').attr('id', 'theme-light');
    $(this).hide();
    $('#menu-darkmode').show();
});

$('#menu-view-snap').click(function() {
    if(app.snap) {
        console.log("Turning off snapping");
        app.snap = false;
        $('#menu-view-snap .check').hide();
    } else {
        console.log("Turning on snapping");
        app.snap = true;
        $('#menu-view-snap .check').show();
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