# Assignment-tecnico

## How to install

### Docker setup

I installed Docker using WSL 2 and used a **Microsoft SQL server** on Ubuntu
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

After pulling the server type the following command to launch the image
```
docker run -d --name assignment_server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=testPassword1234' 
-p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
```

### Updating the database

After downloading the project go inside /AngularAuthAPI and open AngularApi.sln.

Once opened go in the Packet Manager Console and type the following command
```
PM> update-database
```
This will create the Database AssignemntDb

If you cannot connect to the database modify the **ConnectionsString** inside the _ _appsettings.json_ _:
```
"ConnectionStrings": {
    "SqlServerConnStr": "Data Source = localhost,1433; User ID = sa; Password = testPassword1234; Initial Catalog = AssignmentDb; Integrated Security = true; Trust Server Certificate = true;MultipleActiveResultSets=true;Trusted_Connection=False;"
  }
```
## Packages/Dependencies Used
