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

### ASP.NET Packages

I used the following dependencies inside the project:
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools

  #### Microsoft.AspNetCore.Authentication.JwtBearer

  Package used to create a JWT token in order to authenticate the user and block unregistered and unauthorized users from accessing the `/dashboard`

  #### Microsoft.EntityFrameworkCore.(...)

  Packages used to create the connection back-end <---> database and to create all the `GET/POST/PUT` APIs

### Angular Packeges

#### Packages used for design
##### Bootstrap
`ng add @ng-bootstrap/ng-bootstrap`

##### Angular Material
`npm install --save @angular/material @angular/cdk`
Usefull for dialog pop-ups that I used to show gifs details.
Usefull also for the filter `radio-buttons`

Run the following command to add the animations(if they don't work):
` add @angular/material`

##### Ngx Infite Scroll and Ngx-Masonry
`npm i ngx-infinite-scroll`
`npm install ngx-masonry masonry-layout --save`

Both helpful into creating the infite scroll and mosaic/masonry layout of the website.
#### Packages used for functionality
##### Angular-jwt
`npm install @auth0/angular-jwt`
Used front-end to first of all to authenticate then to gather some information about the user through his `Token`
