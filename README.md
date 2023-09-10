# Assignment-tecnico

## How to install

### Docker setup

I installed Docker using WSL 2 and used a **Microsoft SQL server** on Ubuntu
```
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

After pulling the server type the following command to launch the image
```
docker run -d --name assignment_server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=testPassword1234' -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
```
## Packages/Dependencies Used
