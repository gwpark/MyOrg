/**
 * Created by MS on 2023-03-29.
 */

public with sharing class LWCDataTableSortingExample {
    @AuraEnabled(Cacheable=true)
    public static List <Contact> getContacts() {
        List<Contact> contList = [ SELECT Id, FirstName, LastName, Phone, Email
        FROM Contact
        LIMIT 100 ];
        return contList;
    }

    @AuraEnabled(Cacheable=true)
    public static List <Contact> getContacts(String field, String sortOrder) {
        String query;
        query  = 'SELECT Id, FirstName, LastName, Phone, Email FROM Contact';
        if(field != null && sortOrder !=null){
            query += ' ORDER BY '+field+' '+sortOrder + ' LIMIT 3';
        }else{
            query += ' LIMIT 3';
        }
        return Database.query(query);
    }
}