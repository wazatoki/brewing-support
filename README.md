# brewing-support

## install go dependencies

```
cd backend/src
go mod tidy
```

## install node dependencies

```

cd frontend
npm install -g @vue/cli
npm install

```

## create db

```
curl -X PUT http://brewing_support:brewing_support@127.0.0.1:5984/brewing_support_db
```

#### setup cors
http://127.0.0.1:5984/_utils/

config cors

