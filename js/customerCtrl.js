var customerCtrl = customerCtrl || {};

( function() {

	'use strict';

	var _model = undefined;
    var _foundCustomer = null;

    var CUSTOMER = [ {
    "id": 1,
    "name": "John Appleseed",
    "dob": "1970-09-24",
    "gender": "M",
    "email": "john@appleseed.com",
    "enabled": true,
    "address": "123 Collins Street Melbourne VIC 3000"
}, {
    "id": 2,
    "name": "Alice",
    "dob": "1983-01-01",
    "gender": "F",
    "email": "alice@mail.com",
},
{
    "id": 3,
    "name": "Bob",
    "dob": "1975-12-02",
    "gender": "M",
    "email": "bob@mail.com",
}
];


	// customerCtrl.url = 'https://github.com/jaysonc17/sample/blob/main/';


    // var request = {
    //     'cache': false,
    //     'dataType': "jsonp",
    //     "async": true,
    //     "crossDomain": true,
    //     "url": customerCtrl.url + 'contacts.json',
    //     "method": "GET",
    //     "headers": {
    //         "accept": "application/json",
    //         "Access-Control-Allow-Origin":"*"
    //     }
    // }

	// function load() {
    //     if ( _model === undefined ) {
    //         $.ajax(request)
    //         .done(function (response) {
    //             console.log(response);
    //             _model = response;
    //             })
    //             .fail(function (response) {
    //               alert(response);
    //           });
    //     }
    // }

    customerCtrl.search = function(email) {
        var mwElement = document.getElementById('metawidget');
        $(mwElement).empty();
        $.each( _model, function( key, value ) {
            // filter by email
			if ( email !== undefined && value.email == email ) {
                _foundCustomer = value;
                populatePage(mwElement);
				return;
			}
		} );

        if (_foundCustomer === null)
        {
            alert("Not found, please try again.");
            $("#btnSave").removeClass("d-block");
        } else {
            $("#btnSave").addClass("d-block");
        }
    }

    customerCtrl.update = function() {
        var mwElement = document.getElementById('metawidget');
        
        alert("TODO");
		// var mwData = mwElement.data( 'metawidget' );
		// mwElement.metawidget( 'getWidgetProcessor', function( widgetProcessor ) {

		// 	return widgetProcessor instanceof metawidget.widgetprocessor.SimpleBindingProcessor;
		// } ).save( mwData );
	};

    function load() {
        if ( _model === undefined ) {
            _model = CUSTOMER; //TODO: rest api call not working yet
        }
    }

    function populatePage(el) {
		var mw = new metawidget.Metawidget( el, {
            inspector: new metawidget.inspector.CompositeInspector( [ new metawidget.inspector.PropertyTypeInspector(), 
                function( toInspect, type, names ) {

                    return {
                        properties: {
                            email: {
                                type: "string"
                            },
                            name: {
                                type: "string",
                                required: true
                            },
                            address: {
                                type: "string",
                                large: true
                            },
                            dob: {
                                type: "date"
                            },
                            gender: {
                                "enum": [ "M", "F" ]
                            },
                            enabled: {
                                type: "boolean"
                            },
                        }
                    };
                }
            ] ),
            addWidgetProcessors: [ new metawidget.bootstrap.widgetprocessor.BootstrapWidgetProcessor() ],
            layout: new metawidget.bootstrap.layout.BootstrapDivLayout()
        } );	

		if ( _foundCustomer != undefined ) {
            mw.toInspect = _foundCustomer;
            mw.buildWidgets();
        }
	}

    load(); 
} )();