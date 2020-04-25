window.addEventListener('DOMContentLoaded', onPreload);

function setupConfig() {
    window.appConfig = {
        log: false
    };
}

function onPreload() {
    setupConfig();
    bundleLibs();
}

function bundleLibs() {
    const jquery = require('jquery');

    window.$ = jquery;
    window.jQuery = jquery;
    window.libs = {};
    window.libs.$ = jquery;
    window.libs.net = require('net');
    window.libs.ipcRenderer = require('electron').ipcRenderer;
}