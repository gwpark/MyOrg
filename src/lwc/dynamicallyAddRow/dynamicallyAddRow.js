/**
 * Created by MS on 2023-03-31.
 */

import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import saveAccounts from '@salesforce/apex/LWCExampleController.saveAccounts';

export default class DynamicallyAddRow extends LightningElement {
    industryOptions = [{ value: '-None-', label: '' }];
    filterList = [];
    keyIndex = 0;
    isSpinner = false;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountinfo;

    @wire(getPicklistValues, { recordTypeId: '$accountinfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD })
    industryValues({ data, error }) {
        if (data) {
            data.values.forEach(val => {
                this.industryOptions = [...this.industryOptions, { value: val.value, label: val.label }];
            });
        }
        else if (error) {
            this.processErrorMessage(error);
        }
    }

    connectedCallback() {
        this.handleAddRow();
    }

    handleChange(event) {
        if (event.target.name == 'accName') {
            this.filterList[event.currentTarget.dataset.index].Name = event.target.value;
        }
        else if (event.target.name == 'industry') {
            this.filterList[event.currentTarget.dataset.index].Industry = event.target.value;
        }
        else if (event.target.name == 'accEmail') {
            this.filterList[event.currentTarget.dataset.index].Email = event.target.value;
        }
        else if (event.target.name == 'accPhone') {
            this.filterList[event.currentTarget.dataset.index].Phone = event.target.value;
        }
    }

    handleAddRow() {
        let objRow = {
            Name: '',
            Industry: '',
            Phone: '',
            Email: '',
            id: ++this.keyIndex
        }

        this.filterList = [...this.filterList, Object.create(objRow)];
    }

    handleRemoveRow(event) {
        this.filterList = this.filterList.filter((ele) => {
            return parseInt(ele.id) !== parseInt(event.currentTarget.dataset.index);
        });

        if (this.filterList.length == 0) {
            this.handleAddRow();
        }
    }

    saveRows() {
        console.log('this.filterList => ', this.filterList);
        this.isSpinner = true;

        saveAccounts({ lstAccs: this.filterList }).then(result => {
            this.isSpinner = false;
            this.showToastMessage('success', 'Accounts Saved Successfully!!', 'Success');
            this.filterList = [];
            if (this.filterList.length == 0) {
                this.handleAddRow();
            }
            console.log('result ==> ', result);
        }).catch(error => {
            this.processErrorMessage(error);
            this.isSpinner = false;
        })
    }

    processErrorMessage(message) {
        let errorMsg = '';
        if (message) {
            if (message.body) {
                if (Array.isArray(message.body)) {
                    errorMsg = message.body.map(e => e.message).join(', ');
                } else if (typeof message.body.message === 'string') {
                    errorMsg = message.body.message;
                }
            }
            else {
                errorMsg = message;
            }
        }
        this.showToastMessage('error', errorMsg, 'Error!');
    }

    showToastMessage(variant, message, title) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}