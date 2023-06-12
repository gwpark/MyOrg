/**
 * Created by MS on 2023-03-30.
 */

({
  closeQA : function(component, event, helper) {
    // Record Id 값이 존재하지 않음
    //console.log('Record Id:  '+ component.get('v.recordId').value);
    $A.get("e.force:closeQuickAction").fire();
  }
})