/**
 * Created by MS on 2023-04-04.
 */

public with sharing class LWCLazyLoadingCtrl {
    @AuraEnabled
    public static List<Account> getAccountData() {
        return [SELECT Id, Name, Type, Phone, CreatedDate FROM Account LIMIT 5000];
    }
}