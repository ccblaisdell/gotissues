class AddIssuesToProjects < ActiveRecord::Migration
  def self.up
    # add_column :issues, :name, :string, :null => false
    # User.update_all ["name = ?", "Name"]
    change_table :issues do |t|
      t.references :project
    end
    
    add_index :issues, :project_id
    Project.delete_all
    p = Project.new :name => "Got Issues", :slug => "got_issues"
    p.save
    Issue.update_all ["project_id = ?", p]
  end

  def self.down
    remove_column :issues, :project_id
  end
end
