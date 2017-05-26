export default [
  {
    name: '__handle',
    titleClass: 'text-center',
    dataClass: 'text-center'
  },
  {
    name: '__sequence',
    title: '#',
    titleClass: 'text-center',
    dataClass: 'text-right'
  },
  {
    name: '__checkbox',
    titleClass: 'text-center',
    dataClass: 'text-center'
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
    titleClass: 'text-center',
    dataClass: 'text-center',
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
    titleClass: 'text-center',
    dataClass: 'text-center',
    callback: 'genderLabel'
  },
  {
    name: 'salary',
    sortField: 'salary',
    titleClass: 'text-center',
    dataClass: 'text-right',
    callback: 'formatNumber'
  },
  // {
  //   name: '__component:custom-actions',
  //   title: 'Actions',
  //   titleClass: 'text-center',
  //   dataClass: 'text-center',
  // },
  {
    name: '__slot:actions',
    title: 'Slot Actions',
    titleClass: 'text-center',
    dataClass: 'text-center',
  }
]