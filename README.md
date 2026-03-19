# Readme

## Manual API Verification

A helper script is provided to run a set of manual API checks using `curl`.

### Run the server

```bash
npm start
```

### Run the verification script

```bash
bash tp_rendue/test_api.sh
```

This script performs the following checks:

- ✅ `GET /students` returns the list
- ✅ `GET /students/INE00000001` returns a student
- ✅ `GET /students/INE99999999` returns 404
- ✅ `POST /students` with valid data returns 201
- ✅ `POST /students` without email returns 400
- ✅ `POST /students` with an existing email returns 409
- ✅ `PUT /students/INE00000001` updates a student
- ✅ `DELETE /students/INE00000001` deletes the student
- ✅ `GET /students/stats` returns statistics
- ✅ `GET /students/search?q=ahmed` returns results
