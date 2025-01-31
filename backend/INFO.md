# **Request in Express**

<big><b>1. req.body</b></big>
Use it when you want to send sensitive data(eg. form data) or super long JSON data to the server.

<big><b>2. req.params</b></big>
These are properties attached to the url i.e named route parameters. You prefix the parameter name with a colon **:** when writing your routes.

<big><b>3. req.query</b></big>
req.query is mostly used for searching, sorting, filtering, pagination, etc.
Say for instance you want to query an **API** but only want to get data from page 10, this is what you'd generally use.
It written as <big>`key=value`</big>
