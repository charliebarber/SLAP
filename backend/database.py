import sqlite3
import uuid
import os
import util

class Database:
  def newDatabase(self): #Create new/initialised database file and tables.
    if self.checkDatabase() == True:
      self.deleteDatabase()
    db = sqlite3.connect("Database.db")
    self.newTable("Account")
    self.newTable("History")
    print("\nNew database created")
    db.commit()
    db.close()

  def newTable(self, TableName): #Create a new table
    db = sqlite3.connect("Database.db")
    cursor = db.cursor()
    if self.checkTable(TableName):
      self.deleteTable(TableName)
      print("\nPrevious table removed")
    if TableName == "Account":
      cursor.execute('''CREATE TABLE Account(
      username TEXT NOT NULL UNIQUE PRIMARY KEY,
      level INT,
      points INT);''')
      print("\nNew 'Account' table created")
    elif TableName == "History":
      cursor.execute('''CREATE TABLE History(
      username TEXT,
      date_time DATETIME,
      difficulty INT,
      num_questions INT,
      num_correct INT,
      time_taken TIME,
      PRIMARY KEY(username, date_time));''')
      print("\nNew 'History' table created")
    db.commit()
    db.close()

  def addItem(self, TableName): #Add new item into the table
    if self.checkTable(TableName):
      if TableName == "Account":
        username = input("Username: ")
        level = input("Level: ")
        points = input("Points: ")
        didSuccess = self.addToAccount(username, level, points)
      elif TableName == "History":
        # id = uuid.uuid4()
        username = input("Username: ")
        date_time = input("Date and Time: ")
        difficulty = input("Difficulty: ")
        num_questions = input("Number of Questions: ")
        num_correct = input("Number of Correct: ")
        time_taken = input("Time taken: ")
        didSuccess = self.addToHistory(username, date_time, difficulty, num_questions, num_correct, time_taken)

      if didSuccess == True: #Check successfully added the item to the table.
        print("\nItem added")
      else:
        print("\nFailed to add item.")
    else:
      print('\n' + TableName + " table not exist")

  def addToAccount(self, username, level, points): #Add item to table "Account"
    try:
      db = sqlite3.connect("Database.db")
      cursor = db.cursor()
      sql = "INSERT INTO Account(username, level, points) VALUES(?, ?, ?);"
      cursor.execute(sql, (username, level, points))
      db.commit()
      db.close()
      return True
    except:
      return False

  def addToHistory(self, username, date_time, difficulty, num_questions, num_correct, time_taken): #Add item to table "History"
      db = sqlite3.connect("Database.db")
      cursor = db.cursor()
      sql = "INSERT INTO History(username, date_time, difficulty, num_questions, num_correct, time_taken) VALUES(?, ?, ?, ?, ?, ?);"
      cursor.execute(sql, (username, date_time, difficulty, num_questions, num_correct, time_taken))
      db.commit()
      db.close()

  # def updateItem(self, values, TableName, ColumnName, NewValue): #Change/Updates value to the table
  #   db = sqlite3.connect("Database.db")
  #   cursor = db.cursor()
  #   if self.checkTable(TableName):
  #     if TableName == "Account":
  #       self.updateAccount(values, ColumnName, NewValue)
  #       return True
  #     elif TableName == "History":
  #       self.updateHistory(values, ColumnName, NewValue)
  #       return True
  #   else:
  #     print('\n' + TableName + " table not exist")
  #     db.close()
  #     return False
      
  # def updateAccount(self, username, ColumnName, value):
  #   db = sqlite3.connect("Database.db")
  #   cursor = db.cursor()
  #   if self.checkItem("Account", "username", username):
  #     cursor.execute("UPDATE Account SET "+ColumnName+"='"+str(value)+"' WHERE username = '"+username+"';")
  #     db.commit()
  #   db.close()
      
  # def updateHistory(self, values, ColumnName, value):
  #   db = sqlite3.connect("Database.db")
  #   cursor = db.cursor()
  #   if self.checkItem("History", "id", va):
  #     cursor.execute("UPDATE History SET "+ColumnName+"='"+value+"' WHERE username = '"+values[0]+"' and date_time = '"+value[1]+"";")
  #     db.commit()
  #   db.close()
      
  def deleteDatabase(self): #Remove/drop the database file.
    try:
      os.remove("Database.db")
      print("\nDatabase removed")
      return True
    except:
      print("\nDatabase not exist!")
      return False
    
  def deleteTable(self, TableName): #Delete/drop table from database
    if self.checkTable(TableName):
      db = sqlite3.connect("Database.db")
      cursor = db.cursor()
      cursor.execute("DROP TABLE "+ TableName + ";")
      print('\n' + TableName + " table removed")
      db.commit()
      db.close()
      return True
    else:
      print('\n' + TableName + " table not exist")
      return False
      
  def deleteItem(self, TableName, Value): #Deletes items from the table.
    if self.checkTable(TableName):
      db = sqlite3.connect("Database.db")
      cursor = db.cursor()
      if TableName == "Account":
        if self.checkItem("Account", "username", Value):
          cursor.execute("DELETE FROM Account WHERE username = '"+Value+"';")
          cursor.execute("DELETE FROM History WHERE username = '"+Value+"';")
          print("\nAccount '"+Value+"'is removed.\n")
          db.commit()
          db.close()
          return True
        else:
          print("\n'"+Value+"' not exist.")
          return False
      elif TableName == "History":
        if self.checkItem("History", "id", Value):
          cursor.execute("DELETE FROM History WHERE id = '"+Value+"';")
          print("\nHistory id "+Value+" is removed.\n")
          db.commit()
          db.close()
          return True
        else:
          print("\nHistory id "+Value+" not exist.")
          return False
    else:
      print('\n' + TableName + " table not exist")
      return False

  def findItem(self, TableName, ColumnName, Item): #Find all the items from the table
    items = []
    if self.checkTable(TableName):
      if self.checkItem(TableName, ColumnName, Item):
        db = sqlite3.connect("Database.db")
        cursor = db.cursor()
        cursor.execute("SELECT * FROM "+TableName+" WHERE "+ColumnName+" = '"+str(Item)+"';")
        items = cursor.fetchall()
        db.close()
    else:
      print("\nTable '"+TableName+"'not exist.")
    return items

  def displayTable(self, TableName): #Display the table data.
    if self.checkTable(TableName):
      db = sqlite3.connect("Database.db")
      cursor = db.cursor()
      cursor.execute("SELECT * FROM " + TableName)
      items = cursor.fetchall()
      if len(items) == 0:
        print("\nTable '"+TableName+"' is empty.")
        return
      db.close()
      print('\n',items)
    else:
      print('\n' + TableName + " table not exist")

  #==========================================================================
  #These objects under are used by the other classes to access the database.
  #==========================================================================

  def setUsername(self, username): #Sets the UserID into the database class.
    self.username = username
    
  def getUsername(self):
    return self.username
    
  def getUsernames(self): #Gets all the userID from the database
    db = sqlite3.connect("Database.db")
    cursor = db.cursor()
    cursor.execute("SELECT username From Account ORDER BY username;")
    List = cursor.fetchall()
    return List
    
  def getUserHistory(self, username): #Returns the user histories
    db = sqlite3.connect("Database.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM History WHERE username = '"+username+"';")
    histories = cursor.fetchall()
    db.close()
    return histories
  
  def getUserInfo(self): #Gets the user information from the database
    db = sqlite3.connect("Database.db")
    cursor = db.cursor()
    cursor.execute("SELECT * From Account WHERE username = '"+username+"';")
    information = cursor.fetchall()[0]
    return information

  def quitSystem(self): #Quit the database system
    print("\nQuitting the database system")
    quit()
 
  def mainDatabase(self, decision): #Menu UI for the admin to manage the database quickly and easily
      Commands = {1:self.newDatabase, 2:self.newTable, 3:self.addItem, 4:self.deleteDatabase, 5:self.deleteTable, 6:self.deleteItem, 7:self.findItem, 8:self.displayTable, 0:self.quitSystem}
      if decision >= 0 and decision <= 9: #Validation for the choice must be between 0 to 9.
        if decision == 1: #newDatabse()
          print('\n')
          Commands[1]()
        elif decision == 2 or decision == 3 or decision == 5 or decision == 8:
          print('\n')
          TableName = self.chooseTable() #Choose the table
          if TableName != "quit": #When tablename is set to 'quit', it will close the database system.
            print('\n')
            Commands[decision](TableName)
        elif decision == 4:
          print('\n')
          Commands[4]()
        elif decision == 6: #deleteItem()
          print('\n')
          TableName = self.chooseTable()
          if TableName != "quit":
            print('\n')
            if TableName == "Account":
              value = input("\nusername: ")
            elif TableName == "History":
              value = input("\nid: ")
            Commands[6](TableName, value)
        elif decision == 7: #findItem()
          print('\n')
          TableName = self.chooseTable()
          if TableName != "quit":
            print('\n')
            ColumnName = self.chooseColumn(TableName) #Gets the column to search
            Item = input(ColumnName+": ")
            result = Commands[7](TableName, ColumnName, Item)
            if result == []:
              print("\nItem not exist.")
            else:
              print(result)
        elif decision == 9: #updateItem()
          print('\n')
          print("Currently unavailable")
          # TableName = self.chooseTable()
          # if TableName != "quit":
          #   print('\n')
          #   ColumnName = self.chooseColumn(TableName)
          #   username = input("username: ")
          #   value = input("New Value: ")
          #   result = Commands[9](username, TableName, ColumnName, value)
          #   if result == False:
          #     print("\nFailed to update")
          #   else:
          #     print("\nUpdate success")
        elif decision == 0:
          return Commands[0]() #quitSystem()
      else:
        print("\nNot valid!\n")
        
  #==========================================================================
  #Private Functions
  #==========================================================================

  def checkDatabase(self): #Checks whether the database exists or not.
    return os.path.isfile("Database.db")

  def checkTable(self, TableName): #Checks whether the table exists or not.
    db = sqlite3.connect("Database.db")
    cursor = db.cursor()
    cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='" + TableName + "'")
    if cursor.fetchone()[0]==1:
      db.close()
      return True
    else:
      db.close()
      return False

  def checkItem(self, TableName, ItemName, Item): #Check if the item exists in the table.
    db = sqlite3.connect("Database.db")
    cursor = db.cursor()
    cursor.execute("SELECT count(*) FROM "+TableName+" WHERE "+ItemName+ " = '"+str(Item)+ "';")
    if cursor.fetchone()[0]>=1:
      db.close()
      return True
    else:
      db.close()
      return False
      
  def chooseTable(self): #Choose a table to manage.
    option = {'1':"Account", '2':"History", '0':"quit"}
    while True:
      print("[Available Tables]\n")
      print("1. Account Table")
      print("2. History Table")
      print("0. Back to menu\n")
      Decision = input("Choose a table: ")
      try:
        return option[Decision]
      except:
        print("\nInvalid choice\n")

  def chooseColumn(self, TableName): #Choose a column to use.
    ignore = [] #Name of the columns to ignore
    repeat = True
    while repeat:
      db = sqlite3.connect("Database.db")
      cursor = db.cursor()
      cursor.execute("SELECT name FROM PRAGMA_Table_Info('" + TableName + "');") #Get all the names of the columns from the table.
      items = cursor.fetchall()
      number = 1
      print("[Available columns]\n")
      for index in range(len(items)): #Displays the columns in a menu form
        if items[index][0] not in ignore:
          print(str(number) + ". " + items[index][0]) 
          number +=1
      Decision = input("\nChoose a column: ")
      if int(Decision) > 0 and int(Decision) <= len(items):
        repeat = False
        return items[int(Decision)-1][0]
      else:
        print("\nInvalid choice\n")
        
if __name__ == "__main__":
  db = Database()
  repeat = True
  while repeat:
    print("[Database modificator]\n")
    print("01. Create new database")
    print("02. Create new data table")
    print("03. Add item to a table")
    print("04. Delete database")
    print("05. Delete data table")
    print("06. Delete item from a table")
    print("07. Find item from a table")
    print("08. Display all items from table")
    print("09. Update items from table")
    print("00. Quit database system\n")
    try:
      decision = int(input("What do you want to do?: "))
      db.mainDatabase(decision)
    except ValueError:
      print("\nNot valid!\n")