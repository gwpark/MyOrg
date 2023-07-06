/**
 * Created by MS on 2023-05-03.
 * lightning/n/Greet?c__name=Hong%20Gil%20Dong&c__recordId=1234
 */

({
    init: function(cmp, evt, hlp) {
        var myPageRef = cmp.get("v.pageReference");
        var recordId = myPageRef.state.c__recordId;
        var name = myPageRef && myPageRef.state ? myPageRef.state.c__name : "World";
        cmp.set("v.name", name);
    },
    handlePageChange: function(cmp, evt, hlp) {
        var myPageRef = cmp.get("v.pageReference");
        var name = myPageRef && myPageRef.state ? myPageRef.state.c__name : "World";
        cmp.set("v.name", name);
    }
})