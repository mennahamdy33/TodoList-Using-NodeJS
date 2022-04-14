# TodoList-Using-NodeJS
## A to-do list cli that contains the following commands :
### 1 - Users can add entry,
properties:
Title: indicates the title of entry, ( required)
Example
node index.js add “To do entry”
Notes:
The entry contain an incremental id
### 2 - Users Can list Entries
- All entries:
node index.js list
### 3 - Users can edit their entry through the id
- Make individual edits
properties:
title: for editing title (required)
id : id (required)
Examples
node index.js edit 123 “Edited title”
===> will edit entry with id 123 to be “Edited title”
### 4 - Users can delete their entry using their id
Example
node index.js delete 123
## Advanced:
### 1 - Entries is added by default with status property which has “to-do” value
### 2 - edit
Users can mark their entry as done by id
Added properties :
Status: one of the values [“to-do”,”in progress”,”done”]
Examples:
node index.js edit 123 “Edited title” “done”
### 3 - list:
- Specific status
properties:
status: one of the values [“to-do”, “in progress” ,”done”] (optional parameter)
Example:
node index.js list “done”
This list all entries that have status done only.
