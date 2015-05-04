# augmentr-utils
Some tools and such around the augmentr project that really don't belong in the core thing

## First things first
```
npm install
```


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


## Boomtown lead convert
The csv out of Boomtown had some wierdness (multiple emails and multiple phone numbers).  This util parses that file, takes the first email and phone if multiple, and spits out a csv that can be the input file for csv-client.

Usage:
```
node convertBoomtownCsv.js <originalfile> <destinationfile>
```
