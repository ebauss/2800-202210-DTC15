## J.A.N.E. Group Presents SUSTAINABLY

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Citation](#citation)

## The J.A.N.E. Group
* Joushua - UI designers
* Alexie - UI designers
* Nathan - Back-end developer
* Evon - Back-end developer

### Sustainably Project Pitch:
J.A.N.E. Group is developing a web application to help adults transition to a healthy and environmental lifestyle by rewarding them with redeemable points.

## Technologies Used
* HTML
* CSS
* JavaScript
* jQuery
* Node.js
* Express
* mySQL
* Heroku
* JawsDB
	
## File Contents
```
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   server.js
│   sustainably.sql
│
├───.vscode
│       settings.json
│
└───public
    │   about-us.html
    │   admin.html
    │   am-i-logged-in.html
    │   authentication.html
    │   earning.html
    │   globe.html
    │   index.html
    │   main.html
    │   new-reward.html
    │   not-found.html
    │   notification.html
    │   profile.html
    │   quiz.html
    │   rewards.html
    │   template.html
    │   verification.html
    │
    ├───css-files
    │       admin.css
    │       authentication.css
    │       earn.css
    │       globe.css
    │       index.css
    │       main.css
    │       new-reward.css
    │       notification.css
    │       profile.css
    │       quiz.css
    │       rewards.css
    │       style.css
    │       table-cell.css
    │       verification.css
    │       web-page.css
    │
    ├───images
    │       earth-bg.jpg
    │       earth.png
    │       icons8-close-50.png
    │       index-design.png
    │       jane-logo.png
    │       logo-only.png
    │       money.png
    │       redeem.png
    │       roundup-of-sustainable-brands.avif
    │       submit.png
    │       tree.png
    │       world.png
    │
    ├───js-files
    │       admin.js
    │       am-i-logged-in.js
    │       authentication.js
    │       earning.js
    │       globe.js
    │       login.js
    │       main.js
    │       navbar.js
    │       new-reward.js
    │       notification.js
    │       profile.js
    │       quiz.js
    │       reward.js
    │       skeleton.js
    │       verification.js
    │
    └───skeletons
            floating-bar.html
            footer.html
            navbar.html

```

## Getting Started:
1. Install Git, Node.js, and Visual Studio Code.
2. Install MySQL Community Server and MySQL Workbench.
3. Start the MYSQL80 Service if it is not running already.
4. Open sustainably.sql in MySQL Workbench, and run the entire file.
    * A local copy of the database is now hosted on your computer.
5. Open server.js in VS Code, and change the Password value on line 23 to your root account's password.
6. Open a terminal on the project directory, and run the command `npm install`
    * All necessary packages are now installed on your computer.
7. In the same terminal, run the command `npm install -g nodemon`
8. Now run the command `nodemon server.js`
9. Open your internet browser and visit `localhost:3000` using the address bar.
    * If the port is already used, please restart your computer.
10. If you see the landing page, your project setup was successful!

## Credits:
Product Owner
* Evon Bausa
Web Design & Client-side Programming
* Joushua Dela Cruz
* Alexie Narciso
Database Design & Server-side Programming
* Nathan Ng
* Evon Bausa

## References and Licenses:
* The logo-only.png is created from Canva by Alexie Narcissco
* The template.html is from COMP-1800 with these adaptations made 
    * Removing the bootstrap import link
    * Changing the meta name and the scripts
    * Removing the firebase links and imports
    
* The icons used in the floatingbar are from 8icons
    * https://icons8.com/?msclkid=e4238e95d0a311ec923acc92a9f01d52
* The functionality and design of the collapsible card on admin is from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible

* The Easter Egg at globe.html uses CSS from https://www.youtube.com/watch?v=BY4uU6CNtTg
* The Easter Egg at globe.html uses animations from https://www.youtube.com/watch?v=eJoS5ezur1E&t=126s