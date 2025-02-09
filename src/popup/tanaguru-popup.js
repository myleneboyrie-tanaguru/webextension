document.addEventListener('DOMContentLoaded', function(event) {
	/*
	var gettingBadgeText = browser.browserAction.getBadgeText({});
	gettingBadgeText.then(function (text) {
		var span = document.querySelectorAll('span');
		if (text.length > 0) {
			span[0].replaceChild(document.createTextNode("consulter les résultats d'analyse de cette page"), span[0].firstChild);
			span[2].replaceChild(document.createTextNode("expertisez"), span[2].firstChild);
		}
	});
	*/
	
	
	
	
	
	/* Support de template. */
	if ('content' in document.createElement('template')) {
		var html = document.querySelector('html');
		html.setAttribute('lang', chrome.i18n.getMessage('extensionLang'));
		var template = document.getElementById('popup');
		template = template.content;
		var manifest = chrome.runtime.getManifest();
		var span = template.querySelectorAll('span');
		for (var i = 0; i < span.length; i++) {
			var data = span[i].firstChild.nodeValue.split('.');
			if (data[0] == 'manifest') {
				var content = manifest[data[1]];
			}
			else {
				var content = chrome.i18n.getMessage(data[1]);
			}
			span[i].textContent = content;
			if (data[0] != 'manifest') {
				var spannodes = span[i].querySelectorAll('span');
				for (var j = 0; j < spannodes.length; j++) {
					if (spannodes[j].textContent.match(new RegExp('manifest\.(.)*'))) {
						spannodes[j].replaceChild(document.createTextNode(manifest[spannodes[j].textContent.split('.')[1]]), spannodes[j].firstChild);
						if (spannodes[j].getAttribute('data-role') == 'link') {
							var link = document.createElement('a');
							link.setAttribute('href', spannodes[j].firstChild.nodeValue);
							link.appendChild(document.createTextNode(spannodes[j].hasAttribute('data-text') ? spannodes[j].getAttribute('data-text') : link.getAttribute('href')));
							if (spannodes[j].getAttribute('data-newwindow') == 'true') {
								link.setAttribute('target', '_blank');
								link.setAttribute('title', link.firstChild.nodeValue + ' ' + chrome.i18n.getMessage('extensionNewWindow'));
							}
							spannodes[j].parentNode.replaceChild(link, spannodes[j]);
						}
					}
				}
			}
		}
		document.body.appendChild(document.importNode(template, true));
	}
}, false);
