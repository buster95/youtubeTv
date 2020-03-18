'use strict';
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const { is } = require('electron-util');
// const unhandled = require('electron-unhandled');
// const debug = require('electron-debug');
// const contextMenu = require('electron-context-menu');
const config = require('./config');
// const menu = require('./menu');
const packageJson = require('./package.json');

// unhandled();
// debug();
// contextMenu();

// app.setAppUserModelId(packageJson.build.appId);
app.setAppUserModelId('com.buster95.youtubetv');

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }

// Prevent window from being garbage collected
let mainWindow;

const createMainWindow = async () => {
	const win = new BrowserWindow({
		title: app.name,
		// title: 'YouTube TV',
		// show: false,
		width: 600,
		height: 400,
	});
	win.maximize();
	win.removeMenu();

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	// await win.loadFile(path.join(__dirname, 'index.html'));
	await win.loadURL('https://www.youtube.com/tv#/', {
		userAgent: 'Mozilla/5.0 (Linux; Tizen 2.3) AppleWebKit/538.1 (KHTML, like Gecko)Version/2.3 TV Safari/538.1'
	});

	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

(async () => {
	await app.whenReady();
	// Menu.setApplicationMenu(menu);
	mainWindow = await createMainWindow();

	// const favoriteAnimal = config.get('favoriteAnimal');
	// mainWindow.webContents.executeJavaScript(`document.querySelector('header p').textContent = 'Your favorite animal is ${favoriteAnimal}'`);
})();
