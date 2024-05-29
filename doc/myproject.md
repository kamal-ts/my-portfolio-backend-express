# Project API Spec

## Create Project

Endpoint : POST /api/projects

Headers : 
    - Authorization : token

Request Body :

```json
{
    "title": "new project",
    "tag": "tag",
    "category": "category",
    "description": "description project",
    "link_web": "url project",
    "link_git": "url github",
    "image": "project.jpg"
}
```

Response Body :

```json
{
    "data": {
        "id": 1,
        "title": "new project",
        "tag": "tag",
        "category": "category",
        "description": "description project",
        "link_web": "url project",
        "link_git": "url github",
        "image": "project.jpg",
        "createdAt": "date"
    }
}
```

## Get Project

Endpoint : GET /api/projects/:projectId

Headers : 
    - Authorization : token

Request Body :

Response Body :

```json
{
    "data": {
        "id": 1,
        "title": "new project",
        "date": "date",
        "tag": "tag",
        "category": "category",
        "description": "description project",
        "link_web": "url project",
        "link_git": "url github",
        "image": "project.jpg"
    }
}
```

## Update Project

Endpoint : PUT /api/projects/:projectId

Headers : 
    - Authorization : token

Request Body :

```json
{
    "title": "new project",
    "date": "date",
    "tag": "tag",
    "category": "category",
    "description": "description project",
    "link_web": "url project",
    "link_git": "url github",
    "image": "project.jpg"
}
```

Response Body :

```json
{
    "data": {
        "id": 1,
        "title": "new project",
        "date": "date",
        "tag": "tag",
        "category": "category",
        "description": "description project",
        "link_web": "url project",
        "link_git": "url github",
        "image": "project.jpg"
    }
}
```

## Remove Project

Endpoint : DELETE /api/projects/:projectId

Headers : 
    - Authorization : token

Response Body :

```json
{
    "data": true
}
```

## Search Project

Endpoint : GET /api/projects

Headers : 
    - Authorization : token

Query Params :
- title : String, project title, optional
- tag : String, project tag, optional 
- category : String, project category, optional
- page : number, default 1
- size : number, default 10

Response Body :

```json
{
    "data": [
        {
            "id": 1,
            "title": "new project",
            "date": "date",
            "tag": "tag",
            "category": "category",
            "description": "description project",
            "link_web": "url project",
            "link_git": "url github",
            "image": "project.jpg"
        },
        {
            "id": 1,
            "title": "new project",
            "date": "date",
            "tag": "tag",
            "category": "category",
            "description": "description project",
            "link_web": "url project",
            "link_git": "url github",
            "image": "project.jpg"
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 5,
        "size": 10
    } 
}
```