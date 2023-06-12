/**
 * Created by MS on 2023-05-03.
 */

({
    openSubtab: function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openSubtab({
            pageReference: {
                "type": "standard__component",
                "attributes": {
                    "componentName": "c__greetings"
                },
                "state": {
                    "uid": "1",
                    "c__name": component.get("v.myName")
                }
            }
        }).then(function(tabId) {
            console.log("The new subtab ID is:" + tabId);
        }).catch(function(error) {
            console.log("error");
        });
    }
})