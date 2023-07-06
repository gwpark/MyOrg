/**
 * Created by MS on 2023-03-21.
 */

import { LightningElement, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class LifeCycle extends LightningElement {
    // The @track Decorator Is No Longer Required for Lightning Web Components
    @track contacts;
    @track error;

   connectedCallback(){
        getContactList()
        .then(result => {
            this.contacts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
   }
}