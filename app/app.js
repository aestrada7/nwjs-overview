//os check
var os = require('os');
$('.os').html(os.platform());

//file open from arguments
var fs = require('fs');
var gui = require('nw.gui');
var args = gui.App.argv;

args.forEach(function(item) {
  if(item.lastIndexOf('.txt') !== -1) {
    fs.readFile(item, 'utf8', function(err, data) {
      $('.text-content').html(data);
    });
  }
});

//menu
var win = gui.Window.get();
var menu = new gui.Menu({ type: 'menubar' });

var fileMenu = new gui.Menu();

fileMenu.append(new gui.MenuItem({
  label: 'Open',
  click: function() {
    $('#file-import-dialog').click();
  },
  key: 'o',
  modifiers: 'ctrl'
}));

fileMenu.append(new gui.MenuItem({
  label: 'Quit',
  click: function() {
    gui.App.quit();
  },
  key: 'q',
  modifiers: 'ctrl'
}));

menu.append(new gui.MenuItem({
  label: 'File',
  submenu: fileMenu
}));
win.menu = menu;

$('.right-click').on('contextmenu', function(e) {
  e.preventDefault();
  menu.popup(e.target.offsetLeft, e.target.offsetTop);
  return false;
});

//file load-save
$('.load-text').on('click', function() {
  $('#file-import-dialog').click();
});

$('.save-text').on('click', function() {
  $('#file-export-dialog').click();
});

$('#file-export-dialog').on('change', function() {
  var exportPath = $('#file-export-dialog').val();
  if(exportPath) exportFile(exportPath);
});

exportFile = function(filename) {
  fs.writeFile(filename, $('.text-content').val(), 'utf8');
  $('#file-export-dialog').val('');
}

$('#file-import-dialog').on('change', function() {
  var importPath = $('#file-import-dialog').val();
  if(importPath) importFile(importPath);
});

importFile = function(filename) {
  fs.readFile(filename, 'utf8', function(err, data) {
    $('.text-content').val(data);
  });
  $('#file-import-dialog').val('');
}

//tray
var tray = new gui.Tray({
  icon: 'app/icon.png',
  tooltip: 'NW.js Overview'
});

tray.menu = fileMenu;