/*********************/
/* Get All Functions */
/*********************/

function getAllPersonnel() {
    //console.log("Getting all personnel.");
    $.ajax({
        url: "libs/php/getAll.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                updatePersonnelTable(result['data']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
}

function getAllDepartments() {
    //console.log("Getting all departments.");
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                updateDepartmentsTable(result['data']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
}

function getAllLocations() {
    //console.log("Getting all locations.");
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                updateLocationsTable(result['data']);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
}

/********************/
/* Search Functions */
/********************/

function searchAll(txt) {
    //console.log("Filtering personnel by " + txt);
    $.ajax({
        url: "libs/php/SearchAll.php",
        type: "POST",
        dataType: "json",
        data: {
            txt: txt
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                updatePersonnelTable(result['data']);
                highlight($("#personnelTable tr td"));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
}

function searchDepartments(txt) {
    //console.log("Filtering departments by " + txt);
    $.ajax({
        url: "libs/php/searchAllDepartments.php",
        type: "POST",
        dataType: "json",
        data: {
            txt: txt
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                updateDepartmentsTable(result["data"]);
                highlight($("#departmentsTable tr td"));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
}

function searchLocations(txt) {
    //console.log("Filtering locations by " + txt);
    $.ajax({
        url: "libs/php/searchAllLocations.php",
        type: "POST",
        dataType: "json",
        data: {
            txt: txt
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                updateLocationsTable(result["data"]);
                highlight($("#locationsTable tr td"));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
}

/********************/
/* Helper Functions */
/********************/

function highlight(target) {
    target.unmark({ // hmm
        done: function () {
            target.mark($('#searchInp').val(), {
                "element": "span",
                "className": "highlight"
            });
        }
    });
}

function updatePersonnelTable(data) {
    $('#personnelPlaceholder').empty();
    $('#personnelTable tr').remove();
    $.each(data, function (i, item) {
        let $tr = $('<tr>').append(
            $('<td class="align-middle text-nowrap">').text(item.lastName + ', ' + item.firstName),
            $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(item.department),
            $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(item.location),
            $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(item.email),
            $('<td class="text-end text-nowrap">').append(
                $(`<button type="button" class="btn btn-primary btn-sm me-1" data-bs-toggle="modal"
                    data-bs-target="#editPersonnelModal">`).attr("data-id", item.id).html('<i class="fa-solid fa-pencil fa-fw"></i>')
            ).append($(`<button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-bs-toggle="modal"
            data-bs-target="#deletePersonnelModal">`).attr('data-id', item.id).html('<i class="fa-solid fa-trash fa-fw"></i>'))
        ).appendTo('#personnelTable');
        //console.log($tr.html());
    });
}

function updateDepartmentsTable(data) {
    $('#departmentsPlaceholder').empty();
    $('#departmentsTable tr').remove();
    $.each(data, function (i, item) {
        let $tr = $('<tr>').append(
            $('<td class="align-middle text-nowrap">').text(item.name),
            $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(item.location),
            $('<td class="text-end text-nowrap">').append(
                $(`<button type="button" class="btn btn-primary btn-sm me-1" data-bs-toggle="modal"
                data-bs-target="#editDepartmentsModal">`).attr("data-id", item.id).html('<i class="fa-solid fa-pencil fa-fw"></i>')
            ).append($(`<button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn">`).attr('data-id', item.id).html('<i class="fa-solid fa-trash fa-fw"></i>'))
        ).appendTo('#departmentsTable');
        //console.log($tr.html());
    });
}

function updateLocationsTable(data) {
    $('#locationsPlaceholder').empty();
    $('#locationsTable tr').remove();
    $.each(data, function (i, item) {
        let $tr = $('<tr>').append(
            $('<td class="align-middle text-nowrap">').text(item.name),
            $('<td class="text-end text-nowrap">').append(
                $(`<button type="button" class="btn btn-primary btn-sm me-1" data-bs-toggle="modal"
                data-bs-target="#editLocationsModal">`).attr("data-id", item.id).html('<i class="fa-solid fa-pencil fa-fw"></i>')
            ).append($(`<button type="button" class="btn btn-primary btn-sm deleteLocationBtn">`).attr('data-id', item.id).html('<i class="fa-solid fa-trash fa-fw"></i>'))
        ).appendTo('#locationsTable');
        //console.log($tr.html());
    });
}

/********************/
/*     On Load      */
/********************/

$(window).on('load', function () {
    getAllPersonnel();
    $('#pre-load').addClass('fadeOut');
});

/***********************/
/*  jQuery Functions   */
/***********************/

// Search Bar
$("#searchInp").on("keyup", function () {
    if ($('#personnelBtn').hasClass('active')) {
        searchAll($("#searchInp").val());
    } else {
        if ($("#departmentsBtn").hasClass("active")) {
            searchDepartments($("#searchInp").val());
        } else {
            searchLocations($("#searchInp").val());
        }
    }
});

/***********************/
/*  Button Functions   */
/***********************/

// Refresh Button
$("#refreshBtn").click(function () {
    $('#searchInp').val('');
    if ($("#personnelBtn").hasClass("active")) {
        getAllPersonnel();
    } else {
        if ($("#departmentsBtn").hasClass("active")) {
            getAllDepartments();
        } else {
            getAllLocations();
        }
    }
});

// Filter Button
$("#filterBtn").click(function () {
    if ($("#personnelBtn").hasClass("active")) {
        $("#filterModal").modal("show");
    } else {
        $("#personnelBtn").click();
        $("#filterModal").modal("show");
    }
});

// Add Button
$("#addBtn").click(function () {
    if ($("#personnelBtn").hasClass("active")) {
        $("#addPersonnelModal").modal("show");
    } else {
        if ($("#departmentsBtn").hasClass("active")) {
            $("#addDepartmentsModal").modal("show");
        } else {
            $("#addLocationsModal").modal("show");
        }
    }
});

// Personnel Tab Button
$("#personnelBtn").click(function () {
    // Call function to refresh personnel table
    $('#searchInp').val('');
    getAllPersonnel();
});

// Departments Tab Button
$("#departmentsBtn").click(function () {
    // Call function to refresh department table
    $('#searchInp').val('');
    getAllDepartments();
});

// Locations Tab Button
$("#locationsBtn").click(function () {
    // Call function to refresh location table
    $('#searchInp').val('');
    getAllLocations();
});

/***********************/
/*  Update Functions   */
/***********************/

$("#editPersonnelModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                // Update the hidden input with the employee id so that
                // it can be referenced when the form is submitted
                $("#editPersonnelEmployeeID").val(result["data"]["personnel"][0]["id"]);
                $("#editPersonnelFirstName").val(result["data"]["personnel"][0]["firstName"]);
                $("#editPersonnelLastName").val(result["data"]["personnel"][0]["lastName"]);
                $("#editPersonnelJobTitle").val(result["data"]["personnel"][0]["jobTitle"]);
                $("#editPersonnelEmailAddress").val(result["data"]["personnel"][0]["email"]);
                $("#editPersonnelDepartment").html("");
                $.each(result.data.department, function () {
                    $("#editPersonnelDepartment").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });
                $("#editPersonnelDepartment").val(result["data"]["personnel"][0]["departmentID"]);
            } else {
                $("#editPersonnelModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });
});

$("#editPersonnelForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    // AJAX call to save form data
    //console.log("Editing personnel with id " + $("#editPersonnelEmployeeID").val());
    $.ajax({
        url: "libs/php/updatePersonnel.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $("#editPersonnelEmployeeID").val(),
            firstName: $("#editPersonnelFirstName").val(),
            lastName: $("#editPersonnelLastName").val(),
            job: $("#editPersonnelJobTitle").val(),
            email: $("#editPersonnelEmailAddress").val(),
            departmentID: $("#editPersonnelDepartment").val()
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#editPersonnelModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().removeClass("bg-primary").addClass("bg-danger");
                $(e.currentTarget).parent().prev().children("h5").html("Update unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#editPersonnelModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children(".modal-header").removeClass("bg-danger").addClass("bg-primary");
    $(e.currentTarget).children().children().children().children("h5").html("Edit employee");
});

$("#editDepartmentsModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getDepartmentByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                // Update the hidden input with the employee id so that
                // it can be referenced when the form is submitted
                $("#editDepartmentsID").val(result["data"]["department"][0]["id"]);
                $("#editDepartmentsName").val(result["data"]["department"][0]["name"]);
                $("#editDepartmentsLocation").html("");
                $.each(result['data']['location'], function () {
                    $("#editDepartmentsLocation").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });
                $("#editDepartmentsLocation").val(result["data"]["department"][0]["locationID"]);
            } else {
                $("#editDepartmentsModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editDepartmentsModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });
});

$("#editDepartmentsForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    // AJAX call to save form data
    //console.log("Editing department with id " + $("#editDepartmentsID").val());
    $.ajax({
        url: "libs/php/updateDepartment.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $("#editDepartmentsID").val(),
            name: $("#editDepartmentsName").val(),
            locationID: $("#editDepartmentsLocation").val()
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#editDepartmentsModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().removeClass("bg-primary").addClass("bg-danger");
                $(e.currentTarget).parent().prev().children("h5").html("Update unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#editDepartmentsModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children(".modal-header").removeClass("bg-danger").addClass("bg-primary");
    $(e.currentTarget).children().children().children().children("h5").html("Edit departments");
});

$("#editLocationsModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getLocationByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                // Update the hidden input with the employee id so that
                // it can be referenced when the form is submitted
                $("#editLocationsID").val(result["data"][0]["id"]);
                $("#editLocationsName").val(result["data"][0]["name"]);
            } else {
                $("#editLocationsModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editLocationsModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });
});

$("#editLocationsForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    // AJAX call to save form data
    //console.log("Editing location with id " + $("#editLocationsID").val());
    $.ajax({
        url: "libs/php/updateLocation.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $("#editLocationsID").val(),
            name: $("#editLocationsName").val(),
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#editLocationsModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().removeClass("bg-primary").addClass("bg-danger");
                $(e.currentTarget).parent().prev().children("h5").html("Update unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#editLocationsModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children(".modal-header").removeClass("bg-danger").addClass("bg-primary");
    $(e.currentTarget).children().children().children().children("h5").html("Edit locations");
});

/***********************/
/*  Create Functions   */
/***********************/

// Personnel
$("#addPersonnelModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#addPersonnelDepartment").html("");
                $.each(result["data"], function () {
                    $("#addPersonnelDepartment").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#addPersonnelForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    //console.log("Creating new personnel");
    $.ajax({
        url: "libs/php/insertPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {
            firstName: $("#addPersonnelFirstName").val(),
            lastName: $("#addPersonnelLastName").val(),
            job: $("#addPersonnelJobTitle").val(),
            email: $("#addPersonnelEmailAddress").val(),
            departmentID: $("#addPersonnelDepartment").val()
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#addPersonnelModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().removeClass("bg-primary").addClass("bg-danger");
                $(e.currentTarget).parent().prev().children("h5").html("Create unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#addPersonnelModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children(".modal-header").removeClass("bg-danger").addClass("bg-primary");
    $(e.currentTarget).children().children().children().children("h5").html("Add employee");
});

// Departments
$("#addDepartmentsModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#addDepartmentsLocation").html("");
                $.each(result["data"], function () {
                    $("#addDepartmentsLocation").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#addDepartmentsForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    //console.log("Creating new department");
    $.ajax({
        url: "libs/php/insertDepartment.php",
        type: "POST",
        dataType: "json",
        data: {
            name: $("#addDepartmentsName").val(),
            locationID: $("#addDepartmentsLocation").val()
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#addDepartmentsModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().removeClass("bg-primary").addClass("bg-danger");
                $(e.currentTarget).parent().prev().children("h5").html("Create unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#addDepartmentsModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children(".modal-header").removeClass("bg-danger").addClass("bg-primary");
    $(e.currentTarget).children().children().children().children("h5").html("Add department");
});

// Locations
$("#addLocationsForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    //console.log("Creating new location");
    $.ajax({
        url: "libs/php/insertLocation.php",
        type: "POST",
        dataType: "json",
        data: {
            name: $("#addLocationsName").val()
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#addLocationsModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().removeClass("bg-primary").addClass("bg-danger");
                $(e.currentTarget).parent().prev().children("h5").html("Create unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#addLocationsModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children(".modal-header").removeClass("bg-danger").addClass("bg-primary");
    $(e.currentTarget).children().children().children().children("h5").html("Add location");
});

/***********************/
/*  Delete Functions   */
/***********************/

// Personnel
$("#deletePersonnelModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                // Update the hidden input with the employee id so that
                // it can be referenced when the form is submitted
                $("#deletePersonnelID").val(result["data"]["personnel"][0]["id"]);
                $("#deletePersonnelFirstName").val(result["data"]["personnel"][0]["firstName"]);
                $("#deletePersonnelLastName").val(result["data"]["personnel"][0]["lastName"]);
                $("#deletePersonnelJobTitle").val(result["data"]["personnel"][0]["jobTitle"]);
                $("#deletePersonnelEmailAddress").val(result["data"]["personnel"][0]["email"]);
                let dept = "";
                $.each(result["data"]["department"], function () {
                    if(this.id == result["data"]["personnel"][0]["departmentID"]) {
                        dept = this.name;
                    }
                });
                $("#deletePersonnelDepartment").val(dept);
            } else {
                $("#deletePersonnelModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#deletePersonnelModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });
});

$("#deletePersonnelForm").on("submit", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    //console.log("Deleting personnel with id " + $("#deletePersonnelID").val());
    $.ajax({
        url: "libs/php/deletePersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $("#deletePersonnelID").val()
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#deletePersonnelModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().children("h5").html("Delete unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#deletePersonnelModal").on("hide.bs.modal", function (e) {
    $(e.currentTarget).children().children().children().children("h5").html("Delete this employee?");
});

// Departments
$(document).on("click", ".deleteDepartmentBtn", function () {
    $.ajax({
      url: "libs/php/checkDepartmentUse.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
      },
      success: function (result) {
        if (result.status.code == 200) {
            //console.log(result["data"][0]);
          if (result.data[0].personnelCount == 0) {
            $("#deleteDepartmentsName").text(result.data[0].departmentName);
            $("#deleteDepartmentSubmit").attr("data-id", result["data"][0]["id"]);
            $("#deleteDepartmentsModal").modal("show");
          } else {
            $("#cantDeleteDeptName").text(result.data[0].departmentName);
            $("#personnelCount").text(result.data[0].personnelCount);
  
            $("#cantDeleteDepartmentsModal").modal("show");
          }
        } else {
          $("#exampleModal .modal-title").replaceWith("Error retrieving data");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#exampleModal .modal-title").replaceWith("Error retrieving data");
      }
    });
});

$("#deleteDepartmentSubmit").on("click", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    //console.log("Deleting department with id " + $("#deleteDepartmentsID").val());
    $.ajax({
        url: "libs/php/deleteDepartmentByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $("#deleteDepartmentSubmit").attr("data-id")
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#deleteDepartmentsModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().prevv().children("h5").html("Delete unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#deleteDepartmentsModal").on("hide.bs.modal", function (e) {
    $('#deleteDepartmentSubmit').prop('disabled', false);
    $(e.currentTarget).children().children().children().children("h5").html("Delete this department?");
});

// Location
$(document).on("click", ".deleteLocationBtn", function () {
    $.ajax({
      url: "libs/php/checkLocationUse.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
      },
      success: function (result) {
        if (result.status.code == 200) {
            //console.log(result["data"][0]);
          if (result.data[0].departmentCount == 0) {
            $("#deleteLocationsName").text(result.data[0].locationName);
            $("#deleteLocationsSubmit").attr("data-id", result["data"][0]["id"]);
            $("#deleteLocationsModal").modal("show");
          } else {
            $("#cantDeleteLocName").text(result.data[0].departmentName);
            $("#deptCount").text(result.data[0].departmentCount);
  
            $("#cantDeleteLocationsModal").modal("show");
          }
        } else {
          $("#exampleModal .modal-title").replaceWith("Error retrieving data");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#exampleModal .modal-title").replaceWith("Error retrieving data");
      }
    });
});

/*
$("#deleteLocationsModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getLocationByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#deleteLocationsID").val(result["data"][0]["id"]);
                $("#deleteLocationsName").val(result["data"][0]["name"]);
            } else {
                $("#deleteLocationsModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#deleteLocationsModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });

    $.ajax({
        url: "libs/php/getDepartmentByLocationID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            if(!result["data"].length == 0) {
                //console.log("Not empty, wait up.");   
                $('#deleteLocationsSubmit').prop('disabled', true);    
                $("#deleteLocationsModal .modal-title").html("Can't delete Location<br/>Departments depend on it");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#deleteLocationsModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });  
});*/

$("#deleteLocationsSubmit").on("click", function (e) {
    // Stop the default browser behviour
    e.preventDefault();

    //console.log("Deleting location with id " + $("#deleteLocationsID").val());
    $.ajax({
        url: "libs/php/deleteLocationByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $("#deleteLocationsSubmit").attr("data-id")
        },
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#deleteLocationsModal").modal("hide");
            } else {
                $(e.currentTarget).parent().prev().prev().children("h5").html("Delete unsuccessful");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#deleteLocationsModal").on("hide.bs.modal", function (e) {
    $('#deleteLocationsSubmit').prop('disabled', false);
    $(e.currentTarget).children().children().children().children("h5").html("Delete this location?");
});

/***********************/
/*  Filter Functions   */
/***********************/

$("#filterModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#filterDepartment").html("");
                $("#filterDepartment").append($("<option>", { value: -1, text: "No Filter"}));
                $.each(result["data"], function () {
                    $("#filterDepartment").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });

    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        data: {},
        success: function (result) {
            if (result["status"]["code"] == 200) {
                $("#filterLocation").html("");
                $("#filterLocation").append($("<option>", { value: -1, text: "No Filter"}));
                $.each(result["data"], function () {
                    $("#filterLocation").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
        }
    });
});

$("#filterForm").on("change", function (e) {
    e.preventDefault();
    $('#searchInp').val('');

    if($("#filterDepartment").val() == -1 && $("#filterLocation").val() == -1) {
        getAllPersonnel();
    } else if ($("#filterDepartment").val() != -1 && $("#filterLocation").val() == -1) {
        $.ajax({
            url: "libs/php/getPersonnelByDepartmentID.php",
            type: "POST",
            dataType: "json",
            data: {
                id: $("#filterDepartment").val(),
                filter: "departmentID"
            },
            success: function (result) {
                if (result["status"]["code"] == 200) {
                    updatePersonnelTable(result['data']);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(errorThrown);
            }
        });
    } else if ($("#filterDepartment").val() == -1 && $("#filterLocation").val() != -1) {
        $.ajax({
            url: "libs/php/getPersonnelByLocationID.php",
            type: "POST",
            dataType: "json",
            data: {
                id: $("#filterLocation").val()
            },
            success: function (result) {
                if (result["status"]["code"] == 200) {
                    updatePersonnelTable(result['data']);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(errorThrown);
            }
        });
    } 
    $("#filterModal").modal("hide");
});