var Http = (function () {
    function Http() {
    }

    Http.get = function (url, callBack, parm1, parm2, parm3) {
        requestServer(url, "get", callBack, null, null, parm1, parm2, parm3);
    };

    Http.getBytes = function (url, callBack, parm1, parm2, parm3) {
        requestServer(url, "get", callBack, "arraybuffer", null, parm1, parm2, parm3);
    };

    Http.post = function (url, callBack, data, parm1, parm2, parm3) {
        requestServer(url, "post", callBack, null, data, parm1, parm2, parm3);
    };

    Http.postFile = function (url, callback, data, formdata, parm1, parm2, parm3) {
        if (formdata && formdata.length > 0)
            requestServer("/Generic/UploadFile", "post", null, null, formdata);
        requestServer(url, "post", callback, null, data, parm1, parm2, parm3);
    };

    Http.postBytes = function (url, callBack, data, parm1, parm2, parm3) {
        requestServer(url, "post", callBack, "arraybuffer", data, parm1, parm2, parm3);
    };

    function requestServer(url, metodoHttp, callBack, tipoRpta, data, parm1, parm2, parm3) {
        var xhr = new XMLHttpRequest();
        xhr.open(metodoHttp, url);
        xhr.setRequestHeader("xhr", "ajax");
        if (tipoRpta !== null && tipoRpta !== "") xhr.responseType = tipoRpta;
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                if (tipoRpta === null || tipoRpta === "" || tipoRpta === "text") {
                    if (callBack)
                        callBack(xhr.responseText, parm1, parm2, parm3);
                }
                else
                    if (callBack)
                        callBack(xhr.response, parm1, parm2, parm3);
            }
            else {
                if (xhr.status === 403 && xhr.responseText) {
                    let resp = JSON.parse(xhr.responseText);
                    if (resp.success === false && resp.error === "timeOut")
                        window.location.replace("/Home/Index");
                }
            }
        };
        if (metodoHttp === "get") xhr.send();
        else xhr.send(data);
    }
    return Http;
})();
window.Http = Http;

var spin = {
    show: function () {
        let spin = document.getElementById('cover-spin');
        if (spin) spin.style.display = 'block';
    },
    hide: function () {
        let spin = document.getElementById('cover-spin')
        if (spin) spin.style.display = 'none';
    }
};


var ini = {

    data: function () {
        Http.get("/Home/Getdata", ini.build);
    },
    build: function (rpta) {
        var data = rpta;
        let html = '';

        var metadata = rpta.split('~');
        var cabeceras = metadata[0].split('|');
        var filas = metadata[1].split('¬');
        var nfilas = filas.length;
        var ncab = cabeceras.length;
        var type;
        var namcab;
        var data;
        var ndata;
        let c = 0;

        html += '<div class="text text-center">';
        html += '<h1> Lista de Juegos Digitales </h1>';
        html += '</div>';
        html += '<div class="card">';
        html += '<div class="card-header card-header-custom d-flex justify-content-between bd-highlight" style="margin-bottom: -28px;">';
        html += '<h3>Juegos Digitales Disponibles en nuestra tienda </h3>';
        html += '<div class="btn-group mr-2 sw-btn-group-extra col-md-6">';
        html += '<a id="btn-showcontent" onclick="changeicon(this);" class="btn btn-sm btn-outline-secondary collapseEvent" type="button" data-toggle="collapse" data-target="#colAlignet" aria-expanded="true" aria-controls="colAlignet" style=" margin-top: 15px;padding: 8px;background-color: #ddd;float:right;">';
        html += '<i class="glyphicon glyphicon-arrow-up"></i>';
        html += '</a>';
        html += '</div>';
        html += '</div>';
        html += '<hr>';
        html += '<div class="collapse show" id="colAlignet">';
        html += '<div class="card-body pt-0">';
        html += '<div class="table table-responsive">';
        html += '<table id="tableProduct" class="table table-striped table-sm">';
        html += '<thead>';
        html += '<tr>';
        for (var i = 0; i < ncab; i++) {
            namcab = cabeceras[i].split('_')[0];
            type = cabeceras[i].split('_')[1];
            switch (type) {
                case "0": html += '<th hidden>' + namcab + '</th>'; c++; break;
                case "1": html += '<th>' + namcab + '</th>'; break;
            }
        }
        html += '</tr>';
        html += '</thead>';
        html += '<tbody id="tableProduct-body">';
        for (var i = 0; i < nfilas; i++) {
            data = filas[i].split('|');
            ndata = data.length;
            html += '<tr>';
            for (var j = c; j < ndata; j++) {
                html += '<td>';
                html += data[j];
                html += '</td>';
            }
            html += '</tr>';
        }
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        let divid = document.getElementById("table-product");
        divid.innerHTML = html;
    }
};

