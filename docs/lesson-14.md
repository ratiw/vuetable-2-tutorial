# Moving Field Definitions to another file

As we go along for quite sometime, there is one thing that we should do with the Field Definition. We should move it out into its own file!

In a more complex project that have a lot of fields, the filed definition will get quite lengthy and keeping in a separate file is often more suitable as it will make our `MyVuetable` component less clutter.

So, let's begin by creating a new file inside `components` directory called `FieldDefs.js`, then copy and paste the field definition into it.

```javascript
export default [
  {
    name: '__handle',
    titleClass: 'center aligned',
    dataClass: 'center aligned'
  },
  {
    name: '__sequence',
    title: '#',
    titleClass: 'center aligned',
    dataClass: 'right aligned'
  },
  {
    name: '__checkbox',
    titleClass: 'center aligned',
    dataClass: 'center aligned'
  },
  {
    name: 'name',
    sortField: 'name',
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
  },
  {
    name: '__slot:actions',
    title: 'Slot Actions',
    titleClass: 'center aligned',
    dataClass: 'center aligned',
  }
]
```

Then, import `FieldDefs.js` and remove the field definition in `MyVuetable` out, like so.

```javascript
// MyVuetable.vue
  //...
  import FieldDefs from './FieldDefs.js'
  //...

  data () {
    return {
      fields: FieldDefs,
      //...
    }
  }
//...
```

Save everything and run the project again. Everything should still work the same.
