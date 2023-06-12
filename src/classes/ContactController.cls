/**
 * Created by MS on 2023-03-17.
 */

public with sharing class ContactController {
    @AuraEnabled
    public static Contact getContact() {
        return [select Id, FirstName, LastName, Name from Contact Limit 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
                SELECT Id, FirstName, LastName, Name, Title, Phone, Email
                FROM Contact
                LIMIT 3
        ];
    }
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getContactListForAccount(String accId){
        Map<String, Object> mapResult = new Map<String, Object>();
        List<Contact> listContact = [
                SELECT Id, FirstName, LastName, Name, Title, Phone, Email
                FROM  Contact
//                WHERE AccountId =:accId
        ];

        List<Account> ListAccount = [
                SELECT Name, Phone
                FROM Account
                WHERE Id =: accId
        ];

        mapResult.put('Contacts', listContact);
        mapResult.put('Accounts', listAccount);

        return mapResult;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
                SELECT Id, Name, Title, Phone, Email
                FROM Contact
                WHERE Name LIKE :key
                LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Contact getSingleContact(){
        return [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT 1];
    }
}