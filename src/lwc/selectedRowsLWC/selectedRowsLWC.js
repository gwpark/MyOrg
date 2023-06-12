/**
 * Created by MS on 2023-03-31.
 */
import { LightningElement, track, wire } from 'lwc';
import retrieveAccounts from '@salesforce/apex/DataController.retrieveAccounts';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'BillingCountry', fieldName: 'BillingCountry'},
];

export default class SelectedRowsLWC extends LightningElement {
    @track data;
    @track columns = columns;
    @track error;

    @wire(retrieveAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    getSelectedRec(event) {
      var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
      if(selectedRecords.length > 0){
          console.log('selectedRecords are ', selectedRecords);

          let ids = '';
          selectedRecords.forEach(currentItem => {
              ids = ids + ',' + currentItem.Id;
          });
          this.selectedIds = ids.replace(/^,/, '');
          this.lstSelectedRecords = selectedRecords;
          alert(this.selectedIds);
      }
    }
}