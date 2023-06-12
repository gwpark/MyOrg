/**
 * Created by MS on 2023-03-31.
 */

public with sharing class DataController {
    @AuraEnabled (cacheable=true)
    public static List<Account> retrieveAccounts(){
        return [SELECT Id, Name, Type, BillingCountry
        FROM Account
        LIMIT 3];
    }
}