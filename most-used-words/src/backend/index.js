const { ipcMain } = require('electron');

ipcMain.on('process-subtitles', (event, arg) => {
    console.log(arg);

    event.reply('process-subtitles', 'pong');
})