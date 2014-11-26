[![Build Status](https://travis-ci.org/kristofferlind/projise.svg)](https://travis-ci.org/kristofferlind/projise)
[![Code Climate](https://codeclimate.com/github/kristofferlind/projise/badges/gpa.svg)](https://codeclimate.com/github/kristofferlind/projise)
[![Test Coverage](https://codeclimate.com/github/kristofferlind/projise/badges/coverage.svg)](https://codeclimate.com/github/kristofferlind/projise)

#Projise
Projise is a project management system built using MEAN Stack.

#Demo
(http://projise-klind.rhcloud.com/)

#Key features
* Realtime multiuser task management loosely based on scrum
* Document management with markdown and result viewed in realtime
* Managing several teams/projects
* Add team of users to project

#Planned features
* Templates for documents
* Charts
* Generating reports from project data
* Adding voice conversations to chat
* Implementing OT for document management
* Unifying user task assessments by analyzing previous assessments
* Overall, more statistics

#Background
I really disliked having to keep a bunch of spreadsheets and documents in sync for school projects. The goal of this project is to automate as much as possible and also to simplify working as a team. I also partly chose this as a project to learn more about the process.

#Purpose
First and foremost, this is a learning project. It's my first project using this stack and I've only finished my first year of university so far. Don't expect to see top notch code.

I would however be very happy if it ends up fulfilling it's goal of making project management better. If you find it useful, please tell me. :)

#Install
Download/git clone->npm install

#Run
npm run/grunt serve

#Build
grunt build

#Generate docs
grunt docs

#Test
npm test

#Coverage
Coverage report is only from client code. Need to get lcov from mocha and combine it with lcov from karma for a combined result.

#Contributions
Feel free to help me learn/build something useful. Code reviews and/or pull requests would be awesome.

#License
MIT

For dependency licenses, check dependency-licenses.json or their respective license.md files after install
