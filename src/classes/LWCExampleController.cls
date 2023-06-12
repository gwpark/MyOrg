/**
 * Created by MS on 2023-03-31.
 */

public inherited sharing class LWCExampleController {

    @AuraEnabled
    public static List<Account> saveAccounts(List<Account> lstAccs) {
        try {
            insert lstAccs;
            return lstAccs;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}