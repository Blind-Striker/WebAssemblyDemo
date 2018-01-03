utilsModule = (function () {
    var module = {};

    function putCode(textareaId, code) {
        var textarea = document.getElementById(textareaId);
        textarea.value = code;
        textarea.setAttribute('rows', code.split('\n').length);
    }

    function loadTextFile(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'text';
        request.onload = function (event) {
            callback(request.response);
        };
        request.send();
    }

    function run(func, n, loop) {
        func(1); // warm-up
        var startTime = performance.now();
        for (var i = 0; i < loop; i++) {
            func(n);
        }
        var endTime = performance.now();
        return ((endTime - startTime) / loop).toFixed(4);
    }

    function setMessage(text) {
        document.getElementById('message').innerText = text;
    }

    module.init = function (jsCodeUrl, wasmCodeUrl, wastCodeUrl) {
        putCode('ws_instantiate_code_area', document.getElementById('ws_instantiate_code').text.trim());

        loadTextFile(jsCodeUrl, function (text) {
            putCode('js_code_area', text.trim());
        });

        loadTextFile(wasmCodeUrl, function (text) {
            putCode('ws_code_area', text.trim());
        });

        loadTextFile(wastCodeUrl, function (text) {
            putCode('wst_code_area', text.trim());
        });
    }

    module.onReady = function () {
        document.getElementById('run_button').disabled = false;
        setMessage('Ready');
    }

    module.switchDisplay = function (div) {
        var textarea = div.getElementsByTagName('textarea')[0];
        var p = div.getElementsByTagName('p')[0];
        p.textContent = p.textContent.slice(2);
        if (textarea.style.display === 'none') {
            textarea.style.display = '';
            p.textContent = '- ' + p.textContent;
        } else {
            textarea.style.display = 'none';
            p.textContent = '+ ' + p.textContent;
        }
    }

    module.compareFunctions = function (jsFunc, wsFunc, loop, param) {
        document.getElementById('run_button').disabled = true;

        var jsPerformance = document.getElementById('js_performance');
        var wsPerformance = document.getElementById('ws_performance');
        var comparison = document.getElementById('comparison');

        jsPerformance.innerText = '';
        wsPerformance.innerText = '';
        comparison.innerText = '';

        setTimeout(function () {
            jsPerformance.innerText = run(jsFunc, param, loop);
            setTimeout(function () {
                wsPerformance.innerText = run(wsFunc, param, loop);
                comparison.innerText = (Number(jsPerformance.innerText) / Number(wsPerformance.innerText)).toFixed(4);
                setMessage('Done');
                document.getElementById('run_button').disabled = false;
            });
            setMessage('Running WebAssembly');
        });
        setMessage('Running JavaScript');
    }
    return module;
}());