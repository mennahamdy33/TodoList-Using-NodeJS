# TodoList-Using-NodeJS
## A to-do list cli that contains the following commands :
### 1 - Users can add entry,
properties:<br/>
Title: indicates the title of entry, ( required)<br/>
Example<br/>
node index.js add “To do entry”<br/>
Notes:<br/>
The entry contain an incremental id<br/>
### 2 - Users Can list Entries
- All entries:<br/>
node index.js list<br/>
### 3 - Users can edit their entry through the id
- Make individual edits<br/>
properties:<br/>
title: for editing title (required)<br/>
id : id (required)<br/>
Examples<br/>
node index.js edit 123 “Edited title”<br/>
===> will edit entry with id 123 to be “Edited title”<br/>
### 4 - Users can delete their entry using their id
Example<br/>
node index.js delete 123<br/>
## Advanced:
### 1 - Entries is added by default with status property which has “to-do” value
### 2 - edit
Users can mark their entry as done by id <br/>
Added properties :<br/>
Status: one of the values [“to-do”,”in progress”,”done”]<br/>
Examples:<br/>
node index.js edit 123 “Edited title” “done”<br/>
### 3 - list:
- Specific status<br/>
properties:<br/>
status: one of the values [“to-do”, “in progress” ,”done”] (optional parameter)<br/>
Example:<br/>
node index.js list “done”<br/>
This list all entries that have status done only.<br/>
