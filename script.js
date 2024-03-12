const comLength = 75;
var argCount = 0;

function generateFunction() {
    var resultField = document.getElementById("result-field");
    var title = document.getElementById("func-title").value;
    var desc  = document.getElementById("func-desc").value;
    var result = "";

    result += addTopLine(comLength, title, ' ');
    result += addEmptyLine();
    result += addDesc(comLength, desc, 0);
    result += addEmptyLine();
    result += addArguments();
    result += addEmptyLine();
    result += addBotLine(comLength, ' ');

    resultField.value = result;
}

function addEmptyLine() {
    return "**\n";
}

function addTopLine(size, title, filler) {
    var result = "/*";
    var titleSize = title.length;

    var firstPart = (size / 2) - ((titleSize / 2) + 1) - 2;
    var lastPart = (titleSize % 2 == 0) ? (size / 2) - ((titleSize + 1) / 2) - 3 : ((size - 1) / 2) - (titleSize / 2) - 3;

    for(i = 0; i < firstPart; i++) { result += filler; };
    result += " " + title + " ";
    for(i = 0; i < lastPart; i++) { result += filler; } result += "*\\\n";

    return result;
}

function addDesc(size, desc, tab) {
    lineSize = size - 3; 
    return "** " + breakWord(lineSize, desc, tab) + '\n';
}

function breakWord(size, text, tab) {
    // If the description goes on more than one line
    if(text.length > size - tab) {
        newText = "";
        lastSpace = count = lineStart = 0;

        // For every character
        for(i = 0; i < text.length; i++) {

            // If it's a whitespace, we save its position for later
            if(/\s/.test(text.charAt(i))) {
                lastSpace = i;
            }

            // If we cross the character limit
            if(i - lineStart >= size) {
                newText += text.substring(lineStart, lastSpace) + "\n** ";
                for(j = 0; j < tab; j++) { newText += " "; };
                lineStart = lastSpace+1;
            }
        }

        newText += text.substring(lineStart, text.length);
        return newText;
    } else {
        return text;
    }
}

function addArguments() {
    var args = document.getElementsByClassName("func-arg-form");
    var argsarray = [];
    for(i = 0; i < args.length; i++) {
        type = args[i].querySelector("#func-arg-type").value;
        name = args[i].querySelector("#func-arg-name").value;
        desc = args[i].querySelector("#func-arg-desc").value;

        arg = {"type": type, "name": name, "desc": desc};
        argsarray[i] = arg;
    }

    infoLength = 0;
    for(j = 0; j < argsarray.length; j++) {
        length = argsarray[j]["type"].length + argsarray[j]["name"].length + 1;
        if(infoLength < length) infoLength = length;
    }

    argsLines = "** Arguments:\n";
    for(k = 0; k < argsarray.length; k++) {
        length = argsarray[k]["type"].length + argsarray[k]["name"].length + 1;
        spaces = infoLength - length;

        argsLines += "** - " + argsarray[k]["type"] + " " + argsarray[k]["name"];
        for(l = 0; l < spaces; l++) { argsLines += " "; }
        argsLines += " : " + breakWord(comLength-(infoLength+8), argsarray[k]["desc"], infoLength+5) + "\n";
    }

    return argsLines;
}

function addBotLine(size, filler) {
    var result = "\\*";
    for(i = 0; i < size-4; i++) { result += filler; } result += "*/\n";
    return result;
}

function addArgumentForm() {
    var arg = document.createElement('div');
    arg.setAttribute("data-arg", argCount)
    arg.className = "func-arg-form"
    arg.innerHTML = `<label for = "func-arg-type">Type</label>`
    +               `<input type = "text" id = "func-arg-type" name = "type" value = "int">`
                    
    +               `<label for = "func-arg-name">Name</label>`
    +               `<input type = "text" id = "func-arg-name" name = "name" value = "id">`

    +               `<label for = "func-arg-desc">Description</label>`
    +               `<textarea id = "func-arg-desc" name = "desc">The id of the current object</textarea>`

    +               `<button onclick = "removeArgumentForm(` + argCount + `)">X</button>`
    +           `</div>`;

    document.getElementById("func-args").append(arg);
    argCount++;
}

function removeArgumentForm(id) {
    arg = document.querySelectorAll("[data-arg = '" + id + "']")[0].remove();
}