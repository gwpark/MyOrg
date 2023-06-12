/**
 * Created by MS on 2023-04-04.
 */

public with sharing class TestController {
    public Account objAccount {get;set;}

    public List<account> accountList{get;set;}

    public List<contact> contactList{get;set;}

    public TestController (ApexPages.StandardController stdController){

        accountList = [select Name,Id,AccountNumber,Industry,Phone from Account LIMIT 10];
        contactList = [SELECT id,Name, LastName, Account.Name, Email FROM Contact WHERE Email != '' AND Account.Name != '' LIMIT 5];
    }

    public Pagereference exportAll(){

        return new Pagereference('/apex/ExportAll');
    }
}