/*  Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

    Authors: Shamal Faily */

'use strict';

$("#genDocClick").click(function () {
  $('#menuBCClick').attr('dimension','documentation');
  refreshMenuBreadCrumb('documentation');
//  showDocumentationForm();
});

function showDocumentationForm() {
  activeElement("objectViewer");
  fillOptionMenu("fastTemplates/editGenDocOptions.html", "#objectViewer", null, true, true, function () {
  });
}

var mainContent = $("#objectViewer");
mainContent.on('click',"#GenerateDocumentation", function (e) {
  e.preventDefault();
  var json = {}; 
  var docType = $("#theDocumentType").val();
  var outputType = $("#theOutputType").val();
  var genDocUrl = serverIP + "/api/documentation/type/" + docType + "/format/" + outputType + "?session_id=" + String($.session.get('sessionID'));
  showLoading();

  $.ajax({
    type: "GET",
    data: {
      session_id: String($.session.get('sessionID'))
    },
    crossDomain: true,
    url: genDocUrl,
    success: function (data) {
      window.location.assign(genDocUrl);
    },
    complete: function() {
      hideLoading();
    },
    error: function (xhr, textStatus, errorThrown) {
      var error = JSON.parse(xhr.responseText);
      showPopup(false, String(error.message));
      debugLogger(String(this.url));
      debugLogger("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
    }
  });
});
