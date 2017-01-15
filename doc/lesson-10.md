# 10) Make columns sortable

If your API endpoint support sorting, Vuetable can automatically interact with the API endpoint to request sorted data.

## Mark field as sortable

By specifying `sortField` option on the field defintion, you tell Vuetable that that particular field is sortable. Vuetable will render the column header for that field to be clickable for sorting and the ascending or descending sort icon will appear after the column name in the table header.

In our tutorial project, we would like to make all fields sortable, so we have the add `sortField` option for every field and we have to turn the `name` and `email` field from simple string to field definition object as well.

```javascript
  // MyVuetable.vue

  //...
  data () {
    return {
      fields: [
        {
          name: 'name',
          sortField: 'name'
        },
        {
          name: 'email',
          sortField: 'email'
        },
        {
          name: 'birthdate',
          sortField: 'birthdate',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: 'nickname',
          sortField: 'nickname',
          callback: 'allcap'
        },
        {
          name: 'gender',
          sortField: 'gender',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'genderLabel'
        },
        {
          name: 'salary',
          sortField: 'salary',
          titleClass: 'center aligned',
          dataClass: 'right aligned',
          callback: 'formatNumber'
        }
      ]
    }
  },
  //...
```

Run the project and try it. Now, all columns are sortable!

You can mark as many field as sortable as you want provided that your API endpoint support sorting for those fields. If your API does not support sorting for any of the field you specified, your users will not get the result they expected.

You may notice that the `sortField` usually is the `name` of the field. But it doesn't have to be.

Sometimes, the `name` of the field is just an alias of a computed column in the SQL's `select` command. Let's add the `age` field in MyVuetable, just before the `birthdate` field and also make it sortable.

```javascript
  // MyVuetable.vue

  // ...
  data () {
    return {
      fields: [
        //...
        {
          name: 'age',
          sortField: 'age',
          dataClass: 'center aligned'
        },
        //...
      ]
    }
  }
```

If you run the project and click on "Age" column, you'll see that it doesn't get the sort correctly. Also, if you check the browser console, you will also see the 505 error returning from the server as well.

This is because the `age` field is a computed column. It does not have a real column in the database table, so the SQL cannot find the column named `age` to do the `ORDER BY` command on. So, it throws the error back.

The `age` field is actually computed its value from `birthdate` field, so we can specify the `birthdate` as the `sortField` option instead and the result will still be correct.

```javascript
  // MyVuetable.vue

  // ...
  data () {
    return {
      fields: [
        //...
        {
          name: 'age',
          sortField: 'birthdate',   // <----
          dataClass: 'center aligned'
        },
        //...
      ]
    }
  }
```



## Multi-column sorting

By default, Vuetable will only work in single column sorting mode. But if you need to do multi-column sorting, you can set `multi-sort` prop to `true`. Then, you can use the `Alt` key (for Windows) or `Opt` key (for Mac) to select subsequent column for sorting. Clicking on the same column will cycle the sort direction from ascending to descending and again to unselect for sorting.

```html
  <template>
    <vuetable ref="vuetable"
      :muti-sort="true"
    ></vuetable>
  </template>
```

If you would like to change the `Alt` key to something else, you can use `multi-sort-key` prop to specify one of the following value:

- `alt` (default) -- Alt / Option key
- `ctrl` -- Ctrl / Control key
- `meta` -- Window / Command key
- `shift` -- Shift key

```html
  <template>
    <vuetable ref="vuetable"
      :muti-sort="true"
      multi-sort-key="ctrl"
    ></vuetable>
  </template>
```

Again, if you API does not support multi-column sorting, the displaying results will not be as expected.

## Changing ascending/descending icon

Ascending/descending icon are just CSS classes wrap inside `<i>` tag and you can change it to any icon you like if your CSS framework support it.

Here is an example on changing it to use Bootstrap 3 CSS, set the `ascending-icon` and `descending-icon` in the `css` prop appropriately.

```vue
  <template>
    <vuetable ref="vuetable"
      :css="myCSS"
    ></vuetable>
  </template>
  <script>
    //...
    data () {
      return {
        myCSS: {
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down'
        }
      }
    }
  </script>
```


## Setting default sort order

You can use `sort-order` prop to specify the initial sort order. For example, you would like the data to be initially sorted by `email` field, you can do so by:

```vue
  <template>
    <vuetable ref="vuetable"
      :sort-order="sortOrder"
    ></vuetable>
  </template>
  <script>
    //...
    data () {
      return {
        sortOrder: [
          {
            field: 'email',
            sortField: 'email',
            direction: 'asc'
          }
        ]
      }
    }
  </script>
```

[Source code for this lesson](https://github.com/ratiw/vuetable-2-tutorial/tree/lesson-10)
