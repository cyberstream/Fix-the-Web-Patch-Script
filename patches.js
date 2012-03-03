/* Opera's "Fix the Web" JS patch file
* Broken web page fixes
* 
* Guidelines: 
* - Restrict your fix the the broken site or pages with an "if ()" block.
* - Do not leak any variables to the global scope.
*/

(function() {
    var domain = location.hostname,
          url = location.href, 
          pathname = location.pathname,
          opera_version = opera.version(),
          opera_build = opera.buildNumber();
          
    // add CSS to the web page
    function addCSS ( css ) {     
        
        // detect if the page is loaded; if it isn't, then make it run when the page is loaded
        if ( document.addEventListener ) {
            
            // If the head element doesn't exist, create it and insert it into the DOM tree
            if ( !document.getElementsByTagName('head').length ) {
                var new_head = document.createElement('head'),
                    root = document.getElementsByTagName('html')[0],
                    children = root.childNodes,
                    firstChild = children.length ? children[0] : false;

                if (firstChild) firstChild.parentNode.insertBefore(new_head, firstChild);
                else root.appendChild(new_head);
            }

            // create the style tag and put the contents of the "css" parameter into the element        
            var head = document.getElementsByTagName('head')[0],
                style_tag = document.createElement('style');

            style_tag.setAttribute('type', 'text/css');
            style_tag.appendChild(document.createTextNode(css));

            // append the style element to the head element
            head.appendChild(style_tag)
        } else addEventListener ('DOMContentLoaded', addCSS(css), false);
    }
    
    // PATCH-1 (11.62, patch added, newsminer.com) Fixed the cramped links in the lists under "National News", "International News", and "Entertainment News"
    if ( (/(www\.)?newsminer\.com\/?$/i).test(url) ) { 
        addCSS('.ap_table_styles li { padding: 7px 4px}');
    }
    
    // PATCH-2 (11.62, patch added, memurlar.net) Fix the overflowed ul tag section in .Box
    if ( (/(www\.)?memurlar\.net\/?$/i).test(url) ) { 
        addCSS('div.Box ul { padding-left:22px; margin-left:0px !important } div.Box a.ListItem { padding-left:22px !important; }');
    }

    // PATCH-3 (11.61, patch added, trtspor.com.tr) Fixed invisible content of body
    if ( (/(www\.)?trtspor\.com.tr\/?$/i).test(url) ) { 
        addCSS('#main{content: inherit;}');
    }
})()