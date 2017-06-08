# Passing Props to MyVuetable - Part 1

So far, we have been building `MyVuetable` component by setting every properties inside the component itself, which is not very useful as a component. It should be generic enough so that we can reuse it somewhere else in our app.

It is more likely that you may use `MyVuetable` as an index page for other [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations for one or every module in your app. If so, you would also like to have it looks the same in every module, but having different content displayed in the table.

Let's say you are building a Quotation app, which would contains the following modules
- Products
- Customers
- Quotations

For each module, you will have an index page where you list all existing items e.g. list of all products. From this index page, you would allow the user to add new item (create product), view item detail (view product detail), edit item detail (edit product), delete the item (delete product).

To make the app has a consistent look so that it is easy and intuitive for the users to use, the index page (where you would like to use our MyVuetable component) for each module would look very similar but differ only in its content.

So, it is time to start refactor it to accept properties so that it is more generic and useful as a component.

## Defining Props

Let's review our `MyVuetable` template to see what properties are we passing to Vuetable, we will leave out the event handlers for the moment.

- api-url
- fields
- pagination-path
- per-page
- multi-sort
- sort-order
- append-params

### # api-url :white_check_mark:
This specifies where our component will interact with the API endpoint requesting data to be displayed in the table. This one is usually specific for each module, so this one definitely should be a prop.

### # fields :white_check_mark:
The field definition for each module would be different, so it must not be hard coded inside our component. This one must also be a prop.

### # pagination-path (and also data-path)
This is where you tell Vuetable where the data and pagination are located inside the JSON payload that you get back from the server. 

If you build the API yourself, the payload structure should be the same. (If not, you should ask yourself very seriously why!!) The same means the `data-path` and `pagination-path` should always be in that payload structure.

So, both `pagination-path` and `data-path` do not need to become a prop for our component.

### # per-page
This specifies how many rows the table should be displayed. Since we are aiming for consistent look, it should also be the same and therefore no need to be a prop.

### # multi-sort :white_check_mark:
This is where you specify that your component can display multiple sort in the table. This is for your consideration but for this lesson we will assume that it is a standard behavior so it does not need to be a prop.

### # sort-order :white_check_mark:
This is where you specify the initial sort order when first displaying data in the table. This is different from module to module, so it will have to be another prop.

### # append-params :white_check_mark:
This is where you can pass additional parameters to the server side (in our case, the filter text). This one will likely be different on each module, so it needs to be a prop.

### # detail-row-component :white_check_mark:
This specifies the name of a component that will be used to display the content of the detail row. This will also have to be a prop since the data will probably be different as well.
