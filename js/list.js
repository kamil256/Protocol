function List(inputId, tbodyId, objectsArray, tag, infoArgs)
{
    var input = document.getElementById(inputId);
    var tbody = document.getElementById(tbodyId);
    var items = [];
    var index = 0;
    var LIMIT = 2;
    
    var events =
    {
        submit: function() { throw inputId + " element's submit event not handled"; }
    };
    
    this.addEventListener = function(eventName, eventFunction)
    {
        events[eventName] = eventFunction;
    };
    
    input.onkeydown = function(e)
    {
        switch (e.which || e.keyCode)
        {
            case 13:
                e.preventDefault();
                if (items.length != 0)
                {
                    events["submit"](items[index]);
                    clear(true);
                }
                break;
            case 27:
                e.preventDefault();
                clear(true);
                break;
            case 38:
                e.preventDefault();
                if (index > 0)
                {
                    index--;
                    selectItem(index);
                }
                break;
            case 40:
                e.preventDefault();
                if (index < items.length - 1)
                {
                    index++;
                    selectItem(index);
                }
        }
    };
    
    input.onkeyup = function(e)
    {
        var key = e.which || e.keyCode;
        if ((key != 13) && (key != 27) && (key != 38) && (key != 40))
        {
            clear(false);
            if (input.value != "")
                fill();
        }        
    };
    
    function selectItem(index)
    {
        var trElements = tbody.getElementsByTagName("tr");
        for (var i = 0; i < trElements.length; i++)
        {
            if (i === index)
                trElements[i].style.backgroundColor = "#aaa";
            else
                trElements[i].style.backgroundColor = "";
        }
    }
    
    function clear(fullClear)
    {  
        items = [];
        index = 0;
        tbody.innerHTML = "";
        tbody.nextSibling.innerHTML = "";
        tbody.style.display = "none";
        tbody.nextSibling.style.display = "none";
        if (fullClear)
            input.value = "";
    }
    
    function fill()
    {
        var more = 0;
        for (var i = 0; i < objectsArray.length; i++)
        {
            for (var x in objectsArray[i])
            {
                if (objectsArray[i][x].toUpperCase().indexOf(input.value.toUpperCase()) != -1)
                {
                    if (items.length < LIMIT)
                        items.push(objectsArray[i]);
                    else
                        more++;
                    break;
                }
            }
        }
        
        fillTable(more);
        
        if (items.length != 0)
        {
            var trElements = tbody.getElementsByTagName("tr");
            for (var i = 0; i < trElements.length; i++)
            {
                trElements[i].onclick = function(e)
                {
                    events["submit"](items[e.target.parentNode.dataset["id"]]);
                    clear(true);
                    input.focus();
                }
            }
            trElements[0].style.backgroundColor = "#aaa";
            tbody.style.display = "table-row-group";
        }
    }
    
    function fillTable(more)
    {
        var innerHTML = "";
        for (var i = 0; i < items.length; i++)
        {
            innerHTML += "<tr data-id='" + i + "'>";
            for (var j = 0; j < infoArgs.length; j++)
                innerHTML += "<td>" + items[i][infoArgs[j]] + "</td>";
            innerHTML += "</tr>";
        }
        tbody.innerHTML = innerHTML;
        if (more > 0)
        {
            tbody.nextSibling.innerHTML = "<tr><td colspan='3'>" + more + " more results...</td></tr>";
            tbody.nextSibling.style.display = "table-footer-group";
        }
    }
};