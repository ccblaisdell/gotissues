class CreateIssues < ActiveRecord::Migration
  def self.up
    create_table :issues do |t|
      t.string :name, :null => false
      t.text :description
      t.string :status, :default => "open", :null => false
      t.references :user
      
      t.timestamps
    end
    
    add_index :issues, :user_id
  end

  def self.down
    drop_table :issues
  end
end
