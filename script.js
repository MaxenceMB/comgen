const comLength = 60;

function generateFunction() {
    var resultField = document.getElementById("result-field");
    var title = document.getElementById("func-title").value;
    var desc  = document.getElementById("func-desc").value;
    var result = "";

    result += addTopLine(comLength, title, ' ');
    result += addDesc(comLength, desc);
    result += addBotLine(comLength, ' ');

    resultField.value = result;
}

function addTopLine(size, title, filler) {
    var result = "/*";
    var titleSize = title.length;

    var firstPart = (size / 2) - ((titleSize / 2) + 1) - 2;
    var lastPart = (titleSize % 2 == 0) ? (size / 2) - ((titleSize + 1) / 2) - 3 : ((size - 1) / 2) - (titleSize / 2) - 3;

    for(i = 0; i < firstPart; i++) { result += filler; };
    result += " " + title + " ";
    for(i = 0; i < lastPart; i++) { result += filler; } result += "*\\\n";
    result += "**\n";

    return result;
}

function addDesc(size, desc) {
    lineSize = size - 3;

    // If the description goes on more than one line
    if(desc.length > lineSize) {
        newDesc = "";
        lastSpace = count = lineStart = 0;

        // For every character
        for(i = 0; i < desc.length; i++) {

            // If it's a whitespace, we save its position for later
            if(/\s/.test(desc.charAt(i))) {
                alert(i);
                lastSpace = i;
            }

            // If we cross the character limit
            if(i - count >= lineSize) {
                newDesc += desc.substring(lineStart, lastSpace) + "\n** ";
                lineStart = lastSpace+1;
                count = i;
            }
        }

        newDesc += desc.substring(lineStart, desc.length);
        return "** " + newDesc + '\n';
    } else {
        return "** " + desc + '\n';
    }
}

function addBotLine(size, filler) {
    var result = "**\n\\*";
    for(i = 0; i < size-4; i++) { result += filler; } result += "*/\n";
    return result;
}