/**
 * Created by MS on 2023-03-21.
 */

({
	handleClick : function (cmp, event, helper) {
        var name = event.getParam('Name');
        var city = event.getParam('City');
        cmp.set("v.name", name);
        cmp.set("v.city", city);

        //fire toast message
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "mode" : 'sticky',
            "title" : "Success",
            "message" : 'call from LWC component',
            "type" : "success"
        });
        toastEvent.fire();
    }
})