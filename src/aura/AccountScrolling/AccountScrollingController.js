/**
 * Created by MS on 2023-04-28.
 */

({
    init : function(component, event, helper) {

        component.set('v.mycolumns', [
            {label: 'Account Name', fieldName: 'linkName', type: 'url',
             typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Type', fieldName: 'Type', type: 'Text'}
        ]);
        helper.fetchAccounts(component, event, 0);
    },

    loadMoreData : function(component, event, helper) {

        event.getSource().set("v.isLoading", true);
        component.set('v.loadMoreStatus', 'Loading');
        var l = component.get('v.acctList').length;
        helper.fetchAccounts(component, event, l);
    }
})