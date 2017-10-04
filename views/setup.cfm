<!DOCTYPE html>
<html>
<head>
  <title>Guitar Tabs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/assets/css/guitar-tabs.css" rel="stylesheet">
</head>
<body>

<div class="container-fluid" style="margin-top: 100px">
	<div class="container" style="margin-top: 30px">
		<form class="form-signin" role="form">
			<h2>Setup</h2>
			<cfif len(rc.message)>
				<div class="alert alert-warning">#rc.message#</div>
			</cfif>
			<input type="text" name="username" class="form-control input-lg" placeholder="Username" required autofocus>
			<input type="password" name="password" class="form-control input-lg" placeholder="Password" required>
			<input type="password" name="passwordVerify" class="form-control input-lg" placeholder="Verify Password" required>
			<button class="btn btn-lg btn-primary btn-block">Create User</button>
	  </form>
	</div>
</div>

</body>
</html>