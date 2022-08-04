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
query { getAll {
  name,
  _id,
  owner {
    _id,
    name
  },
  groups {
    _id,
    lang,
    owner {
      _id,
      name,
    },
    items {
      _id,
      label,
      checked
    }
  }
}}
```

```
mutation {
 addItemToGroup (
	templateGroupId: "62eb6d2693c9234a059050c9",
	item: {
    label: "Sunscreen"
  }
) {
    name,
    lang,
    items {
      label
    }
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