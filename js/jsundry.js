// library to merge sundry files into completed page
jsundry =
{
// (semi) private functions
privs:
{
// load indicated template
load: function()
	{
	var sub_div;
	var a_href;
	var link;
	var ajax_args;
	var success;
	var error;

	sub_div = this;
	a_href = $( 'a', sub_div);
	if ( a_href.length == 0)
		{
		return;
		}

	link = a_href[ 0 ].getAttribute( 'href');
	// alert( 'Found link \"' + link + '\"');
	success = function( html)
		{
		alert( 'Loaded ' + html);
		sub_div.innerHTML = $( 'body')[ 0 ].innerHTML;
		};
	error = function( x, status, err)
		{
		alert( 'Oops: (' + link + ') ' + status + '/' + err);
		};
	ajax_args =
		{
		url: link,
		content: 'html',
		success: success,
		error: error
		};
	$.ajax( ajax_args);
	}
},

// find divs with templates (possibly to be updated with data)
merge: function()
	{
	var sub_divs;

	sub_divs = $( 'div.subst');
	sub_divs.each( jsundry.privs.load);
	}
}
// vi: ts=4 sw=4
// *** EOF ***
