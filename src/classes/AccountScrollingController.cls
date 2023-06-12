/**
 * Created by MS on 2023-04-28.
 */

public with sharing class AccountScrollingController {
    @AuraEnabled
    public static List <Account> fetchAccts(Integer intOffSet) {
        Integer intoffsets  = integer.valueof(intOffSet);
        List<Account> accList = [SELECT Id, Name, Industry, Type FROM Account LIMIT 2 OFFSET : intoffsets];
        return accList;
    }
}