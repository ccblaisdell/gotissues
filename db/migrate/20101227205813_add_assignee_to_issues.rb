class AddAssigneeToIssues < ActiveRecord::Migration
  def self.up
    change_table :issues do |t|
      t.references :assignee
    end
    
    add_index :issues, :assignee_id
  end

  def self.down
    drop_column :issues, :assignee_id
  end
end
