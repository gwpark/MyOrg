/**
 * Created by MS on 2023-04-03.
 */

public class PDFGenerateCtrl {
    public Contact con{get;set;}
    public String currentRecordId{get;set;}

    public PDFGenerateCtrl(){
        currentRecordId  = ApexPages.CurrentPage().getparameters().get('id');
        if(currentRecordId != null && String.isNotBlank(currentRecordId)){
            con = [SELECT Id, Name, Email FROM Contact WHERE Id =:currentRecordId];
            System.debug('=======Contact=======>' + con);
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchRecords(){
        try {
            List<Contact> conList = new List<Contact>();

            conList = [Select id, Name, Email from Contact];
            return conList;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static String sendPdf(String contactId) {
        PageReference pdf = new pagereference('/apex/ContactDataPDF?id='+contactId);
        pdf.getParameters().put('id', contactId);
        Blob body;

        try {
            // returns page as a PDF
            body = pdf.getContentAsPDF();
        } catch (Exception e) {
            body = Blob.valueOf('data');
        }

        try{
            //insert content version
            ContentVersion cv = new ContentVersion(Title='TechdicerContact.pdf'
                                , VersionData = body
                                , PathOnClient = 'TechdicerContact.pdf'
                                //, FirstPublishLocationId = contactId    // 중복에러 발생
            );

            insert cv;

            System.debug('=======ContentVersion=========> ' + cv);
            ContentVersion cVer = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =:cv.id];

            ContentDocumentLink cd = new ContentDocumentLink();
            cd.ContentDocumentId = cVer.ContentDocumentId;
            cd.LinkedEntityId = contactId;
            cd.ShareType = 'V';
            cd.Visibility = 'AllUsers';
            System.debug('======ContentDocumentLink==========> ' + cd);
            insert cd;

        }catch(Exception e){
            return e.getMessage();
        }

        Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        attach.setContentType('application/pdf');
        attach.setFileName('TechdicerContact.pdf');
        attach.Body = body;

        // https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm
        // You can send an unlimited amount of email through the UI to your org’s internal users, which include portal users.
        // API or Apex single emails can be sent to a maximum of 5,000 external email addresses per day.
        // If you use SingleEmailMessage to email your org’s internal users, specifying the user’s ID in setTargetObjectId means the email doesn’t count toward the daily limit. However, specifying internal users’ email addresses in setToAddresses means the email does count toward the limit.
        // setTargetObjectId를 사용하여 내부사용자들에게 이메일을 보내면 Limit Count가 되지 않음
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        // mail.setTargetObjectId(UserInfo.getUserId());
        mail.setTargetObjectId(contactId);
        //mail.setToAddresses(new String[] {'gwpark67@i2max.co.kr'});
        mail.setSubject('Generate PDF from Apex Salesforce');
        mail.setHtmlBody('Generate PDF from Apex Salesforce');
        mail.setFileAttachments(new Messaging.EmailFileAttachment[] {attach});

        System.debug('======mail==========> ' + mail);
        // Send the email
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        return 'Email sent Successfully with PDF.';
    }
}