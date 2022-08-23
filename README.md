# This-Is-Spotify
![This-is-Grogu](https://user-images.githubusercontent.com/108159910/186207479-31ab1fff-3977-4cf9-9e36-c65c6ed2bc6e.png)
# Project Two - Reverse Engineer

## **DESCRIPTION**

It's time to put everything that you've learned together! For your project, you will build a full-stack web application using Express, Node.js, Mongoose, and MongoDB. You and your partner will reverse engineer a site of your choosing.

The objective of this project is to:

- Learn by reverse engineering an existing site.
- Build effective planning material and execute on the material.
- Apply the skills you've learned by building a full-stack web application from the ground up.
- Practice the topics covered during this course so far.
- Build a polished, published website you can share in your portfolio.

You will be working **in pairs (2 developers)** for this first project. Show us what you've got!

## **CORE REQUIREMENTS**

You and your partners will be selecting a site you both enjoy and working together to reverse engineer it. You will NOT be replicating the site exactly, instead, you will be selecting a few key features of the site and working through the logic of the features selected.

Your reverse engineered application must include the following:

- Pick out 3 key features within the site of your choice for your MVP. (I.E. Instagram you can sign up, post pictures, Like pictures, comment on pictures)
- Think of the user flow and provide one improvement to the design/flow of the application. (I.E. Changing the color theme of Reddit to be more accessible and improve interaction animations)
- Minimum **TWO** database models with a relationship between them to support the features you selected. (I.E. Twitter may have tweets and users in a one-to-many relationship)
- Full CRUD throughout your resources. (Not every resource needs every CRUD functionality, but all of CRUD must be demonstrated.)

Make sure to do all of the following with your app.

- **Express APP** Build an Express Application that renders HTML pages from EJS Templates.
- **RESTful Routes** Design your CRUD routes using the REST convention.
- **Templating** Use EJS to render objects from MongoDB in the browser as HTML templates.
- **MongoDB** Persist at least two models to a Mongo Database. Use at least one one-to-many or many-to-many relationship between models. You can choose to reference or embed your data. **At least one model needs to include full CRUD functionality.**
- **Git** 50+ commits. Commit early, commit often. Tell a story with your commits. Each message should give a clear idea of what you changed. (Remember to ignore node_modules!)
- **Code Style** Write professional-looking code. Follow the [Airbnb Javascript Styleguide](https://github.com/airbnb/javascript) or a style guide of your choosing.
- **Visual Design** Use Flexbox, CSS Grid, Bootstrap, Materialize, Foundation, Skeleton, or another CSS framework to make your front-end snazzy. First impressions matter!
- **Heroku** Deploy your app to Heroku.
- **Documentation** Write a README.md that would make an employer excited to hire you. Screenshots are encouraged.

## **PLANNING DELIVERABLES**

See the [planning deliverables](https://www.notion.so/Planning-326c2c41325a41e499af062aca777a6f) document for more information on the planning steps you should take.

- A clearly defined **Minimum Viable Product ([MVP](http://en.wikipedia.org/wiki/Minimum_viable_product)) Scope**. What can you reasonably accomplish in a week? What site are you reverse engineering? What features are you recreating?
- **Breakdown of responsibilities.**  Who is in charge of what features? I.E. Eric - Create posts and comments, Troy - User account with auth and gatekeeping
- **Wireframes** for *every* page you plan on creating. These don't have to be pretty; just sketch what the page will include. Do not go for an exact copy of what you are deconstructing. Think about how you could possibly improve the user experience.
- **User Stories** (divided into sprints) - we recommend [Trello](https://trello.com/) for project tracking.
- **User Flow** for how the user will navigate the application.
- **Database Models and ERD** Make plans for each resource. List the attributes you'll include in your schemas and what type of data each attribute will be. Draw an [Entity Relationship Diagram](https://www.google.com/search?tbm=isch&q=database%20table%20relationships%20drawing) to illustrate the relationship(s) between models, and note whether you plan to reference or embed related data.
- A **Feasibility Check** for any bonus feature you'd like to complete.

## **BONUS IDEAS**

If you want to push yourself and learn something new, optionally consider doing some of the following with your app, but *please talk to an instructor* beforehand:

- **Front-End Data Validation** Validate data on the front-end by handling incorrect form inputs during create/update. For example, when a form is submitted, check that a field has some text in it, or that its value is a number.
- **Back-End Data Validation** Validate data on the back-end using mongoose's [built-in validations](http://mongoosejs.com/docs/validation.html#built-in-validators) or make your own custom validation.
- **More Models or Relationships** Add another model to your project or create a new relationship.
- **Model Methods** Level up your models by adding a method to one of your schemas. For example, a person schema with `firstName` and `lastName` can have a `fullName` method (see mongoose docs on [instance methods](http://mongoosejs.com/docs/guide.html#methods) and [static methods](http://mongoosejs.com/docs/guide.html#statics)).
- **Authentication** Enable users to store account information and signup, login, and logout.
- **Sass** Use a CSS pre-compiler to write more imperative CSS.
- **Whatever else inspires you!**

## **WHAT WE ARE LOOKING FOR**

### **Code must be...**

- Clean
    - no unused or commented-out code
    - proper spacing and indentation
- Modular and well organized
    - use the module pattern with `module.exports`
    - separate large tasks into shorter functions
- Appropriately commented
    - use comments to plan, but remove the unnecessary comments for your professional portfolio
    - prefer a well-named variable or function to a comment

## **ACCESS TO INSTRUCTORS**

We will hold 1:1s throughout the week. We will also do mini-lessons on certain topics if we notice that several people are running into the same issues.

## **FINAL DELIVERABLES**

- Completion of the **core requirements**
- A link to your website **hosted on Heroku (covered in 4.29.22 lesson)**
- A link to your **source code on GitHub**
- A `README.md` file that serves as your **project documentation** (this is important!)
- A **10-minute presentation**, in the company of friends, illustrating:
    - Triumphs
    - Challenges
    - Words of Wisdom
    - And *3* lines(!) of code you want to share with your classmates, copied into a separate document.

## **Presentation Tips**

- Please zoom your browser window to 150%.
- Please set your Text Editor font to at least 20.0 pixels.
- And speak up!

## Additional Material

[Planning](https://www.notion.so/Planning-326c2c41325a41e499af062aca777a6f)
