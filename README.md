# Today I Learned - Web Application

During your programming journey you will come across questions every day and need to find answers for those questions. Studies have found a [cognitive benefit to journaling](https://psychcentral.com/lib/the-health-benefits-of-journaling/) when learning new content, or balancing between multiple priorities. For many people the act of writing down a problem, the path to finding a solution, and the answer, stimulates pathways in the brain which help in memory recall and problem solving.

# Tech

* ExpressJS
* MongoDB
* Mongoose
* React

## Starter Code

Follow the Github Classroom link and clone the starter repository down to your local machine

## Sign up for a mongoDB Atlas Account

To complete all icebox stories you will need to be saving data to the cloud, rather than your local machine. Start by connection to your local MongoDB instance located at `mongodb://localhost:27017` but keep in mind you may need to change that URL to point to a cloud based database provider if you are tackling the icebox stories.

We use the free database as a service provider, Atlas, for connecting a production version of the application to a database hosted in the cloud. Please visit the following URL and sign-up for an Atlas account in order to create and use a database which is reachable from the internet.

- https://www.mongodb.com/cloud/atlas

## Considerations

  * What fields should be required for a TIL entry?
    - Title?
    - Content?
    - Author?
    - Topic or Category?
    - Links to resources?
  * How could you find and update an existing TIL entry?
  * How could you search for entries containing a word, phrase, or category?
  * How could you remove an existing TIL entry?
  * How could you format TIL entries so that `code` appears mono-spaced and syntax highlighted?
  * How could you add comments to TIL entries?
  * How do you enforce who can create/edit/delete new entries?

# Stories

<!--BOX-->

## Creating a new TIL entry

**Given**: an empty form at the path `/`

**When** a user inputs:

```
To convert JSON to JavaScript object user JSON.parse("{'some': 'json'}");
```

**Then** a new TIL `entry` is created

**And** the TIL `entry.text` equals:

```
To convert JSON to JavaScript object user JSON.parse("{'some': 'json'}");
```

<!--/BOX-->

<!--BOX-->

## Listing existing TIL entries

**Given** an existing TIL entry with the text:

```
To convert JSON to JavaScript object user JSON.parse("{'some': 'json'}");
```

And a when of:
`2018-01-01T12:15:00+0400`

**When** a user visits the front end path:

`/facts`

**Then** the web-page should display a list of nicely formatted TIL entries including all entries in the DataBase. Currently there will only be one with the contents:

| Attribute   | Value                                                                            |
| :---------- | :------                                                                          |
| text        | `To convert JSON to JavaScript object user JSON.parse("{'some': 'json'}"); |
| when        | `2018-01-01T12:15:00+0400`                                                       |

> Note: this section was first written in 2018, The actual date for your TIL entry should be much more recent

<!--/BOX-->

<!--BOX-->

## Display a TIL entry

**Given** an existing TIL entry with the `text` attribute of:

`To get an objects attributes use Object.keys(someObject);`

And the `when` attribute  of:

`2018-01-01T14:05:00+0400`

And an `_id` attribute with a value, *represented with a path parameter as* `:objectId`.

**When** a user visits the front end path:

`/facts/:objectId`

**Then** the web-page should display a single nicely formatted TIL entry with the attributes:

| Attribute   | Value                                                       |
| :---------- | :------                                                     |
| text        | `To get an objects attributes use Object.keys(someObject);` |
| when        | `2018-01-01T14:05:00+0400`                                  |

<!--/BOX-->

<!--BOX-->

## Listing multiple TIL entries

**Given** an existing TIL entry with the following attributes:

| Attribute   | Value                                                         |
| :---------- | :------                                                       |
| text        | `To get an objects attributes use Object.values(someObject);` |
| when        | `2018-01-01T15:30:00+0400`                                    |

**And** a second TIL entry with the following attributes:

| Attribute   | Value                                                                         |
| :---------- | :------                                                                       |
| text        | `To convert JSON to JavaScript object user JSON.parse("{'some': 'json'}");` |
| when        | `2018-01-01T12:15:00+0400`                                                    |


**When** a user visits the URL path in the browser:

`/facts`

**Then** the web-page should display two nicely formatted TIL entries with the attributes:

| Attribute   | Value                                                                         |  Order |
| :---------- | :------                                                                       | :----- |
| text        | `To get an objects attributes use Object.keys(someObject)`                    |      1 |
| when        | `2018-01-01T14:05:00+0400`                                                    |      1 |
| text        | `To convert JSON to JavaScript object user JSON.parse("{'some': 'json'}");` |      2 |
| when        | `2018-01-01T12:15:00+0400`                                                    |      2 |

**And** should be able to navigate to an individual entry's page by clicking on the text

<!--/BOX-->

<!--BOX-->

## Editing an existing TIL entry

**Given** an existing TIL entry with the following attributes:

| Attribute   | Value                                                                         |
| :---------- | :------                                                                       |
| text        | `To convert string input to an Integer use parseInt("42")` |
| when        | `2018-01-01T17:00:00+0400`                                                    |

**And** the record has an `_id` attribute with a value, *represented with a placeholder as* `:objectId`.

**When** a user visits the URL path `/facts/:objectId`

**Then** the web-page is populated with a `<form>` element containing the inputs for each key on the object and values from the database already filled in. For the example entry from above the form would have the following input types with the corresponding values:

| Input          | Value                                                      |
| :----------    | :------                                                    |
| text           | `To convert string input to an Integer use parseInt("42")` |
| datetime-local | `2018-01-01T17:00:00+0400`                                 |

>Note: Take a look at the `DateTime-Local` input type on Mozilla Developer Network [DateTime-Local Form Input Type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)

<!--/BOX-->

<!--BOX-->

## Delete a TIL entry

**Given** an existing TIL entry with the following attributes:

| Attribute   | Value                                                                         |
| :---------- | :------                                                                       |
| text        | `To convert a number to a string use (42).toString()` |
| when        | `2018-01-01T19:30:00+0400`                                                    |

**And** the record has an `_id` attribute with a value, *represented with a placeholder as* `:objectId`.

**When** a user visits the URL path `/facts/:objectId` they should see a "Delete" button

**And** the user clicks on the "Delete" button

**Then** the user should be presented with a confirmation dialog asking `Are you sure you want to delete this TIL Entry?`

**And** the TIL entry should be `deleted` from the `facts` collection within the database, after clicking `Confirm`

**And** the user should be receive an HTTP response code of `200` and *then be redirected* to the `/` URL path

<!--/BOX-->

<!--BOX-->

## Tagging entries with a category

**Given** the user visits the front end path `/`

**When** the user enters data in the form to add an entry

**Then** the user should be able to attach any number of predefined categories (i.e. `javascript`, `json`, `databases`, `react`) to the entry

**And** When the entry is submitted the categories should be stored in the database with the rest of the entry's data.

**And** When the user visits `/facts/:objectId` the update form should allow the user to modify the categories attached to the entry

<!--/BOX-->

<!--BOX-->

## Filtering entries by field

**Given** there are multiple entries in the database

**When** the user visits the path `/facts`

**Then** all entries should be displayed

**And** There should be a form with two inputs: a dropdown menu for selecting a field, and a text input for user submitted values

**And When** the user selects a field, and enters a value

**Then** the list of entries should change to only display entries that match the query from the form.

<!--/BOX-->

<!--BOX-->
# Icebox

- When the user visits the homepage prompt them to log in. Users must be logged in to create, read, update, or delete entries, and they should only have access to **their own** entries
- Search entries by the text they contain, such as 'Javascript', 'React', 'NodeJS', or 'Mongo'.
- Put the site online. Host it live on Heroku, and please include a link to the Heroku URL when you submit your project.

<!--/BOX-->