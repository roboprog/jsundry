// library to merge sundry files into completed page
jsundry =
{
// (semi) private functions
privs:
{
// generic ajax error handler
error: function( x, status, err)
	{
	alert( 'Oops: (' + link + ') ' + status + '/' + err);
	},
// load indicated content (data)
load_content: function()
	{
	var data_id_div;
	var a_href;
	var link;
	var ajax_args;
	var continuation;

	data_id_div = this;
	a_href = $( 'a', data_id_div);
	if ( a_href.length == 0)
		{
		return;
		}

	link = a_href[ 0 ].getAttribute( 'href');
	// alert( 'Found link \"' + link + '\"');
	continuation = function( json)
		{
		alert( 'Loaded ' + json);
		// TODO:  scan for replacements in template
		};
	ajax_args =
		{
		url: link,
		content: 'json/text',
		success: continuation,
		error: jsundry.privs.error
		};
	$.ajax( ajax_args);
	},
// load indicated template
load_template: function()
	{
	var sub_div;
	var a_href;
	var link;
	var ajax_args;
	var continuation;

	sub_div = this;
	a_href = $( 'a', sub_div);
	if ( a_href.length == 0)
		{
		return;
		}

	link = a_href[ 0 ].getAttribute( 'href');
	// alert( 'Found link \"' + link + '\"');
	continuation = function( html)
		{
		var sub_divs;

		alert( 'Loaded ' + html);
		sub_div.innerHTML = $( 'body')[ 0 ].innerHTML;

		// now that template is loaded, insert data into it
		sub_divs = $( 'div.content');
		// TODO:  enforce only 1
		sub_divs.each( jsundry.privs.load_content);
		};
	ajax_args =
		{
		url: link,
		content: 'html',
		success: continuation,
		error: jsundry.privs.error
		};
	$.ajax( ajax_args);
	}
},

// find divs with templates (possibly to be updated with data)
merge: function()
	{
	var sub_divs;

	sub_divs = $( 'div.template');
	// TODO:  enforce only 1
	sub_divs.each( jsundry.privs.load_template);
	}
}
// vi: ts=4 sw=4
// *** EOF ***
