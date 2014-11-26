Implementation ideas
---

1
--
project
    name
sprint
    project._id
        name
task
    project._id
    name
        sprint._id
            name

2
--
project
    name
    sprints = [sprint._id]
    tasks = [task._id]
sprint
    name
    tasks =[task._id]
task
    name

3
--
project
    name
sprint
    project._id  //index
    name
task
    project._id  //index
    sprint._id  //index, optional
    name

4
--
project
    name
sprint
    project._id
        name
task
    project._id
        sprint._id  //index, optional
        name


5
--
project
    name

project_data
    project._id
        sprint
            name
        task
            sprint._id  //index, optional
            name

6
--
project
    name

project._id
    sprint
        name
    task
        sprint._id  //index, optional
        name



Implementations
-------------------------------------------------


2
--
project
    name
    description
    users = [user._id]
    sprints = [sprint._id]
    tasks = [task._id]    //product backlog
    documents = [document._id]

user
    name
    email
    role
    provider
    projectId
    projects = [project._id]
    hash (md5hash email)
    task
        project._id
            task._id

sprint
    name
    goal
    start
    end
    tasks   //sprint backlog

task
    name
    description
    status

document
    name
    description
    body

idea
    name
    description
    score

role
    name
    description
    users = [uid]

team
    name
    description
    users = [user._id] //name, email?

-----

4
--
project
    name
    description

user
    name
    email
    role
    provider
    activeProject = project_id  //needed?
    projects = [project._id]
    hash (md5hash email)
    task
        project._id
            task._id

sprint
    project._id
        name
        goal
        start
        end

task
    project._id
        sprint._id      //optional
        name
        description
        status

document
    project._id
        name
        description
        body

idea
    project._id
        name
        description
        score

role
    project._id
        name
        description
        users = [uid]

team
    name
    description
    users = [user._id]




