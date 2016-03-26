function getDate()
{
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "." + (month < 10 ? "0" + month : month) + "." + year;
}

var employees = [];
var devices = [];

function xmlToObjectsArray(xmlPath, tag, objectsArray)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(e)
    {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200)
        {
            var elements = request.responseXML.getElementsByTagName(tag);
            for (var i = 0; i < elements.length; i++)
            {
                var elements2 = elements[i].getElementsByTagName("*");
                var obj = {};
                for (var j = 0; j < elements2.length; j++)
                    obj[elements2[j].nodeName] = elements2[j].childNodes[0].nodeValue;
                objectsArray.push(obj);
            }
        }
    };
    request.open("GET", xmlPath + new Date().getDate());
    request.send();
}

function fillElementsByClassName(className, content)
{
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++)
        elements[i].innerHTML = content;
}

function clearEmployee()
{
    fillElementsByClassName("emp_name", "---");
    fillElementsByClassName("emp_id", "---");
    fillElementsByClassName("emp_position", "---");
    fillElementsByClassName("emp_team", "---");
    fillElementsByClassName("emp_section", "---");
    fillElementsByClassName("emp_part", "---");
    fillElementsByClassName("emp_department", "---");
    fillElementsByClassName("emp_mail", "---");
    fillElementsByClassName("emp_tel", "---");
}

function fillEmployee(employee)
{
    fillElementsByClassName("emp_name", employee.name);
    fillElementsByClassName("emp_id", employee.id);
    fillElementsByClassName("emp_position", employee.position);
    fillElementsByClassName("emp_team", employee.team);
    fillElementsByClassName("emp_section", employee.section);
    fillElementsByClassName("emp_part", employee.part);
    fillElementsByClassName("emp_department", employee.department);
    fillElementsByClassName("emp_mail", employee.mail);
    fillElementsByClassName("emp_tel", employee.tel);
}

function clearDevice()
{
    fillElementsByClassName("dev_model", "---");
    fillElementsByClassName("dev_sn", "---");
    fillElementsByClassName("dev_it", "---");
    fillElementsByClassName("dev_wrof", "---");
    fillElementsByClassName("dev_ssd", "---");
    fillElementsByClassName("dev_hdd", "---");
    fillElementsByClassName("dev_lan_mac", "---");
    fillElementsByClassName("wifi_wifi_mac", "---");
}

function fillDevice(device)
{
    fillElementsByClassName("dev_model", device.model_id);
    fillElementsByClassName("dev_sn", device.sn);
    fillElementsByClassName("dev_it", device.it);
    fillElementsByClassName("dev_wrof", device.wrof);
    fillElementsByClassName("dev_ssd", device.ssd);
    fillElementsByClassName("dev_hdd", device.hdd);
    fillElementsByClassName("dev_lan_mac", device.lan_mac);
    fillElementsByClassName("dev_wifi_mac", device.wifi_mac);
}

window.onload = function()
{
    xmlToObjectsArray("./data/persons.xml?" + new Date().getDate(), "person", employees);
    xmlToObjectsArray("./data/devices.xml?" + new Date().getDate(), "device", devices);

    document.getElementById("cross_emp").onclick = clearEmployee;
    document.getElementById("cross_dev").onclick = clearDevice;

    new Page("page_1").load();
    new Page("page_2").load();
    new Page("page_3").load();
    var dateInterval = window.setInterval(
        function() 
        { 
            var dateSpans = document.getElementsByClassName("date");
            if (dateSpans.length > 0)
            {
                for (var i = 0; i < dateSpans.length; i++)
                    dateSpans[i].innerHTML = getDate(); 
                clearInterval(dateInterval);
            }
        }, 1
    );

    var checkboxes = document.getElementsByClassName("accessories");
    for (var i = 0; i < checkboxes.length; i++)
        checkboxes[i].onchange = function(e) 
        {
            var accessories = "";
            for (var i = 0; i < checkboxes.length; i++)
                if (checkboxes[i].checked)
                    accessories += (accessories.length === 0) ? checkboxes[i].id : ", " + checkboxes[i].id;
            if (accessories.length === 0)
                accessories = "---";
            document.getElementById("accessories").innerHTML = accessories;
        };

    new List("inp_emp", "emp_list", employees, "person", ["id", "name", "department"]).addEventListener("submit", function(e) { fillEmployee(e); });
    new List("inp_dev", "dev_list", devices, "device", ["model_id", "sn", "it"]).addEventListener("submit", function(e) { fillDevice(e); });
};