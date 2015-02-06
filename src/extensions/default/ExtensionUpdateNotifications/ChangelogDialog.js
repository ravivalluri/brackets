/*global brackets, define, Mustache*/

define(function (require, exports, module) {
    "use strict";

    var Dialogs                 = brackets.getModule("widgets/Dialogs");
    var Strings                 = brackets.getModule("strings");
    var ChangelogDownloader     = require("./ChangelogDownloader");
    var changelogDialogTemplate = require("text!ChangelogDialogTemplate.html");

    function show(extensionId) {
        ChangelogDownloader.downloadChangelog(extensionId)
            .then(function (changelog) {

                console.log("changelog for " + extensionId);
                console.log(JSON.stringify(changelog, null, 4));

                var compiledTemplate = Mustache.render(changelogDialogTemplate, {
                    title: extensionId,
                    changelog: changelog,
                    Strings: Strings
                });

                Dialogs.showModalDialogUsingTemplate(compiledTemplate);

            })
            .catch(function (e) {
                console.error(e);
            });
    }

    exports.show = show;

});