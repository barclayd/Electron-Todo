'use strict';

const { BrowserWindow } = require('electron');

// default Window settings

const defaultProps = {
    width: 500,
    height: 800,
    show: false
};

class Window extends BrowserWindow {
    constructor ({ file, ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings });
        // load devtools
        this.loadFile((file));
        this.webContents.openDevTools();

        // show when page has rendered
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window;


