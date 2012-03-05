/* Opera's "Fix the Web" JS patch file
* Broken web page fixes
* 
* Guidelines: 
* - Restrict your fix the the broken site or pages with an "if ()" block.
* - Do not leak any variables to the global scope.
*/

(function() {
    var hostname = location.hostname,
		href = location.href, 
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
    if (hostname.indexOf('newsminer.com') > -1) {
        addCSS('.ap_table_styles li { padding: 7px 4px}');
    }
    
    // PATCH-2 (11.62, patch added, memurlar.net) Fix the overflowed ul tag section in .Box
	else if (hostname.indexOf('memurlar.net') > -1) {
        addCSS('div.Box ul { padding-left:22px; margin-left:0px !important } div.Box a.ListItem { padding-left:22px !important; }');
		
		// PATCH-4 (11.61, patch added, memurlar.net/forum) Fixed undesireable cell align of the forum table
		if (hostname.indexOf('forum.') > -1 && pathname.indexOf('kategori') > -1) {
			document.addEventListener("DOMContentLoaded",function(){
				var c=document.getElementsByTagName('table'); 
				var c_adet = c.length;

				var m=0,i=0;
				for (m = 0; m < c_adet; m++) {
					if (c[m].getAttribute('width') == '100%' && c[m].getAttribute('cellpadding') == '2' && c[m].getAttribute('cellspacing') == '1') {
						var k1=c[m].getElementsByTagName('thead');
						var k2=k1[0].getElementsByTagName('tr');
						var k3=k2[0].getElementsByTagName('th');
						k2[0].removeChild(k3[0]);
						break;
					}
				}
				
				var bb=document.getElementsByTagName('tr'); 
				var bb_adet = bb.length;
				for (i = 0; i < bb_adet; i++) {
					if (bb[i].getAttribute('class') == 'Even' || bb[i].getAttribute('class') =='Prior') {
						var td_ele=bb[i].getElementsByTagName('td');
						bb[i].removeChild(td_ele[0]);
					}
				}
			},false);
		}
	}

    // PATCH-3 (11.61, patch added, trtspor.com.tr) Fixed invisible content of body
	else if (hostname.indexOf('trtspor.com') > -1) {
        addCSS('#main{content: inherit;}');
    }

	// PATCH-5 (11.61, patch added, sanalgsm.com and netgsm.com.tr) Fixed too small captcha images
	else if (hostname.indexOf('sanalgsm.com') > -1 || hostname.indexOf('netgsm.com.tr') > -1) {
		if (pathname.indexOf('gresim.asp') > -1) {
			addCSS('.contain{padding:0 !important}');
		}
	}

})()