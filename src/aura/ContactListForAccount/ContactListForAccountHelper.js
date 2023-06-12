/**
 * Created by MS on 2023-04-27.
 */

({
    getContacts : function(cmp, recordId){
        var action = cmp.get("c.getContactListForAccount");
            action.setParams({
            "accId" : recordId
            });

        action.setCallback(this, function(response){
            var state = response.getState();

            if(state ==="SUCCESS"){
                var result = response.getReturnValue();
                var listContact = result.Contacts;
                var listAccount = result.Accounts;
                var mapAllData = {
                    'listContact' : listContact,
                    'listAccount' : listAccount
                };

                cmp.set("v.listContact", listContact);
                cmp.set("v.listAccount", listAccount);
                cmp.set("v.mapAllData", mapAllData);
                cmp.set("v.isDataLoading", false);
            }
            var contactLen = (listContact) ? listContact.length : 0;
            var accountLen = (listAccount) ? listAccount.length : 0;

            this.gfnTabLabelRename(cmp, contactLen, accountLen);
        });
        $A.enqueueAction(action);
    },

    // Tab Label Name Dynamic Setting
    gfnTabLabelRename : function(cmp, contactLen, accountLen){
        if(!cmp.find("contacts")) return;
        var tabLabel = cmp.find("contacts").get("v.label");
        tabLabel[0].set("v.value", "Contacts("+contactLen+")");
        tabLabel = cmp.find("accounts").get("v.label");
        tabLabel[0].set("v.value", "Accounts("+accountLen+")");
    },

});