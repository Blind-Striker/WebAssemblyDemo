var wabt = require("wabt");
var fs = require("fs");
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

function getWasmFiles(files) {
    var wasmFiles = [];
    var thrExp = true;
    var wasmRoot = __dirname + "/public/wasm/";

    if (files === undefined || files.length === 0) {
        files = fs.readdirSync(wasmRoot);
        thrExp = false;
    }

    for (i = 0; i < files.length; i++) {
        var wasmFile = wasmRoot + files[i];
        if (path.extname(files[i]).toLowerCase() !== ".wasm" || !fs.existsSync(wasmFile)) {
            if (thrExp === true) {
                throw Error(files[i] + " is not wasm or not found")
            }
            continue;
        }
        wasmFiles.push(wasmFile);
    }

    return wasmFiles;
}

function writeWastFiles(wasmFiles) {
    if (wasmFiles === undefined || wasmFiles.length === 0) {
        return;
    }

    for (i = 0; i < wasmFiles.length; i++) {
        var wasmFile = wasmFiles[i];
        var result = fs.readFileSync(wasmFile);

        var wasm = new Uint8Array(result).buffer;
        var wmodule = wabt.readWasm(wasm, { readDebugNames: false });

        wmodule.generateNames()
        wmodule.applyNames();

        var wast = wmodule.toText({ foldExprs: false, inlineExport: false });

        var wastFile = wasmFile.replace(".wasm", ".wast");
        fs.writeFileSync(wastFile, wast);
    }
}

var wasmFiles = getWasmFiles(argv.f);
writeWastFiles(wasmFiles);