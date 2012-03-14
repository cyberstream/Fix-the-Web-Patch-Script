#NOTICE: THIS REPOSITORY IS NO LONGER ACTIVE!

Due to potential security vulnerabilities in the extension using the original method of fetching **patches.js** from Github, we have revised our approach for applying patches to web pages. 

The **patches.js** file is now located in the [main extension repository](http://github.com/cyberstream/Fix-the-Web) in the *includes/* directory. However, if your patch merely injects CSS into the web page, then you can add a patch in the **patches.json** file in the [CSS patches repository](http://github.com/cyberstream/Fix-the-Web-CSS-Patches).

That being said, if injecting CSS code via the **patches.json** file is not sufficient to solve the website problem, then apply a JS patch in the **patches.js** file aforementioned. Use the following guidelines when doing so:

##Patch the Web

Before applying a patch to a web page, contact the owner of that website, inform them about the problem, and request that they fix it. If your request is ignored or turned down, then you may resort to applying a patch to the web page with this script. 

Remember, our top priority is to fix the web for everyone, not just the users of this extension through patches.

###How to Apply a Patch

This Javascript is injected into *all* web pages, so restrict the patch to the page(s) or website that needs the patch with a conditional `if ()` block. Don't let any variables in your code leak to the global scope. This is inefficient and (more importantly) has the potential to cause conflicts with variables in the native code.

###Patches

Check out [this page](http://my.opera.com/fix-the-web/blog/2012/03/01/how-to-patch-a-web-page) for guidelines for adding patches.

Use this syntax to document each patch in a commented-out line about your patch:

`// PATCH-id (latest stable Opera version tested, status, sitename.com/fixed-page(s)) information about the bug that this patch fixes`

Make "status" "patch added" when you add the patch. When a new stable version of Opera is released or a website's code is updated, you may want to test if the patches in the file are still required. If the bug on the website is no longer there, then remove the patch code, **but don't remove the comment**. Just change the comment to this:

`// PATCH-id (latest stable Opera version tested, patch removed, sitename.com/fixed-page(s)) information about the bug that this patch fixes`

If the patch is still needed, but you want to show that you tested it again, then change the comment to this:

`// PATCH-id (latest stable Opera version tested, patch still needed, sitename.com/fixed-page(s)) information about the bug that this patch fixes`

If the bug changed so that the current patch is no longer fixing the bug, then update the patch's code and update the comment to this:

`// PATCH-id (latest stable Opera version tested, patch updated, sitename.com/fixed-page(s)) information about the bug that this patch fixes`