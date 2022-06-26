```
mutation {
  createTemplate(templateData: {
    name: "Ila Italy"
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
  addGroup(templateId: "62b80c02be08f7bb4a94a9ec",
  groupData: {
    name: "Clothes",
    lang: "en"
  }) {
    _id,
    groups {
      name,
      lang
    }
  }
}
```

```
{ getAll {
  name,
  _id,
  groups {
    _id
    items
    name,
    lang
  }
}}
```

```
mutation {
  addItemToGroup(templateId: "629c9ab38055c533b56c5760", templateGroupId: "629c9ac18055c533b56c5763", item: "Contacts") {
    name,
    _id,
    groups {
      items,
      name,
      lang
    }
  }
}
```