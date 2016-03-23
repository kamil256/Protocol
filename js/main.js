window.onload = function()
{
    new Page("page_1").load();
    new Page("page_2").load();
    new Page("page_3").load();

    var requestDepartments = new XMLHttpRequest();
    var departments;
    requestDepartments.onreadystatechange = function(e)
    {
        if (requestDepartments.readyState === XMLHttpRequest.DONE && requestDepartments.status === 200)
            departments = requestDepartments.responseXML;
    };
    
    requestDepartments.open("GET", "./data/departments.xml?" + new Date().getDate());
    requestDepartments.send();

    var requestEmployees = new XMLHttpRequest();
    requestEmployees.onreadystatechange = function(e)
    {
        if (requestEmployees.readyState === XMLHttpRequest.DONE && requestEmployees.status === 200)
        {
            var employees = new List("inp_emp", "emp_list", requestEmployees.responseXML, "person", ["id", "name", "department"]);
            employees.addEventListener("submit", function(e) { fillEmployee(e); });
        }
    };
    requestEmployees.open("GET", "./data/persons.xml?" + new Date().getDate());
    requestEmployees.send();
    
    function clearEmployee()
    {
        document.getElementById("panel_emp_name").innerHTML = "---";
        document.getElementById("panel_emp_id").innerHTML = "---";
        document.getElementById("panel_emp_position").innerHTML = "---";
        document.getElementById("panel_emp_team").innerHTML = "---";
        document.getElementById("panel_emp_section").innerHTML = "---";
        document.getElementById("panel_emp_part").innerHTML = "---";
        document.getElementById("panel_emp_mail").innerHTML = "---";
        document.getElementById("panel_emp_tel").innerHTML = "---";

        document.getElementById("page_emp_name").innerHTML = "";
        document.getElementById("page_emp_id").innerHTML = "";
        document.getElementById("page_emp_position").innerHTML = "";
        document.getElementById("page_emp_department").innerHTML = "";
        document.getElementById("page_emp_mail").innerHTML = "";
        document.getElementById("page_emp_tel").innerHTML = "";
    }
    
    function fillEmployee(employee)
    {
        var part = departments.getElementById(employee.department);
        var section = part.parentElement;
        var team = section.parentElement;
        part = part.getAttribute("name");
        section = section.getAttribute("name");
        team = team.getAttribute("name");

        document.getElementById("panel_emp_name").innerHTML = employee.name;
        document.getElementById("panel_emp_id").innerHTML = employee.id;
        document.getElementById("panel_emp_position").innerHTML = employee.position;
        document.getElementById("panel_emp_team").innerHTML = team;
        document.getElementById("panel_emp_section").innerHTML = section;
        document.getElementById("panel_emp_part").innerHTML = part;
        document.getElementById("panel_emp_mail").innerHTML = employee.mail;
        document.getElementById("panel_emp_tel").innerHTML = employee.tel;

        document.getElementById("page_emp_name").innerHTML = employee.name;
        document.getElementById("page_emp_id").innerHTML = employee.id;
        document.getElementById("page_emp_position").innerHTML = employee.position;
        document.getElementById("page_emp_department").innerHTML = employee.position === "Team Leader" ? team : (employee.position === "Section Leader" ? section : part);
        document.getElementById("page_emp_mail").innerHTML = employee.mail;
        document.getElementById("page_emp_tel").innerHTML = employee.tel;
    }
    
    var requestDevices = new XMLHttpRequest();
    requestDevices.onreadystatechange = function(e)
    {
        if (requestDevices.readyState === XMLHttpRequest.DONE && requestDevices.status === 200)
        {
            var devices = new List("inp_dev", "dev_list", requestDevices.responseXML, "device", ["model", "sn", "it"]);
            devices.addEventListener("submit", function(e) { fillDevice(e); });
        }
    };
    
    requestDevices.open("GET", "./data/devices.xml?" + new Date().getDate());
    requestDevices.send();
    
    function clearDevice()
    {
        document.getElementById("dev_model").innerHTML = "";
        document.getElementById("dev_sn").innerHTML = "";
        document.getElementById("dev_it").innerHTML = "";
        document.getElementById("dev_wrof").innerHTML = "";
        document.getElementById("dev_ssd").innerHTML = "";
        document.getElementById("dev_hdd").innerHTML = "";
    }
    
    function fillDevice(device)
    {
        document.getElementById("dev_model").innerHTML = device.model;
        document.getElementById("dev_sn").innerHTML = device.sn;
        document.getElementById("dev_it").innerHTML = device.it;
        document.getElementById("dev_wrof").innerHTML = device.wrof;
        document.getElementById("dev_ssd").innerHTML = device.ssd;
        document.getElementById("dev_hdd").innerHTML = device.hdd;
    }
};