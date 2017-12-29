# Introduction 
Middleware services for Maximo and mocked data

```bash
$ sudo npm install -g nodemon  # optional, if not already installed
$ npm install
$ nodemon
```

## Duty station plans (Not part of mobile)
* Duty station has 3 readings, one of each type.
* Tour or duty stations, has 100's.
* Need to do a site that is not cook.
* Derek has test scripts to build every kind of meter.
* Can get 7 days of history. All readings for cook 
* Cannot turn over reading if any open stations. Can except readings. Default to 0.
* Every user has to have default site.  Each user must have a site
* Two users, same tour. First person gets credit for the station does not override.
* Duty station plan has a unique name
* Every duty station plan needs a function (role)
* Any shift supervisor can edit a duty station plan.
* Have someone adds (technician) the and someone commit (supervisor). 
  - Standard commit 
  - Surveilance commit.
  - going to be in saved format.
* Plans have readings. Rounds will be  Procedure Name, Station Number, Station Namie, 
* X1 means its part of project - figure out how to get those X1 fields.
* Database Configuration app to search by attribute name. configscation, is a Maximo field.
* Procedure is a document... could print it out, Station Number, Station Name.
  - Station number is used - Unique number only within the Duty Station number.
  - Sequence numbers can be changed.
  - Every plan has its own unique set of station numbers.
  - Station name is high level of what needs done (title)
* Good Duty Station plan to use for data: Filter by "Derek".
* May have two sequence 1's because by surveilence or non-surveilence.
* Going to have it fitlered by sequence, procedure
* Turnover check boxes are only done when turning over shift to another operator. 
* Everyone whose unit is Op will onkly see meter readings for the technician as function
  - Technician, function and role are all the same thing.
* Unit one operator 1
* Only allow to do surveliences between a certain block of time.  Cant do before 9am and not after noon.
* always have to have a meature, measurement point is optional and gives us the mins and maxs.
* Meters go into locations. Doing a reading on a location.
* A role is going to be tied to Unit 1 discharge pressure, section pressure
* Duty Station Plan > Locations > Meters. (Do not show meter in the UI.)
  - Duty Station Plan -> Tour
  - Duty Station -> Shows up based on what shift
  - A reading the takes place is: -> Station
* Procedure, station id are combined together to get one tour. Combining tours based on name.
* At no point should not be in airplane mode, dont let them start tour with airplane mode on.
* Add tab for missed readings. 
* Roles - Users > Security Profile > Vicki Groups > Can you mirror mine as Derek.  