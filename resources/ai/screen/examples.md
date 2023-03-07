---
Login Screen
---
A login screen is a user interface element that is used to authenticate a user's identity before granting them access to a digital application or service. Typically, a login screen consists of the following elements:

	- A header or logo: This is usually located at the top of the screen and displays the name and/or logo of the application or service being accessed.
	- A username or email field: This is where the user enters their username or email address, which is used to identify their account.
	- A password field: This is where the user enters their password, which is used to verify their identity.
	- A "forgot password" link: This is a link that allows users to reset their password if they have forgotten it.
	- A "login" button: This is the button that the user clicks to submit their login credentials and access the application or service.
	- A "register" link: This is a link that allows new users to create an account if they don't already have one.
	- An error message: This is a message that appears if the user enters incorrect login credentials or encounters an error during the login process.

In terms of design, a login screen should be simple and easy to use. The elements should be clearly labeled and easy to navigate, and the overall aesthetic should be in keeping with the design language of the application or service being accessed. Additionally, the login screen should be designed with security in mind, and should include measures like password masking and two-factor authentication to protect the user's account.

```html
<row>
	<column>
		<form-image src="https://via.placeholder.com/128x64" />
	</column>
</row>
<row>
	<column>
		<form-input 
			name="username" 
			label="Username or Email" 
			type="text" 
			validation="required" 
		/>
	</column>
</row>
<row>
	<column>
		<form-input 
			name="password" 
			label="Password" 
			type="password" 
			validation="required" 
		/>
	</column>
</row>
<row>
	<column>
		<form-button 
			name="login" 
			label="Login" 
			type="submit" 
		/>
	</column>
	<column>
		<form-button 
			name="forgotpassword" 
			label="Forgot Password" 
			type="link" 
		/>
	</column>
</row>
<row>
	<column>
		<form-button 
			name="register" 
			label="Register" 
			type="link" 
		/>
	</column>
</row>
```
---
Advanced profile
---
An advanced profile with navigation tabs is a user interface element that displays information about a user, including personal details, activity within an application or service, and customizable settings. Navigation tabs allow users to switch between different sections of the profile screen to view and edit information as needed.

The different sections of an advanced profile with navigation tabs might include:

	- Overview: This tab provides a brief summary of the user's activity and key personal details, such as their name, profile picture, and bio.
	- Activity: This tab displays the user's recent activity within the application or service, such as posts, comments, likes, or purchases.
	- Favorites: This tab displays the user's favorite items or content within the application or service, such as products, songs, or articles.
	- Settings: This tab allows the user to customize their account settings, such as notification preferences, privacy settings, or profile picture.
	- Security: This tab allows the user to manage their account security, such as two-factor authentication, password management, and session management.
	- Billing: This tab displays the user's billing information, such as payment history, payment methods, and invoices.
	- Help and Support: This tab provides access to help and support resources, such as FAQ, contact support, and documentation.

In terms of design, an advanced profile with navigation tabs should be visually appealing, with a clear and intuitive layout. Each tab should be labeled clearly and represented by an icon or image that reflects its purpose. The different sections of the profile should be logically arranged and easy to understand, with consistent design elements and typography. The advanced profile should also be designed with privacy and security in mind, with sensitive information protected and secure.

```html
<row>
	<column>
		<form-image src="PROFILE_PICTURE_URL" />
	</column>
</row>
<row>
	<column>
		<form-input 
			name="name" 
			label="Name" 
			type="text" 
			validation="required" 
		/>
	</column>
</row>
<row>
	<column>
		<form-input 
			name="bio" 
			label="Bio" 
			type="text" 
			validation="optional" 
		/>
	</column>
</row>
<tabs>
	<tab name="overview" label="Overview">
		<!-- Content of Overview tab goes here -->
	</tab>
	<tab name="activity" label="Activity">
		<!-- Content of Activity tab goes here -->
	</tab>
	<tab name="favorites" label="Favorites">
		<!-- Content of Favorites tab goes here -->
	</tab>
	<tab name="settings" label="Settings">
		<!-- Content of Settings tab goes here -->
	</tab>
	<tab name="security" label="Security">
		<!-- Content of Security tab goes here -->
	</tab>
	<tab name="billing" label="Billing">
		<!-- Content of Billing tab goes here -->
	</tab>
	<tab name="help-support" label="Help and Support">
		<!-- Content of Help and Support tab goes here -->
	</tab>
</tabs>
```