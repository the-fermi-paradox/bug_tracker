const db = require('../connectDB');

// First issue:
// We need more than IDs to create and update!
// What data should we retrieve?

// SCHEMA:
// bugs table:
// bug_id int(11) not null primary key auto increment
// bug_priority int(11) not null
// bug_severity int(11) not null
// bug_type varchar(60) not null
// bug_reporter_id int(11) not null foreign key -> users
// bug_assignee_id int(11) not null foreign key -> users
// bug_product_id int(11) not null foreign key -> products
// created timestamp not null default 0000-00-00 00:00:00

class BugModel {
  static async createBug(id) {
    return db.query('INSERT INTO bugs(');
  }

  static async getBug(id) {
    return db.query('SELECT * FROM bugs WHERE id=(?)', [id]);
  }

  static async getBugs() {
    return db.query('SELECT * FROM bugs');
  }

  static async deleteBug(id) {
    return db.query('DELETE * FROM bugs WHERE id=(?)', [id]);
  }
}

module.exports = BugModel;
