/**
 * Created by MS on 2023-03-28.
 */

import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];
export default class ApexDatatableExample extends LightningElement {
    error;
    columns = columns;
    contacts;

    @wire(getContactList)
    wiredContacts({error, data}){
        if(data){
            this.contacts = data;
            this.error = undefined
        }else if(error){
            this.error = error;
            this.contacts = undefined;
        }
    }

    getSelectedName(event){
        let selectedRows = event.detail.selectedRows;
        let rowsData = [];

        if(selectedRows.length > 0){
            selectedRows.forEach(selected => {
                let rowData = {};
                rowData.FirstName = selected.FirstName;
                rowData.LastName = selected.LastName;

                rowsData.push(rowData);
            });
        }
        alert('rowsData.length: ' + rowsData.length);
     }
}