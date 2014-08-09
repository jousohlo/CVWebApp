/* Retrieve profile data using LinkedIn API. */
function retrieveProfile(linkedinId) {
    //Set default value for param linkedinId
    if (typeof linkedinId != "string") {
        linkedinId = "me";
    }
    var fields = ["firstName","lastName","headline","id","pictureUrl","summary","threeCurrentPositions","threePastPositions","skills"];

    IN.API.Profile(linkedinId).fields(fields).result(function(profile) {
           
           //$("#headline").text(JSON.stringify(profile));
           loadProfileToDoc(profile.values[0]); 
       });
    loadConnections(linkedinId); 
}
/* On linkedin load event retrieve profile data.*/
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", retrieveProfile);
}
/*Load profile to html document.*/
function loadProfileToDoc(profileObj) {
    $("#name").text(profileObj.firstName +" "  + profileObj.lastName);
    $("#headline").text(profileObj.headline);
    $("#mypicture").attr("src", profileObj.pictureUrl);  
    $("#summary").text(profileObj.summary);
    addPositions(profileObj.threeCurrentPositions, "current");
    addPositions(profileObj.threePastPositions, "past");
    addSkills(profileObj.skills);
    //$("#skills").text(JSON.stringify(profileObj.skills));
}
/* Add positions to html document. */
function addPositions(obj, id) {
    for (i = 0; i < obj.values.length; i++) {
        $("#" + id).append("<li>" + obj.values[i].title + " at  " + obj.values[i].company.name + "</li>");
    } 
}
/* Add skills to html document.*/
function addSkills(obj) {
    for (i = 0; i < obj.values.length; i++) {
        $("#skills").append(obj.values[i].skill.name + " ");
    }  
} 
/* Load Connections to html document WIP-there seems to be a bug in the API. */
function loadConnections(linkedInId) {
    //Set default value for param linkedinId
    if (typeof linkedinId != "string") {
        linkedinId = "me";
    }
    IN.API.Connections(linkedinId).result(function(connections) {    
            $("#connections").text(JSON.stringify(connections.values[0]));
        });

}
