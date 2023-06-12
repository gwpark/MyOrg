/**
 * Created by MS on 2023-04-28.
 */

({

    fetchAccounts : function(component, event, offSetCount) {
        var action = component.get("c.fetchAccts");
        action.setParams({
            "intOffSet" : offSetCount
        });

        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
                var records = response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = '/'+record.Id;
                });
                var currentData = component.get('v.acctList');
                component.set("v.acctList", currentData.concat(records));
            }
            event.getSource().set("v.isLoading", false);
        });
        $A.enqueueAction(action);

    }
})