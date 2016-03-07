window.onload = function()
{
    new Page("page_1").load();
    new Page("page_2").load();
    new Page("page_3").load();
    
    var requestEmployees = new XMLHttpRequest();
    
    requestEmployees.onreadystatechange = function(e)
    {
        if (requestEmployees.readyState == XMLHttpRequest.DONE && requestEmployees.status == 200)
        {
            var employees = new List("inp_emp", "emp_list", requestEmployees.responseXML, "person", ["id", "name", "department"]);
            employees.addEventListener("submit", function(e) { fillEmployee(e); });
        }
    };
    requestEmployees.open("GET", "./data/persons.xml?" + new Date().getDate());
    requestEmployees.send();
    
    function clearEmployee()
    {
        document.getElementById("emp_id").innerHTML = "";
        document.getElementById("emp_name").innerHTML = "";
        document.getElementById("emp_department").innerHTML = "";
        document.getElementById("emp_position").innerHTML = "";
        document.getElementById("emp_mail").innerHTML = "";
        document.getElementById("emp_tel").innerHTML = "";
    }
    
    function fillEmployee(employee)
    {
        document.getElementById("emp_id").innerHTML = employee.id;
        document.getElementById("emp_name").innerHTML = employee.name;
        document.getElementById("emp_department").innerHTML = employee.department;
        document.getElementById("emp_position").innerHTML = employee.position;
        document.getElementById("emp_mail").innerHTML = employee.mail;
        document.getElementById("emp_tel").innerHTML = employee.tel;
    }
    
    var requestDevices = new XMLHttpRequest();
    
    requestDevices.onreadystatechange = function(e)
    {
        if (requestDevices.readyState == XMLHttpRequest.DONE && requestDevices.status == 200)
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