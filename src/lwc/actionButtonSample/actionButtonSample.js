/**
 * Created by MS on 2023-03-30.
 */

import { LightningElement, api } from 'lwc';

export default class SapEquipmentLookup extends LightningElement {
  @api recordId

  closeQuickAction() {
        this.dispatchEvent(new CustomEvent('close'));
  }
}