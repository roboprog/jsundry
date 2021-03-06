// library to merge sundry files into completed page
jsundry =
{

// (semi) private functions
privs:
{

// generic ajax error handler
ajax_error: function( x, status, err)
	{
	alert( 'Oops: (' + link + ') ' + status + '/' + err);
	},

// load indicated content (data)
load_content: function()
	{
	var data_div_id;
	var a_href;
	var link;
	var ajax_args;
	var continuation;

	data_div_id = this;
	a_href = $( 'a.content', data_div_id);
	if ( a_href.length == 0)
		{
		return;
		}

	link = a_href[ 0 ].getAttribute( 'href');
	alert( 'Found data/JSON link \"' + link + '\"');

	// complete the work of the outer function once read completes --
	//  merge the JSON data into the corresponding elements in the template
	continuation = function( json)
		{
		alert( 'Loaded JSON: ' + json);
		// TODO:  scan for replacements in template
		// TODO:  get data_class field, find element with matching id attr
		// TODO:  replace element text or (input) value attrs, as appropriate
		};

	ajax_args =
		{
		url: link,
		content: 'json/text',
		success: continuation,
		error: jsundry.privs.ajax_error
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

	// complete the work of the outer function once read completes --
	//  insert the template into page stub,
	//  and go get dynamic content
	continuation = function( html)
		{
		// var template;
		var sub_divs, contingents;

		// alert( 'Loaded temlate: ' + html);
		// template = $( 'body', html)[ 0 ].innerHTML;  // TODO: convert to DOM
		// alert( 'Extracted content: ' + template);
		sub_div.innerHTML = html;

		// suppress display of any contingent data areas:
		contingents = $( 'div.contingent');
		contingents.hide();

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
		error: jsundry.privs.ajax_error
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
