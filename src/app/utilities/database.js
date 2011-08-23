/**
 * Copyright 2009-2011 Mediafly, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 **/
Database = Class.create({
	initialize: function(tableName) {
	  this.tableName = tableName;
    this.db = openDatabase("Mediafly", "1.0", "Mediafly Palm Pre Database", 10000);
	},

	handleFirstTimers: function(firstTimeCallback, everyOtherTimeCallback) {
    this.db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS " + this.tableName + " (flag REAL)",[], function(tx, result) {
        tx.executeSql("SELECT flag FROM " + this.tableName, [], function(tx, result) {
          if (result.rows.length === 0) {
            tx.executeSql("INSERT INTO " + this.tableName + " (flag) VALUES (1)", [], function(tx, result) {

               firstTimeCallback();

             }, function(tx, error) {
               Mojo.Log.error("There was an error inserting into " + this.tableName + ": " + error.message);
             });
          } else {

            everyOtherTimeCallback();

          }
        }, function(tx, error) {
          Mojo.Log.error("There was a problem selecting the column from " + this.tableName + " table: " + error.message);

        });
      }, function(tx, error) {
        Mojo.Log.error("There was a problem creating the " + this.tableName + " table: " + error.message);
      });
    });
  }
});
