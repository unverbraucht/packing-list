```
mutation {
  createTemplate(templateData: {
    name: "test"
  }) {
    _id
  }
}
```

```
{ template(id: "625d72f169c4c4dfd692d059") {
    name
    _id
  }
}
```

```
mutation {
  addGroup(templateId: "629c9ab38055c533b56c5760",
  groupData: {
    name: "testgroup3"
  }) {
    _id,
    groups {
      name
    }
  }
}
```

```
{ getAll {
  name
  _id
  groups {
    items
    name
  }
}}
```

```
mutation {
  addItemToGroup(templateId: "629c9ab38055c533b56c5760", templateGroupId: "629c9ac18055c533b56c5763", item: "Contacts") {
      name
  _id
  groups {
    items
    name
  }
  }
}
```