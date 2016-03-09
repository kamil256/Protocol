function Page(name)
{
    this.load = function()
    {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(e)
        {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200)
                document.getElementById(name).innerHTML = request.responseText;
        };
        request.open("GET", "./data/" + name + ".txt?" + new Date().getDate());
        request.send();
    };
}