/**
 * Created by MS on 2023-04-27.
 */

({
    fnInit:function(cmp, event, helper){

        //cmp.set("v.bIsLoading", true);

        //Contacts
        var colTab1 = [
            {label:'Name', fieldName:'Name', type: 'text' },
            {label:'FirstName', fieldName:'FirstName', type: 'text' }
        ]
        cmp.set("v.listContactCols", colTab1);

        var colTab2 = [
            {label:'Name', fieldName:'Name', type: 'text' },
            {label:'Phone', fieldName:'Phone', type: 'text' }
        ]
        cmp.set("v.listAccountCols", colTab2);

        var recordId = cmp.get("v.recordId");
        helper.getContacts(cmp, recordId);
    },

    fnLoadMoreData:function(cmp, event, helper){
        console.log('===============fnLoadMoreData================');
        let auraId = event.getSource().getLocalId();
        let mapAllData = cmp.get("v.mapAllData");
        let loadMoreRows = cmp.get("v.loadMoreRows");
        console.log('auraId: ' + auraId);

        let allData = mapAllData[auraId],
            data = cmp.get("v."+auraId),
            targetData;

        let currentLen = data.length,
            targetLen = currentLen + loadMoreRows,
            totalLen = allData.length;

        if(totalLen > currentLen){
            targetData = allData.slice(0, targetLen);
            cmp.set("v."+auraId, targetData);
        }

    },


});