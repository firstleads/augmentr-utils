# augmentr-utils
Some tools and such around the augmentr project that really don't belong in the core thing

## csv-client
```
HOST=http://augmentr.firstleads.net node csv-client.js <sourcefile> <destinationfile>
```
Note that the output file is not currently being used.  It simply dumps output to screen

Sample input file:
```
email,phone,fullName
"sbarstow@gmail.com", "+19193499473", "Scott Barstow"
"mike@firstleads.net", "+19196725329", "Mike Schneider"
```
or
```
email,phone,firstName, lastName
"sbarstow@gmail.com", "+19193499473", "Scott", "Barstow"
"mike@firstleads.net", "+19196725329", "Mike", "Schneider"
```

all fields are required.
