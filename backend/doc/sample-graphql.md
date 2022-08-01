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
 addItemToGroup (
	templateGroupId: "62b8103423387bbf027fa2f2",
	item: "sunscreen"
) {
    name,
    lang,
    items,
    _id
  }
}
```

```
query TemplateQuery ($id: String!) { 
  template(id: $id) {
    name,
    _id
  }
}
```