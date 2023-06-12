/**
 * Created by MS on 2023-04-27.
 */

public class AccountController{
    @AuraEnabled
    public static List <Account> fetchAccounts() {

        List<Account> accList = [SELECT Id, Name, BillingState,
                Website, Phone, Industry, Type from Account LIMIT 3];
        return accList;
    }
}